import React, { useEffect } from 'react';
import './HeaderPrivacyPolicy.css';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import darkIcon from '../../assets/icons/dark.png';
import lightIcon from '../../assets/icons/light.png';

const HeaderPrivacyPolicy = () => {
    const { theme, lang, updateTheme, updateLang, isSettingsLoaded } = useLocalSettings();
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
            <div className={`header headerNew`}>
                <div className="container">
                    <div className="header_content">
                        <a href="#" className="header_content_logo">
                            <img src={require('../../assets/images/logo.png')} alt="" />
                        </a>

                        <div className={`header_content_btns`}>
                            <div
                                className="header_content_btns_item theme"
                                onClick={() => updateTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                <img src={themeIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default HeaderPrivacyPolicy;