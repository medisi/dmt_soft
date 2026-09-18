import React, { useEffect, useState } from 'react';
import './ContentAdminPanelEditor.css';
import TextEditor from '../../modules/TextEditor/TextEditor';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentState, convertToRaw } from 'draft-js';

const ContentAdminPanelEditor = () => {
    const { lang } = useLocalSettings();
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // получение статьи из стейта
    const article = location.state?.article || null;
    const pageTitle = article
        ? (lang === 'ru' ? 'Редактирование статьи' : 'Edit article')
        : (lang === 'ru' ? 'Новая статья' : 'New article');
    
    useEffect(() => {
        if (article && article.articles) {
            // setContent(article.rawContent);
            // console.log('Редактируем статью: ', article);
            const fullText = article.articles
                .map((a) => a.article)
                .join('\n\n');
            
            const contentState = ContentState.createFromText(fullText);
            const rawContent = convertToRaw(contentState);

            setContent(rawContent);
        }
    }, [article]);

    const handleSave = (rawContent) => {
        setContent(rawContent);
        if (article) {
            console.log('Обновление статьи на бэкенде:', JSON.stringify({
                id: article.id,
                content: rawContent,
            }));
        } else {
            console.log('Создание новой статьи на бэкенде:', JSON.stringify(rawContent));
        }
        // console.log('Сохранение на бэкенд:', JSON.stringify(rawContent));
        // Тут fetch/axios POST на ваш API
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
                            <TextEditor initialContent={content} onSave={handleSave} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContentAdminPanelEditor;
