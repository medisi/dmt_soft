import React from "react";
import HeaderArticle from "../components/HeaderArticle/HeaderArticle";
import FooterArticle from "../components/FooterArticle/FooterArticle";
import ContentArticle from "../components/ContentArticle/ContentArticle";

const ArticlePage = () => {
    document.title = "ООО «ДМТ Софт» | Новости: Новый архитектурный акцент города";
    
    return (
        <>
            <HeaderArticle />
            <ContentArticle />
            <FooterArticle />
        </>
    )
};
export default ArticlePage;