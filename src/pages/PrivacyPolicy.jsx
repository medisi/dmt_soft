import React, { useEffect } from "react";
import { useLocalSettings } from "../hooks/useLocalSettings";
import ContentPrivacyPolicy from "../components/ContentPrivatePolicy/ContentPrivacyPolicy";
import FooterPrivacyPolicy from "../components/FooterPrivacyPolicy/FooterPrivacyPolicy";
import HeaderCompact from "../components/HeaderCompact/HeaderCompact";

const PrivacyPolicy = () => {
    const { lang } = useLocalSettings();
    document.title=`DMT ${lang === 'ru' ? 'Софт' : 'Soft'} | ${lang === 'ru' ? 'Политика конфиденциальности персональных данных пользователей' : 'Privacy policy of personal data of users'}`;

    useEffect(() => {
        // Сбрасываем скролл только один раз при входе на страницу
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <>
            <HeaderCompact />
            <ContentPrivacyPolicy />
            <FooterPrivacyPolicy />
        </>
    )
};
export default PrivacyPolicy;