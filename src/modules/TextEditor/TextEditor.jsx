import React, { useEffect, useRef, useState } from 'react';
import './TextEditor.css';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import { useNavigate } from 'react-router-dom';

const TextEditor = ({ initialContent, onSave }) => {
    const { lang } = useLocalSettings();
    const [editorState, setEditorState] = useState(() => {
        if (initialContent) {
            return EditorState.createWithContent(convertFromRaw(initialContent));
        }
        return EditorState.createEmpty();
    });
    const fileInputRef = useRef(null);
    const editorRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate('/admin_panel');
    };

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

    const getEditorContent = () => {
        return convertToRaw(editorState.getCurrentContent());
    };

    const handleSave = () => {
        if (onSave) onSave(getEditorContent());
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

    return (
        <div className="text-editor">
            {/* Тулбар */}
            <div className="text-editor_toolbar">
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
                >
                    🖼
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
            </div>

            {/* Область редактирования */}
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

            <div className="text-editor_footer">
                <button type="button" onClick={handleSave} className='text-editor_footer_btn-agree'>
                    {lang === 'ru' ? 'Сохранить' : 'Save'}
                </button>
                <button type="button" onClick={handleBack} className='text-editor_footer_btn-cancel'>
                    {lang === 'ru' ? 'Отменить и выйти' : 'Cancel and exit'}
                </button>
            </div>
        </div>
    );
};

export default TextEditor;
