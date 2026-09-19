import React, { useEffect, useMemo } from "react";
import HeaderArticle from "../components/HeaderArticle/HeaderArticle";
import FooterArticle from "../components/FooterArticle/FooterArticle";
import ContentArticle from "../components/ContentArticle/ContentArticle";
import { useParams } from "react-router-dom";
import { useAllArticles } from "../hooks/useAllArticles";

const ArticlePage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    const { idArticle } = useParams();
    const { allArticles } = useAllArticles();

    const dataArticle = useMemo(() => {
        return allArticles.find(
            (item) => item.id === Number(idArticle) && item.status === 'public'
        );
    }, [allArticles, idArticle]);

    document.title = dataArticle
        ? `ООО «ДМТ Софт» | Статья: ${dataArticle.title}`
        : `ООО «ДМТ Софт» | Статья не найдена`;

    return (
        <>
            <HeaderArticle />
            <ContentArticle />
            <FooterArticle />
        </>
    );
};

export default ArticlePage;