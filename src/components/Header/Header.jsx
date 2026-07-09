import React, { useEffect, useState } from 'react';
import './Header.css';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import darkIcon from '../../assets/icons/dark.png';
import lightIcon from '../../assets/icons/light.png';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {
    const { theme, lang, updateTheme, updateLang, isSettingsLoaded } = useLocalSettings();
    useEffect(() => {
        if (!isSettingsLoaded) return;
        const page = document.querySelector('.landing_page');
        if (!page) return;
        page.classList.remove('light', 'dark');
        page.classList.add(theme);
    }, [theme, isSettingsLoaded]);
    const themeIcon = theme === 'dark' ? darkIcon : lightIcon;

    const [ closeMenu, setCloseMenu ] = useState(true);
    const [ hiddenBtns, setHiddenBtns ] = useState(false);

    const handleMenu = () => {
        setCloseMenu(!closeMenu);
        if (closeMenu) {
            setHiddenBtns(true);
        } else {
            setHiddenBtns(false);
        }
    };

    const handleTap = () => {
        setCloseMenu(true);
        setHiddenBtns(false);
    };

    const cards = document.querySelectorAll('.anim');
    const checkCards = () => {
        const trigger = (window.innerHeight / 5) * 4.5;
        for (const card of cards) {
            const topOfCard = card.getBoundingClientRect().top;
            if (topOfCard < trigger) {
                card.classList.add('show');
            }
            //  else {
            //     card.classList.remove('show');
            // }
        }
    };
    checkCards();
    window.addEventListener('scroll', checkCards);

    return (
        <>
            <div className={`header ${!closeMenu ? 'open_menu' : ''}`}>
                <div className="container">
                    <div className="header_content">
                        <div
                            id="mobile_menu"
                            className='material-icons md-18'
                            onClick={handleMenu}
                        >
                            {closeMenu
                                ? 'menu'
                                : 'close'
                            }
                        </div>

                        <a href="#" className="header_content_logo anim">
                            <img src={require('../../assets/images/logo.png')} alt="" />
                        </a>
                        <nav className="header_content_menu anim">
                            <a href="#baseModules" className="header_content_menu_item text">
                                {lang === 'ru'
                                    ? 'Продукты'
                                    : 'Products'
                                }
                            </a>
                            <div className="header_content_menu_item text">
                                {lang === 'ru'
                                    ? 'Клиенты'
                                    : 'Clients'
                                }
                            </div>
                            <div className="header_content_menu_item text">
                                {lang === 'ru'
                                    ? 'Компания'
                                    : 'Company'
                                }
                            </div>
                            <div className="header_content_menu_item text">
                                {lang === 'ru'
                                    ? 'Загрузки'
                                    : 'Download'
                                }
                            </div>
                            <div className="header_content_menu_item text">
                                {lang === 'ru'
                                    ? 'Поддержка'
                                    : 'Support'
                                }
                            </div>
                        </nav>

                        <div className={`header_content_btns anim ${hiddenBtns ? 'hidden' : ''}`}>
                            <div
                                className="header_content_btns_item theme"
                                onClick={() => updateTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                <img src={themeIcon} alt="" />
                            </div>
                            <div 
                                className="header_content_btns_item lang text"
                                onClick={() => updateLang(lang === 'ru' ? 'en' : 'ru')}
                            >
                                {lang === 'ru'
                                    ? 'ru'
                                    : 'en'
                                }
                            </div>
                            <a
                                href="https://base.dmtsoft.com/"
                                className="header_content_btns_item login text"
                                target="_blank"
                            >
                                {lang === 'ru'
                                    ? 'Войти'
                                    : 'Login'
                                }
                            </a>
                        </div>
                    </div>
                    {!closeMenu && (
                        <MobileMenu
                            onTap={() => handleTap()}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
export default Header;