import React from "react";
import './ContentCompany.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const ContentCompany = () => {
    const { lang } = useLocalSettings();
    
    return (
        <>
            <div className="contentCompany">
                <div className="container">
                    <div className="contentCompany_content">
                        <div className="contentCompany_content_title bold">
                            {lang === 'ru'
                                ? 'О компании'
                                : 'About company'
                            }
                        </div>
                        <div className="contentCompany_content_description">
                            <span className="contentCompany_content_description_item bold" translate="no">
                                {lang === 'ru'
                                    ? 'DMT Soft — команда IT-специалистов и инженеров, создавшая программный продукт для проектировщиков.'
                                    : 'DMT Soft is a team of IT specialists and engineers that created a software product for designers.'
                                }
                            </span>
                            <span className="contentCompany_content_description_item" translate="no">
                                {lang === 'ru'
                                    ? 'В основе наших разработок — потребности и задачи инженера. Мы создаём решения, которые помогают специалисту работать удобнее, быстрее и эффективнее, не перегружая рабочие процессы избыточным административным контролем, что позволяет компании достигать большего результата за меньшее время.'
                                    : 'Our developments are based on the needs and tasks of the engineer. We create solutions that help specialists work more conveniently, faster, and more efficiently, without overloading work processes with excessive administrative control, which allows the company to achieve greater results in less time.'
                                }
                            </span>
                        </div>
                        
                        <div className="contentCompany_content_contacts">
                            <div className="contentCompany_content_contacts_title bold">
                                {lang === 'ru'
                                    ? 'Контактная информация'
                                    : 'Contact information'
                                }
                            </div>
                            <div className="contentCompany_content_contacts_points">
                                <div className="contentCompany_content_contacts_points_item">
                                    <div className="contentCompany_content_contacts_points_item_name bold">
                                        <span>
                                            {lang === 'ru'
                                                ? 'Контактный номер телефона'
                                                : 'Contact phone'
                                            }:
                                        </span>
                                    </div>
                                    <div className="contentCompany_content_contacts_points_item_value">
                                        <span>+7 (054) 543-87-23</span>
                                    </div>
                                </div>
                                <div className="contentCompany_content_contacts_points_item">
                                    <div className="contentCompany_content_contacts_points_item_name bold">
                                        <span>
                                            {lang === 'ru'
                                                ? 'Электронная почта'
                                                : 'E-mail'
                                            }:
                                        </span>
                                    </div>
                                    <div className="contentCompany_content_contacts_points_item_value">
                                        <span>dmt_soft@support.com</span>
                                    </div>
                                </div>
                                <div className="contentCompany_content_contacts_points_item">
                                    <div className="contentCompany_content_contacts_points_item_name bold">
                                        <span>
                                            {lang === 'ru'
                                                ? 'Фактический адрес'
                                                : 'Actual address'
                                            }:
                                        </span>
                                    </div>
                                    <div className="contentCompany_content_contacts_points_item_value">
                                        <span>г. Москва, ул. Неизвестная, 8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ContentCompany;