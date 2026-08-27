import React from "react";
import './ContentPrivacyPolicy.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useNavigate } from "react-router-dom";
import { PRIVATE_POLICY } from "../../hooks/data";

const ContentPrivacyPolicy = () => {
    const { lang } = useLocalSettings();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    
    return (
        <>
            <div className="contentPrivatePolicy">
                <div className="container">
                    <div className="contentPrivatePolicy_content">
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
                        <div className="contentPrivatePolicy_content_block">
                            <div className="contentPrivatePolicy_content_time">
                                {lang === 'ru'
                                    ? 'Обновлено 24.08.2026'
                                    : 'Updated on 24.08.2026'
                                }
                            </div>
                            <div className="contentPrivatePolicy_content_title bold">
                                Политика конфиденциальности персональных данных пользователей сайтов и сервисов
                            </div>
                            <div className="contentPrivatePolicy_content_content">
                                {PRIVATE_POLICY.map((item) => (
                                    <>
                                        <div className="contentPrivatePolicy_content_content_item" key={item.id}>
                                            <div className="contentPrivatePolicy_content_content_title bold">
                                                {item.number_point}. {item.title}
                                            </div>
                                            <div className="contentPrivatePolicy_content_content_texts">
                                                {item.points.map((point) => (
                                                    <div className="contentPrivatePolicy_content_content_texts_item" key={point.id}>
                                                        {point.number_point}. {point.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ContentPrivacyPolicy;