import React from "react";
import './Footer.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { ScrollLink } from "../../hooks/ScrollLink";
import { Link } from "react-router-dom";

const Footer = () => {
    const { lang } = useLocalSettings();

    return (
        <>
            <footer className="footer anim">
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
                            <div className="footer_content_item_top_menu">
                                <nav>
                                    <ScrollLink
                                        to="#baseModules"
                                        className="footer_content_item_top_menu_item text"
                                    >
                                        {lang === 'ru'
                                            ? 'Продукты'
                                            : 'Products'
                                        }
                                    </ScrollLink>
                                    <ScrollLink
                                        to="#clients"
                                        className="footer_content_item_top_menu_item text"
                                    >
                                        {lang === 'ru'
                                            ? 'Клиенты'
                                            : 'Clients'
                                        }
                                    </ScrollLink>
                                    <ScrollLink
                                        to="#news"
                                        className="footer_content_item_top_menu_item text"
                                    >
                                        {lang === 'ru'
                                            ? 'Компания'
                                            : 'Company'
                                        }
                                    </ScrollLink>
                                    <ScrollLink
                                        to="#downloadClient"
                                        className="footer_content_item_top_menu_item text"
                                    >
                                        {lang === 'ru'
                                            ? 'Загрузки'
                                            : 'Download'
                                        }
                                    </ScrollLink>
                                    <div className="footer_content_item_top_menu_item text">
                                        {lang === 'ru'
                                            ? 'Поддержка'
                                            : 'Support'
                                        }
                                    </div>
                                </nav>
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
                                <Link
                                    to={`/private_policy`}
                                    className="footer_content_item_bottom_item_link suptext"
                                >
                                    {lang === 'ru'
                                        ? 'Политика конфиденциальности'
                                        : 'Privacy policy'
                                    }
                                </Link>
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
export default Footer;