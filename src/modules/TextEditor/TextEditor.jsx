import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import { useNavigate } from 'react-router-dom';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';

// react-markdown v10 работает через require или сломан с React 19.
// Проще и надёжнее использовать marked:
import { marked } from 'marked';

const TextEditor = ({ initialContent, initialImage, onSave, onDraft }) => {
    const { lang } = useLocalSettings();
    const navigate = useNavigate();

    const [ mode, setMode ] = useState('wysiwyg');
    const [ markdownText, setMarkdownText ] = useState('');
    const [editorState, setEditorState] = useState(() => {
        if (initialContent) {
            return EditorState.createWithContent(convertFromRaw(initialContent));
        }
        return EditorState.createEmpty();
    });
    const [ image, setImage ] = useState('');

    const fileInputRef = useRef(null);
    const editorRef = useRef(null);
    const containerRef = useRef(null);
    const markdownTextareaRef = useRef(null);
    const imageInputRef = useRef(null);

    const handleBack = () => {
        navigate('/admin_panel');
    };

    useEffect(() => {
        if (initialContent) {
            setEditorState(EditorState.createWithContent(convertFromRaw(initialContent)));
        } else {
            setEditorState(EditorState.createEmpty());
        }
    }, [initialContent]);

    useEffect(() => {
        if (!initialImage) {
            setImage('');
            return;
        }
        // если base64
        if (initialImage.startsWith('data:image')) {
            setImage(initialImage);
        } else {
            try {
                const imgSrc = require(`../../assets/images/${initialImage}`);
                setImage(imgSrc);
            } catch (err) {
                console.log('Изображение не найдено: ', initialImage);
                setImage('');
            }
        }
    }, [initialImage]);

    // переключение режимов
    const handleToggleMarkdown = () => {
        if (mode === 'wysiwyg') {
            const contentState = editorState.getCurrentContent();
            const md = stateToMarkdown(contentState);
            setMarkdownText(md);
            setMode('markdown');
        } else {
            try {
                const contentState = stateFromMarkdown(markdownText);
                // ИСПРАВЛЕНО: используем contentState, а не initialContent
                setEditorState(EditorState.createWithContent(contentState));
            } catch (err) {
                console.log('Ошибка конвертации markdown: ', err);
            }
            setMode('wysiwyg');
        }
    };

    
    // обработчики wysiwyg
    const handleChange = (state) => {
        setEditorState(state);
    };
    const handleContainerClick = () => {
        // Принудительно ставим фокус на редактор.
        // Draft.js сам поставит курсор в конец текста или в начало, если текста нет.
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    // жирный/курсив/подчёркивание
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const toggleInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };
    // Вставка картинки через base64 (заглушка; в проде — загрузка на сервер)
    const handleImageChoose = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            // Создаём изображение для сжатия
            const img = new Image();
            img.onload = () => {
                // Максимальная ширина — 800px (достаточно для превью)
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Сжимаем в JPEG с качеством 0.7 (мало заметно, но сильно меньше)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

                setImage(compressedBase64);

                if (mode === 'wysiwyg') {
                    const contentState = editorState.getCurrentContent();
                    const newContent = contentState.createEntity('IMAGE', 'IMMUTABLE', {
                        src: compressedBase64,
                    });
                    const entityKey = contentState.getLastCreatedEntityKey();
                    const newEditorState = EditorState.set(editorState, {
                        currentContent: newContent,
                    });
                    setEditorState(
                        RichUtils.toggleBlockType(newEditorState, 'atomic', entityKey)
                    );
                } else {
                    const md = `![${file.name}](${compressedBase64})`;
                    setMarkdownText((prev) => prev + '\n\n' + md);
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const contentState = editorState.getCurrentContent();
            const newContent = contentState.createEntity('IMAGE', 'IMMUTABLE', {
                src: reader.result,
            });
            const entityKey = contentState.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: newContent,
            });
            setEditorState(
                RichUtils.toggleBlockType(newEditorState, 'atomic', entityKey)
            );
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    // обработчики markdown
    const insertMarkdownSyntax = (before, after = '', placeholder = '') => {
        const textarea = markdownTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = markdownText.substring(start, end) || placeholder;
        const newText =
            markdownText.substring(0, start) + 
            before + selectedText + after + 
            markdownText.substring(end);
        setMarkdownText(newText);

        // возвращение фокуса и выделение вставленного текста
        requestAnimationFrame(() => {
            textarea.focus();
            const newPos = start + before.length;
            textarea.setSelectionRange(newPos, newPos + selectedText.length);
        });
    };

    // вставка изображения в markdown
    const handleImageUploadMarkdown = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const md = `![${file.name}](${reader.result})`;
            setMarkdownText((prev) => prev + '\n\n' + md);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const getEditorContent = () => {
        return convertToRaw(editorState.getCurrentContent());
    };

    // сохранение и публикация
    const handleSavePublish = () => {
        if (mode === 'markdown') {
            try {
                const contentState = stateFromMarkdown(markdownText);
                const raw = convertToRaw(contentState);
                if (onSave) onSave(raw, image);
            } catch (err) {
                console.log('Ошибка конвертации markdown: ', err);
                if (onSave) onSave(markdownText);
            }
        } else {
            if (onSave) onSave(convertToRaw(editorState.getCurrentContent()), image);
        }
        navigate('/admin_panel');
    };
    // сохранение в черновиках
    const handleSaveDraft = () => {
        if (mode === 'markdown') {
            try {
                const contentState = stateFromMarkdown(markdownText);
                const raw = convertToRaw(contentState);
                if (onDraft) onDraft(raw, image);
            } catch (err) {
                console.log('Ошибка конвертации markdown: ', err);
                if (onDraft) onDraft(markdownText);
            }
        } else {
            if (onDraft) onDraft(convertToRaw(editorState.getCurrentContent()), image);
        }
        navigate('/admin_panel');
    };

    // Проверка активного стиля для подсветки кнопок
    const isStyleActive = (style) =>
        editorState.getCurrentInlineStyle().has(style);

    const isBlockActive = (blockType) => {
        const type = editorState
            .getCurrentContent()
            .getBlockForKey(editorState.getSelection().getStartKey())
            .getType();
        return type === blockType;
    };

    // проверки для markdown-режима
    const isMdSyntaxAround = (before, after = before) => {
        const textarea = markdownTextareaRef.current;
        if (!textarea) return false;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const beforeText = markdownText.substring(start - before.length, start);
        const afterText = markdownText.substring(end, end + after.length);
        return beforeText === before && afterText === after;
    };

    return (
        <>
            <div className="text-editor">
                {/* Тулбар */}
                <div className="text-editor_toolbar">
                    {mode === 'wysiwyg' ? (
                        <>
                            <button
                                type="button"
                                className={isStyleActive('BOLD') ? 'active' : ''}
                                onClick={() => toggleInlineStyle('BOLD')}
                                title="Жирный"
                            >
                                <b>B</b>
                            </button>
                            <button
                                type="button"
                                className={isStyleActive('ITALIC') ? 'active' : ''}
                                onClick={() => toggleInlineStyle('ITALIC')}
                                title="Курсив"
                            >
                                <i>I</i>
                            </button>
                            <button
                                type="button"
                                className={isStyleActive('UNDERLINE') ? 'active' : ''}
                                onClick={() => toggleInlineStyle('UNDERLINE')}
                                title="Подчёркнутый"
                            >
                                <u>U</u>
                            </button>
                            <span className="text-editor_toolbar_divider" />
                            <button
                                type="button"
                                className={isBlockActive('unordered-list-item') ? 'active' : ''}
                                onClick={() => toggleBlockType('unordered-list-item')}
                                title="Маркированный список"
                            >
                                •
                            </button>
                            <button
                                type="button"
                                className={isBlockActive('ordered-list-item') ? 'active' : ''}
                                onClick={() => toggleBlockType('ordered-list-item')}
                                title="Нумерованный список"
                            >
                                1.
                            </button>
                            <span className="text-editor_toolbar_divider" />
                            <button
                                type="button"
                                className={isBlockActive('header-one') ? 'active' : ''}
                                onClick={() => toggleBlockType('header-one')}
                                title="Заголовок 1"
                            >
                                H1
                            </button>
                            <button
                                type="button"
                                className={isBlockActive('header-two') ? 'active' : ''}
                                onClick={() => toggleBlockType('header-two')}
                                title="Заголовок 2"
                            >
                                H2
                            </button>
                            <span className="text-editor_toolbar_divider" />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                title="Вставить изображение"
                                className='text-editor_toolbar_btn-image'
                            >
                                {/* 🖼 */}
                                <img src={require('../../assets/icons/image.png')} alt="" />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className={isMdSyntaxAround('**') ? 'active' : ''}
                                onClick={() => insertMarkdownSyntax('**', '**', 'текст')}
                                title="Жирный"
                            >
                                <b>B</b>
                            </button>
                            <button
                                type="button"
                                className={isMdSyntaxAround('*') ? 'active' : ''}
                                onClick={() => insertMarkdownSyntax('*', '*', 'текст')}
                                title="Курсив"
                            >
                                <i>I</i>
                            </button>
                            <span className="text-editor_toolbar_divider" />
                            <button
                                type="button"
                                onClick={() => insertMarkdownSyntax('- ', '', 'пункт')}
                                title="Маркированный список"
                            >
                                •
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdownSyntax('1. ', '', 'пункт')}
                                title="Нумерованный список"
                            >
                                1.
                            </button>
                            <span className="text-editor_toolbar_divider" />
                            <button
                                type="button"
                                onClick={() => insertMarkdownSyntax('# ', '', 'Заголовок')}
                                title="Заголовок 1"
                            >
                                H1
                            </button>
                            <button
                                type="button"
                                onClick={() => insertMarkdownSyntax('## ', '', 'Заголовок')}
                                title="Заголовок 2"
                            >
                                H2
                            </button>
                            <span className="text-editor_toolbar_divider" />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                title="Вставить изображение"
                                className='text-editor_toolbar_btn-image'
                            >
                                <img src={require('../../assets/icons/image.png')} alt="" />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUploadMarkdown}
                                style={{ display: 'none' }}
                            />
                        </>
                    )}
                    <button
                        type="button"
                        className={`text-editor_toolbar_md-btn ${mode === 'markdown' ? 'active' : ''}`}
                        onClick={handleToggleMarkdown}
                        title={lang === 'ru' ? 'Режим Markdown' : 'Markdown mode'}
                    >
                        M↓
                    </button>
                </div>

                {/* Область редактирования */}
                {mode === 'wysiwyg' ? (
                    <div
                        className="text-editor_content"
                        ref={containerRef}
                        onClick={handleContainerClick}
                    >
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            onChange={handleChange}
                            handleKeyCommand={handleKeyCommand}
                            placeholder={lang === 'ru' ? 'Введите текст статьи...' : 'Enter the article text...'}
                        />
                    </div>
                ) : (
                    <div className="text-editor_split">
                        {/* Левая панель — исходник Markdown */}
                        <div className="text-editor_split_left">
                            <textarea
                                ref={markdownTextareaRef}
                                className="text-editor_split_textarea"
                                value={markdownText}
                                onChange={(e) => setMarkdownText(e.target.value)}
                                placeholder={lang === 'ru' ? 'Введите Markdown...' : 'Enter Markdown...'}
                                spellCheck={false}
                            />
                        </div>
                        {/* Правая панель — превью */}
                        <div className="text-editor_split_right">
                            <div dangerouslySetInnerHTML={{ __html: marked.parse(markdownText) }} />
                        </div>
                    </div>
                )}

                <div className="text-editor_footer">
                    <div className="text-editor_footer_btn">
                        <button type="button" onClick={handleSavePublish} className='text-editor_footer_btn-agree'>
                            {lang === 'ru' ? 'Сохранить и опубликовать' : 'Save and publish'}
                        </button>
                        <button type="button" onClick={handleSaveDraft} className='text-editor_footer_btn-draft'>
                            {lang === 'ru' ? 'Сохранить как черновик' : 'Save as a draft'}
                        </button>
                    </div>
                    <div className="text-editor_footer_btn">
                        <button type="button" onClick={handleBack} className='text-editor_footer_btn-cancel'>
                            {lang === 'ru' ? 'Отменить и выйти' : 'Cancel and exit'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-image">
                <div
                    className={`text-image-choose ${image ? 'image' : ''}`}
                    onClick={() => imageInputRef.current?.click()}
                >
                    {image ? (
                        <>
                            <img src={image} alt="" className="text-image-preview" />
                            <div
                                className='text-image-choose_image-span'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImage('');
                                }}
                            >
                                <span>
                                    {lang === 'ru'
                                        ? 'Удалить'
                                        : 'Delete'
                                    }
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <img src={require('../../assets/icons/image.png')} alt="" />
                            <span>
                                {lang === 'ru'
                                    ? 'Добавить изображение'
                                    : 'Add an image'
                                }
                            </span>
                        </>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    onChange={handleImageChoose}
                    style={{ display: 'none' }}
                />
            </div>
        </>
    );
};

export default TextEditor;
