import React from "react";
import './ContentUserAgreement.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useNavigate } from "react-router-dom";
import { USER_AGREEMENT } from "../../hooks/data";

const ContentUserAgreement = () => {
    const { lang } = useLocalSettings();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="contentUserAgreement">
                <div className="container">
                    <div className="contentUserAgreement_content">
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
                        <div className="contentUserAgreement_content_block">
                            <div className="contentUserAgreement_content_time">
                                {lang === 'ru'
                                    ? 'Обновлено 24.08.2926'
                                    : 'Updated on 24/08/2026'
                                }
                            </div>
                            <div className="contentUserAgreement_content_title bold">
                                Пользовательское соглашение
                            </div>
                            <div className="contentUserAgreement_content_content">
                                {USER_AGREEMENT.map((item) => (
                                    <>
                                        <div className="contentUserAgreement_content_content_item" key={item.id}>
                                            <div className="contentUserAgreement_content_content_item_title bold">
                                                {item.number_point}. {item.title}
                                            </div>
                                            <div className="contentUserAgreement_content_content_item_texts">
                                                {item.points.map((point) => (
                                                    <>
                                                        <div className="contentUserAgreement_content_content_item_texts_item" key={point.id}>
                                                            {point.number_point}. {point.text}
                                                        </div>
                                                        {point.inpoints && (
                                                            <div className="contentUserAgreement_content_content_item_texts_item_subpoints">
                                                                {point.inpoints.map((sub) => (
                                                                    <div className="contentUserAgreement_content_content_item_texts_item_subpoints_item" key={sub.id}>
                                                                        {sub.number_point}. {sub.text}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {point.lists && (
                                                            <ul className="contentUserAgreement_content_content_item_texts_item_list">
                                                                {point.lists.map((list) => (
                                                                    <li className="contentUserAgreement_content_content_item_texts_item_list_item">
                                                                        {list.text}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </>
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
export default ContentUserAgreement;