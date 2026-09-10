import React, { useEffect } from "react";
import { useLocalSettings } from "../hooks/useLocalSettings";
import ContentUserAgreement from "../components/ContentUserAgreement/ContentUserAgreement";
import FooterUserAgreement from "../components/FooterUserAgreement/FooterUserAgreement";
import HeaderCompact from "../components/HeaderCompact/HeaderCompact";

const UserAgreement = () => {
    const { lang } = useLocalSettings();
    document.title=`DMT ${lang === 'ru' ? 'Софт' : 'Soft'} | ${lang === 'ru' ? 'Пользовательское соглашение' : 'UserAgreement'}`;

    useEffect(() => {
        // Сбрасываем скролл только один раз при входе на страницу
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    return (
        <>
            <HeaderCompact />
            <ContentUserAgreement />
            <FooterUserAgreement />
        </>
    )
};
export default UserAgreement;