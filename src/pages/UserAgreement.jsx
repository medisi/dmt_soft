import React, { useEffect } from "react";
import { useLocalSettings } from "../hooks/useLocalSettings";
import HeaderPrivacyPolicy from "../components/HeaderPrivacyPolicy/HeaderPrivacyPolicy";
import ContentUserAgreement from "../components/ContentUserAgreement/ContentUserAgreement";
import FooterUserAgreement from "../components/FooterUserAgreement/FooterUserAgreement";

const UserAgreement = () => {
    const { lang } = useLocalSettings();
    document.title=`DMT Soft | ${lang === 'ru' ? 'Пользовательское соглашение' : 'UserAgreement'}`;

    useEffect(() => {
        // Сбрасываем скролл только один раз при входе на страницу
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <>
            <HeaderPrivacyPolicy />
            <ContentUserAgreement />
            <FooterUserAgreement />
        </>
    )
};
export default UserAgreement;