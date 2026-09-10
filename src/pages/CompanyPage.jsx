import React from "react";
import HeaderCompact from "../components/HeaderCompact/HeaderCompact";
import FooterArticle from "../components/FooterArticle/FooterArticle";
import ContentCompany from "../components/ContentCompany/ContentCompany";
import { useLocalSettings } from "../hooks/useLocalSettings";

const CompanyPage = () => {
    const { lang } = useLocalSettings();
    document.title=`DMT ${lang === 'ru' ? 'Софт' : 'Soft'} | О компании`;
    
    return (
        <>
            <HeaderCompact />
            <ContentCompany />
            <FooterArticle />
        </>
    );
};
export default CompanyPage;