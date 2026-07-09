import React, { useEffect } from "react";
import './MobileMenu.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import darkIcon from '../../assets/icons/dark.png';
import lightIcon from '../../assets/icons/light.png';

const MobileMenu = ({ onTap }) => {
    const { lang, theme, updateTheme, updateLang, isSettingsLoaded } = useLocalSettings();
    useEffect(() => {
        if (!isSettingsLoaded) return;
        const page = document.querySelector('.landing_page');
        if (!page) return;
        page.classList.remove('light', 'dark');
        page.classList.add(theme);
    }, [theme, isSettingsLoaded]);
    const themeIcon = theme === 'dark' ? darkIcon : lightIcon;
    
    return (
        <>
            <div className='mobile_menu'>
                <a href="#baseModules" className="mobile_menu_item text" onClick={onTap}>
                    {lang === 'ru'
                        ? 'Продукты'
                        : 'Products'
                    }
                </a>
                <div className="mobile_menu_item" onClick={onTap}>
                    {lang === 'ru'
                        ? 'Клиенты'
                        : 'Clients'
                    }
                </div>
                <div className="mobile_menu_item text" onClick={onTap}>
                    {lang === 'ru'
                        ? 'Компания'
                        : 'Company'
                    }
                </div>
                <div className="mobile_menu_item text" onClick={onTap}>
                    {lang === 'ru'
                        ? 'Загрузки'
                        : 'Downloads'
                    }
                </div>
                <div className="mobile_menu_item text" onClick={onTap}>
                    {lang === 'ru'
                        ? 'Поддержка'
                        : 'Support'
                    }
                </div>
                <a 
                    href="https://base.dmtsoft.com/"
                    className="mobile_menu_login text"
                    target="_blank"
                >
                    {lang === 'ru'
                        ? 'Войти'
                        : 'Login'
                    }
                </a>
                <div className="mobile_menu_btns">
                    <button className="mobile_menu_btns_item theme"
                        onClick={() => updateTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <img src={themeIcon} alt="" />
                    </button>
                    <div 
                        className="mobile_menu_btns_item lang text"
                        onClick={() => updateLang(lang === 'ru' ? 'en' : 'ru')}
                    >
                        {lang === 'ru'
                            ? 'RU'
                            : 'EN'
                        }
                    </div>
                </div>
            </div>
        </>
    )
};
export default MobileMenu;