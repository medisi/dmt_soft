import React, { useEffect, useState } from 'react';
import './ContentAdminPanelEditor.css';
import TextEditor from '../../modules/TextEditor/TextEditor';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentState, convertToRaw } from 'draft-js';
import { NEWS } from '../../hooks/data';

const ContentAdminPanelEditor = () => {
    const { lang } = useLocalSettings();
    const [content, setContent] = useState(null);
    const [initialImage, setInitialImage] = useState(null);
    const [savedArticleId, setSavedArticleId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // получение статьи из стейта
    const article = location.state?.article || null;
    const pageTitle = article
        ? (lang === 'ru' ? 'Редактирование статьи' : 'Edit article')
        : (lang === 'ru' ? 'Новая статья' : 'New article');
    
    // useEffect(() => {
    //     if (article) {
    //         if (article.articles) {
    //             // setContent(article.rawContent);
    //             // console.log('Редактируем статью: ', article);
    //             const fullText = article.articles
    //                 .map((a) => a.article)
    //                 .join('\n\n');
    //             const contentState = ContentState.createFromText(fullText);
    //             const rawContent = convertToRaw(contentState);
    //             setContent(rawContent);
    //         }
    //         if (article.image) {
    //             setInitialImage(article.image);
    //         }
    //     }
    // }, [article]);
    useEffect(() => {
        if (article) {
            // Если у статьи есть content (raw Draft.js) — используем напрямую
            if (article.content) {
                setContent(article.content);
            } else if (article.articles) {
                // Статья из data.js — собираем текст
                const fullText = article.articles
                    .map((a) => a.article)
                    .join('\n\n');
                const contentState = ContentState.createFromText(fullText);
                setContent(convertToRaw(contentState));
            }

            if (article.image) {
                setInitialImage(article.image);
            }
        }
    }, [article]);


    // форматирование даты сохранения
    const formatSaveDate = (isRu) => {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth()).padStart(2, '0');
        const yyyy = now.getFullYear();
        return isRu ? `${dd}.${mm}.${yyyy}` : `${dd}/${mm}/${yyyy}`;
    };
    // извлечение заголовка из текста (первая строка)
    const exrtactTitle = (rawContent) => {
        if (!rawContent || !rawContent.blocks || rawContent.blocks.length === 0) {
            return '';
        }
        // берём первый блок
        const firstTextBlock = rawContent.blocks.find(
            (block) => block.text && block.text.trim() !== ""
        );
        return firstTextBlock ? firstTextBlock.text.trim() : '';
    };

    const handleSaveDraft = (rawContent, image) => {
        setContent(rawContent);
        const title = exrtactTitle(rawContent);
        const timeRu = formatSaveDate(true);
        const timeEn = formatSaveDate(false);

        const currentId = article ? article.id : savedArticleId;
        const status = 'draft'; // Явно задаем статус

        if (currentId) {
            const payload = {
                id: currentId,
                content: rawContent,
                image: image || null,
                title: title || (article?.title || ''),
                time_ru: timeRu,
                time_en: timeEn,
                status: status, // <--- ДОБАВЛЕНО: принудительно ставим статус
            };

            const stored = JSON.parse(localStorage.getItem('ArticlesDMTSoft') || '');
            const existingIndex = stored.findIndex((item) => item.id === currentId);

            if (existingIndex !== -1) {
                stored[existingIndex] = { ...stored[existingIndex], ...payload };
            } else {
                // Если статьи еще нет в localStorage (была только в data.js)
                stored.push({
                    ...article,
                    ...payload,
                    views: article.views || 0,
                });
            }
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
        } else {
            // Логика для новой статьи (первое сохранение)
            const stored = JSON.parse(localStorage.getItem('ArticlesDMTSoft') || '');
            const maxNewsId = NEWS.length > 0 ? Math.max(...NEWS.map((n) => n.id)) : 0;
            const maxStoredId = stored.length > 0 ? Math.max(...stored.map((s) => s.id)) : 0;
            const newId = Math.max(maxNewsId, maxStoredId) + 1;

            const newArticle = {
                id: newId,
                content: rawContent,
                image: image || null,
                status: status, // <--- ДОБАВЛЕНО
                title: title,
                views: 0,
                time_ru: timeRu,
                time_en: timeEn,
            };
            stored.push(newArticle);
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
            setSavedArticleId(newId);
        }
    };

    const handleSavePublish = (rawContent, image) => {
        setContent(rawContent);
        const title = exrtactTitle(rawContent);
        const timeRu = formatSaveDate(true);
        const timeEn = formatSaveDate(false);

        const currentId = article ? article.id : savedArticleId;
        const status = 'public'; // Явно задаем статус

        if (currentId) {
            const payload = {
                id: currentId,
                content: rawContent,
                image: image || null,
                title: title || (article?.title || ''),
                time_ru: timeRu,
                time_en: timeEn,
                status: status, // <--- ДОБАВЛЕНО: принудительно ставим статус
            };

            const stored = JSON.parse(localStorage.getItem('ArticlesDMTSoft') || '');
            const existingIndex = stored.findIndex((item) => item.id === currentId);

            if (existingIndex !== -1) {
                // Теперь статус точно станет 'public'
                stored[existingIndex] = { ...stored[existingIndex], ...payload };
            } else {
                // Если статьи еще нет в localStorage (была только в data.js)
                stored.push({
                    ...article,
                    ...payload,
                    views: article.views || 0,
                });
            }
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
        } else {
            // Логика для новой статьи (первое сохранение)
            const stored = JSON.parse(localStorage.getItem('ArticlesDMTSoft') || '');
            const maxNewsId = NEWS.length > 0 ? Math.max(...NEWS.map((n) => n.id)) : 0;
            const maxStoredId = stored.length > 0 ? Math.max(...stored.map((s) => s.id)) : 0;
            const newId = Math.max(maxNewsId, maxStoredId) + 1;

            const newArticle = {
                id: newId,
                content: rawContent,
                image: image || null,
                status: status, // <--- ДОБАВЛЕНО
                title: title,
                views: 0,
                time_ru: timeRu,
                time_en: timeEn,
            };
            stored.push(newArticle);
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
            setSavedArticleId(newId);
        }
    };



    const handleBack = () => {
        navigate('/admin_panel');
    };

    return (
        <>
            <div className="adminPanelEditor">
                <div className="container">
                    <div className="adminPanelEditor_content">
                        <div className="adminPanelEditor_content_header">
                            <button
                                className='adminPanelEditor_content_header_back'
                                onClick={handleBack}
                            >
                                {lang === 'ru'
                                    ? 'Назад'
                                    : 'Back'
                                }
                            </button>
                            <div className="adminPanelEditor_content_header_title bold">
                                {pageTitle}
                            </div>
                        </div>
                        <div className="adminPanelEditor_content_editor">
                            <TextEditor
                                initialContent={content}
                                initialImage={initialImage}
                                onSave={handleSavePublish}
                                onDraft={handleSaveDraft}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentAdminPanelEditor;
