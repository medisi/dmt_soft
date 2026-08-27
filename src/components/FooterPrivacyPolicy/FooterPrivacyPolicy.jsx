import React from "react";
import './FooterPrivacyPolicy.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const FooterPrivacyPolicy = () => {
    const { lang } = useLocalSettings();

    const cards = document.querySelectorAll('.anim');
    const checkCards = () => {
        const trigger = (window.innerHeight / 5) * 4;
        for (const card of cards) {
            const topOfCard = card.getBoundingClientRect().top;
            if (topOfCard < trigger) {
                card.classList.add('show');
            }
        }
    };
    checkCards();
    window.addEventListener('scroll', checkCards);

    return (
        <>
            <footer className="footer article anim">
                <div className="container">
                    <div className="footer_content">
                        <div className="footer_content_item_top">
                            <div className="footer_content_item_top_info">
                                <div className="footer_content_item_top_logo">
                                    <img src={require('../../assets/images/logo.png')} alt="" />
                                </div>
                                <div className="footer_content_item_top_text suptext">
                                    {lang === 'ru'
                                        ? 'Единая цифровая среда для создания, хранения, обновления и работы с данными инфраструктурных проектов'
                                        : 'A unified digital environment for creating, storing, updating, and working with infrastructure project data'
                                    }
                                </div>
                            </div>
                            
                        </div>

                        <div className="footer_content_item_bottom">
                            <div className="footer_content_item_bottom_item copyright">
                                <span className="suptext">
                                    {lang === 'ru'
                                        ? '© ДМТ Софт 2026'
                                        : '© DMT Soft 2026'
                                    }
                                </span>
                            </div>
                            <div className="footer_content_item_bottom_item">
                                <span className="footer_content_item_bottom_item_link suptext">
                                    {lang === 'ru'
                                        ? 'Пользовательское соглашение'
                                        : 'User agreement'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
};
export default FooterPrivacyPolicy;