import React, { useEffect } from "react";
import './ContentArticle.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { NEWS } from "../../hooks/data";

const ContentArticle = () => {
    const { lang } = useLocalSettings();
    
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
        // navigate('/');
    };
    
    const { idArticle } = useParams();
    const dataArticle = NEWS.find(item => item.id === Number(idArticle));
    console.log('id статьи: ', idArticle);

    useEffect(() => {
        // Сбрасываем скролл только один раз при входе на страницу
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);


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
                                {lang === 'ru'
                                    ? 'Назад'
                                    : 'Back'
                                }
                            </button>
                        </div>
                        <div className="contentArticle_content_article">
                            <div className="contentArticle_content_article_content">
                                <div className="contentArticle_content_article_content_item contentArticle_content_article_content_title bold">
                                    {dataArticle.title}
                                </div>
                                <div className="contentArticle_content_article_content_item contentArticle_content_article_content_time text">
                                    {lang === 'ru'
                                        ? dataArticle.time_ru
                                        : dataArticle.time_en
                                    }
                                </div>
                                <div className="contentArticle_content_article_content_image">
                                    <img src={require(`../../assets/images/${dataArticle.image}`)} alt="" />
                                </div>
                                <div className="contentArticle_content_article_content_parags">
                                    {dataArticle.articles.map((item) => (
                                        <p key={item.id} className="contentArticle_content_article_content_item contentArticle_content_article_content_parags_item text">
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