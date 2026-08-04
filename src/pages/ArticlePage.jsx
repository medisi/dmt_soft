import React, { useEffect } from "react";
import HeaderArticle from "../components/HeaderArticle/HeaderArticle";
import FooterArticle from "../components/FooterArticle/FooterArticle";
import ContentArticle from "../components/ContentArticle/ContentArticle";
import { useParams } from "react-router-dom";
import { NEWS } from "../hooks/data";

const ArticlePage = () => {
    useEffect(() => {
        // Сбрасываем скролл только один раз при входе на страницу
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    const { idArticle } = useParams();
    const dataArticle = NEWS.find(item => item.id === Number(idArticle));
    document.title = `ООО «ДМТ Софт» | Статья: ${dataArticle.title}`;
    
    return (
        <>
            <HeaderArticle />
            <ContentArticle />
            <FooterArticle />
        </>
    )
};
export default ArticlePage;