import React, { useMemo } from "react";
import './ContentArticle.css';
import { useNavigate, useParams } from "react-router-dom";
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useAllArticles } from "../../hooks/useAllArticles";

const ContentArticle = () => {
    const { lang } = useLocalSettings();
    const navigate = useNavigate();
    const { idArticle } = useParams();

    const { allArticles } = useAllArticles();

    const handleBack = () => {
        navigate(-1);
    };

    const dataArticle = useMemo(() => {
        return allArticles.find(
            (item) => item.id === Number(idArticle) && item.status === 'public'
        );
    }, [allArticles, idArticle]);

    // Все хуки — ДО условного return
    const paragraphs = useMemo(() => {
        if (!dataArticle) return [];
        if (dataArticle.articles && dataArticle.articles.length > 0) {
            return dataArticle.articles
                .filter((item) => item.article && item.article.trim() !== '')
                .map((item, idx) => ({
                    id: item.id ?? idx,
                    article: item.article,
                }));
        }
        if (dataArticle.content && dataArticle.content.blocks) {
            return dataArticle.content.blocks
                .filter((block) => block.text && block.text.trim() !== '')
                .map((block, index) => ({
                    id: block.key || index,
                    article: block.text,
                }));
        }
        return [];
    }, [dataArticle]);

    // Заголовок: сначала dataArticle.title, если его нет — берём первый абзац
    const displayTitle = dataArticle?.title || (paragraphs.length > 0 ? paragraphs[0].article : '');
    
    const bodyParagraphs = useMemo(() => {
        // Если нет данных или нет абзацев — возвращаем пустоту
        if (!paragraphs || paragraphs.length === 0) {
            return ;
        }

        // Если заголовок есть И первый абзац полностью совпадает с ним — убираем первый абзац
        if (dataArticle?.title && paragraphs[0].article === dataArticle.title) {
        //     console.log('Заголовок из title: ', dataArticle.title);
        //     console.log('Заголовок из параграфа: ', paragraphs[0].article);
        //     console.log('Заголовок и первый абзац совпадают → убираем первый абзац');
            return paragraphs.slice(1);
        }

        // Во всех остальных случаях (нет заголовка, или они разные) — оставляем все абзацы
        // console.log('Заголовок и первый абзац НЕ совпадают (или заголовка нет) → оставляем все абзацы');
        return paragraphs;
    }, [paragraphs, dataArticle]);



    const PLACEHOLDER_IMAGE = require('../../assets/icons/image.png');

    const getArticleImage = (image) => {
        if (!image) return PLACEHOLDER_IMAGE;
        if (image.startsWith('data:image')) return image;
        try {
            return require(`../../assets/images/${image}`);
        } catch {
            return PLACEHOLDER_IMAGE;
        }
    };

    // Теперь условный return — после всех хуков
    if (!dataArticle) {
        return (
            <div className="contentArticle">
                <div className="container">
                    <div className="contentArticle_content">
                        <div className="contentArticle_content_head">
                            <button
                                id="contentArticle_content_head_back"
                                className="text"
                                onClick={handleBack}
                            >
                                {lang === 'ru' ? 'Назад' : 'Back'}
                            </button>
                        </div>
                        <div className="contentArticle_content_article">
                            <div className="contentArticle_content_article_content">
                                <div className="contentArticle_content_article_content_title bold">
                                    {lang === 'ru'
                                        ? 'Статья не найдена'
                                        : 'Article not found'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="contentArticle">
                <div className="container">
                    <div className="contentArticle_content">
                        <div className="contentArticle_content_head">
                            <button
                                id="contentArticle_content_head_back"
                                className="text"
                                onClick={handleBack}
                            >
                                {lang === 'ru' ? 'Назад' : 'Back'}
                            </button>
                        </div>
                        <div className="contentArticle_content_article">
                            <div className="contentArticle_content_article_content">
                                <div className="contentArticle_content_article_content_item contentArticle_content_article_content_title bold">
                                    {dataArticle.title}
                                </div>
                                <div className="contentArticle_content_article_content_time text">
                                    {lang === 'ru'
                                        ? dataArticle.time_ru
                                        : dataArticle.time_en}
                                </div>
                                {dataArticle.image && (
                                    <div className="contentArticle_content_article_content_image">
                                        <img
                                            src={getArticleImage(dataArticle.image)}
                                            alt=""
                                            className={!dataArticle.image ? 'noImage' : ''}
                                        />
                                    </div>
                                )}
                                <div className="contentArticle_content_article_content_parags">
                                    {bodyParagraphs.map((item) => (
                                        <p
                                            key={item.id || item.article}
                                            className="contentArticle_content_article_content_item contentArticle_content_article_content_parags_item text"
                                        >
                                            {item.article}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentArticle;