import React, { useState } from "react";
import './ContentAdminPanel.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useNavigate } from "react-router-dom";
import { BRIEF_SUMMARY } from "../../hooks/data";

const ContentAdminPanel = () => {
    const { lang, theme, updateTheme } = useLocalSettings();
    const navigate = useNavigate();
    const [ sidebarHidden, setSidebarHidden ] = useState(false);

    const handleChangeSidebar = () => {
        setSidebarHidden((prev) => !prev);
    };
    const handleBack = () => {
        navigate('/admin_panel-authorization');
    };
    
    return (
        <>
            <div className="adminPanel">
                <div className="container">
                    <div className="adminPanel_layout">

                        <aside className={`adminPanel_layout_sidebar ${sidebarHidden ? 'hidden' : ''}`}>
                            <button
                                id="adminPanel_layout_sidebar_hidden_btn"
                                onClick={handleChangeSidebar}
                            >
                                <img src={require('../../assets/icons/hidden.png')} alt="" />
                            </button>

                            <div className={`adminPanel_layout_sidebar_logo ${sidebarHidden ? 'hidden' : 'visible'}`}>
                                <img src={require(`../../assets/images/${sidebarHidden ? 'logotip' : 'logo'}.png`)} alt="" />
                                <span>ADMIN</span>
                            </div>

                            <div className="adminPanel_layout_sidebar_menu">
                                <div className="adminPanel_layout_sidebar_menu_item active" title={sidebarHidden && (lang === 'ru' ? 'Главная' : 'Home')}>
                                    <img src={require('../../assets/icons/home.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Главная'
                                            : 'Home'
                                        }
                                    </span>
                                </div>
                                <div className="adminPanel_layout_sidebar_menu_item" title={sidebarHidden && (lang === 'ru' ? 'Статьи' : 'Articles')}>
                                    <img src={require('../../assets/icons/articles.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Статьи'
                                            : 'Articles'
                                        }
                                    </span>
                                </div>
                                <div className="adminPanel_layout_sidebar_menu_item" title={sidebarHidden && (lang === 'ru' ? 'Администраторы' : 'Administrators')}>
                                    <img src={require('../../assets/icons/admins.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Администраторы'
                                            : 'Administrators'
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="adminPanel_layout_sidebar_tools">
                                <div
                                    className="adminPanel_layout_sidebar_menu_item"
                                    title={sidebarHidden && (lang === 'ru' ? 'Тема' : 'Theme')}
                                    onClick={() => updateTheme(theme === 'dark' ?  'light' : 'dark')}
                                >
                                    <img src={require(`../../assets/icons/${theme === 'dark' ? 'admin_theme_dark' : 'admin_theme_light'}.png`)} alt="" />
                                    <span>
                                        {theme === 'dark' ? (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Темная тема'
                                                    : 'Dark theme'
                                                }
                                            </>
                                        ) : (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Светлая тема'
                                                    : 'Light theme'
                                                }
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="adminPanel_layout_sidebar_menu_item" title={sidebarHidden && (lang === 'ru' ? 'Настройки' : 'Settings')}>
                                    <img src={require('../../assets/icons/settings.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Настройки'
                                            : 'Settings'
                                        }
                                    </span>
                                </div>
                                <button
                                    className={`adminPanel_layout_sidebar_tools_bnt ${sidebarHidden ? 'hidden' : ''}`}
                                    title={sidebarHidden && (lang === 'ru' ? 'Выйти' : 'Quit')}
                                    onClick={handleBack}
                                >
                                    <img
                                        className="adminPanel_layout_sidebar_tools_bnt_image"
                                        src={require('../../assets/icons/exit.png')} alt=""
                                    />
                                    <span className="adminPanel_layout_sidebar_tools_bnt_text">
                                        {lang === 'ru'
                                            ? 'Выйти'
                                            : 'Quit'
                                        }
                                    </span>
                                </button>
                            </div>
                        </aside>

                        <div className="adminPanel_layout_content_home">
                            <div className="adminPanel_layout_content_home_header">
                                <div className="adminPanel_layout_content_home_header_title bold">
                                    {lang === 'ru'
                                        ? 'Главная'
                                        : 'Home'
                                    }
                                </div>
                                <div className="adminPanel_layout_content_home_header_text">
                                    {lang === 'ru'
                                        ? 'Краткая сводка по публикациям и просмотрам'
                                        : 'A brief summary of publications and views'
                                    }
                                </div>
                            </div>

                            <div className="adminPanel_layout_content_home_brief_summary">
                                {BRIEF_SUMMARY.map((item) => (
                                    <div className="adminPanel_layout_content_home_brief_summary_item" key={item.id}>
                                        <div className="adminPanel_layout_content_home_brief_summary_item_image">
                                            <span className={`adminPanel_layout_content_home_brief_summary_item_image_span ${item.image}`}>
                                                <img src={require(`../../assets/icons/${item.image}.png`)} alt="" />
                                            </span>
                                        </div>
                                        <div className="adminPanel_layout_content_home_brief_summary_item_info">
                                            <div className="adminPanel_layout_content_home_brief_summary_item_info_title">
                                                {lang === 'ru'
                                                    ? item.title_ru
                                                    : item.title_en
                                                }
                                            </div>
                                            <div className="adminPanel_layout_content_home_brief_summary_item_info_count">
                                                <div className="adminPanel_layout_content_home_brief_summary_item_info_count_value bold">
                                                    <span>{item.count}</span>
                                                </div>
                                                <div className="adminPanel_layout_content_home_brief_summary_item_info_count_procent">
                                                    <img src={require('../../assets/icons/admin_arrow.png')} alt="" />
                                                    <span>+${item.procent}%</span>
                                                </div>
                                            </div>
                                            <div className="adminPanel_layout_content_home_brief_summary_item_info_text">
                                                {lang === 'ru'
                                                    ? 'за последние 30 дней'
                                                    : 'over the past 30 days'
                                                }
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};
export default ContentAdminPanel;