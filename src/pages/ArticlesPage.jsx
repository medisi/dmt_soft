import React, { useEffect } from "react";
import HeaderArticle from "../components/HeaderArticle/HeaderArticle";
import FooterArticle from "../components/FooterArticle/FooterArticle";
import AllArticlesContent from "../components/AllArticlesContent/AllArticlesContent";

const ArticlesPage = () => {
    useEffect(() => {
        // Сбрасываем скролл только один раз при входе на страницу
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);
    document.title = 'ООО «ДМТ Софт» | Все новости';
    return (
        <>
            <HeaderArticle />
            <AllArticlesContent />
            <FooterArticle />
        </>
    )
};
export default ArticlesPage;