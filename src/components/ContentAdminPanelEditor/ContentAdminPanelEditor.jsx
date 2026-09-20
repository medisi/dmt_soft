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
    const [ showWarning, setShowWarning ] = useState(false);
    const [ warning, setWarning ] = useState({ message: '',  btn:'', action: '' });
    const navigate = useNavigate();
    const location = useLocation();

    const article = location.state?.article || null;
    const pageTitle = article
        ? (lang === 'ru' ? 'Редактирование статьи' : 'Edit article')
        : (lang === 'ru' ? 'Новая статья' : 'New article');

    useEffect(() => {
        if (article) {
            if (article.content) {
                setContent(article.content);
            } else if (article.articles) {
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

    const formatSaveDate = (isRu) => {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth()).padStart(2, '0');
        const yyyy = now.getFullYear();
        return isRu ? `${dd}.${mm}.${yyyy}` : `${dd}/${mm}/${yyyy}`;
    };

    const exrtactTitle = (rawContent) => {
        if (!rawContent || !rawContent.blocks || !Array.isArray(rawContent.blocks)) {
            return '';
        }
        const firstTextBlock = rawContent.blocks.find(
            (block) => block.text && block.text.trim() !== ""
        );
        return firstTextBlock ? firstTextBlock.text.trim() : '';
    };

    // ГАРАНТИРОВАННО возвращает массив. Никаких исключений, никаких undefined.
    const getSafeArticlesList = () => {
        try {
            const raw = localStorage.getItem('ArticlesDMTSoft');
            
            // Если нет данных или не строка — возвращаем пустой массив
            if (!raw || typeof raw !== 'string') {
                return ;
            }

            const parsed = JSON.parse(raw);

            // Если распарсилось, но это не массив — возвращаем пустой массив
            if (!Array.isArray(parsed)) {
                console.warn('В localStorage лежит не массив, сбрасываем в ', parsed);
                return ;
            }

            return parsed;
        } catch (e) {
            // Если JSON битый — возвращаем пустой массив
            console.error('Ошибка парсинга localStorage, возвращаем пустой массив', e);
            return ;
        }
    };

    const getMaxIdFromArray = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
            return 0;
        }
        const validIds = arr
            .map(item => item.id)
            .filter(id => typeof id === 'number');
        
        return validIds.length > 0 ? Math.max(...validIds) : 0;
    };

    const handleSaveDraft = (rawContent, image) => {
        if (!rawContent.blocks[0].text || (rawContent.blocks[0].text === '' && rawContent.blocks.length <= 1)) {
            setShowWarning(true);
            setWarning({
                message: lang === 'ru'
                    ? 'Пустое поле ввода'
                    : 'Empty input field'
                ,
                btn: lang === 'ru' ? 'Выйти' : 'Quit',
                action: () => {
                    setShowWarning(false);
                    navigate('/admin_panel');
                },
                etc: '',
            });
            return;
        };
        
        setContent(rawContent);
        const title = exrtactTitle(rawContent);
        const timeRu = formatSaveDate(true);
        const timeEn = formatSaveDate(false);
        const status = 'draft';
        const currentId = article ? article.id : savedArticleId;

        // Получаем список. Благодаря getSafeArticlesList это ВСЕГДА массив.
        let stored = getSafeArticlesList();

        // ДОПОЛНИТЕЛЬНАЯ СТРАХОВКА: если вдруг stored не массив (на всякий случай)
        if (!Array.isArray(stored)) {
            console.error('Критическая ошибка: stored не массив!', stored);
            stored = [];
        }

        const safeNews = Array.isArray(NEWS) ? NEWS : '';

        if (currentId) {
            const payload = {
                id: currentId,
                content: rawContent,
                image: image || null,
                title: title || (article?.title || ''),
                time_ru: timeRu,
                time_en: timeEn,
                status: status,
            };

            const existingIndex = stored.findIndex((item) => item.id === currentId);

            if (existingIndex !== -1) {
                stored[existingIndex] = { ...stored[existingIndex], ...payload };
            } else {
                stored.push({
                    ...article,
                    ...payload,
                    views: article.views || 0,
                });
            }
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
        } else {
            // Логика для новой статьи
            const maxNewsId = getMaxIdFromArray(safeNews);
            const maxStoredId = getMaxIdFromArray(stored);
            const newId = Math.max(maxNewsId, maxStoredId) + 1;

            const newArticle = {
                id: newId,
                content: rawContent,
                image: image || null,
                status: status,
                title: title,
                views: 0,
                time_ru: timeRu,
                time_en: timeEn,
            };

            // ЭТА СТРОКА ТЕПЕРЬ БЕЗОПАСНА, так как stored гарантированно массив
            stored.push(newArticle);
            
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
            setSavedArticleId(newId);
        }
    };

    const handleSavePublish = (rawContent, image) => {
        if (!rawContent.blocks[0].text && rawContent.blocks[0].text === '' && rawContent.blocks.length <= 1) {
            setShowWarning(true);
            setWarning({
                message: lang === 'ru'
                    ? 'Пустое поле ввода'
                    : 'Empty input field'
                ,
                btn: lang === 'ru' ? 'Выйти' : 'Quit',
                action: () => {
                    setShowWarning(false);
                    navigate('/admin_panel');
                },
                etc: '',
            });
            return;
        };

        setContent(rawContent);
        const title = exrtactTitle(rawContent);
        const timeRu = formatSaveDate(true);
        const timeEn = formatSaveDate(false);
        const status = 'public';
        const currentId = article ? article.id : savedArticleId;

        let stored = getSafeArticlesList();
        if (!Array.isArray(stored)) stored = [];
        
        const safeNews = Array.isArray(NEWS) ? NEWS : '';

        if (currentId) {
            const payload = {
                id: currentId,
                content: rawContent,
                image: image || null,
                title: title || (article?.title || ''),
                time_ru: timeRu,
                time_en: timeEn,
                status: status,
            };

            const existingIndex = stored.findIndex((item) => item.id === currentId);

            if (existingIndex !== -1) {
                stored[existingIndex] = { ...stored[existingIndex], ...payload };
            } else {
                stored.push({
                    ...article,
                    ...payload,
                    views: article.views || 0,
                });
            }
            localStorage.setItem('ArticlesDMTSoft', JSON.stringify(stored));
        } else {
            const maxNewsId = getMaxIdFromArray(safeNews);
            const maxStoredId = getMaxIdFromArray(stored);
            const newId = Math.max(maxNewsId, maxStoredId) + 1;

            const newArticle = {
                id: newId,
                content: rawContent,
                image: image || null,
                status: status,
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
                                {lang === 'ru' ? 'Назад' : 'Back'}
                            </button>
                            <div className="adminPanelEditor_content_header_title bold">
                                {pageTitle}
                            </div>
                        </div>
                        <div className="adminPanelEditor_content_description">
                            {lang === 'ru'
                                ? 'Используйте первую строку как заголовок статьи'
                                : 'Use the first line as the article title'
                            }
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

            {/* окно подтверждения и уведомления */}
            {showWarning && (
                <div className="modal">
                    <div className={`modal_content ${warning.etc === 'adminCard' ? 'adminCard' : ''}`}>
                        <div className="modal_text">{warning.message}</div>
                        <div className="modal_btns">
                            <button className='modal_btns_item agree' onClick={warning.action}>
                                {warning.btn}
                            </button>
                            <button className='modal_btns_item cancel' onClick={() => setShowWarning(false)}>
                                {lang === 'ru' ? 'Отмена' : 'Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContentAdminPanelEditor;