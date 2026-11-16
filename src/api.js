import { useEffect, useState } from "react";
import { API } from "./settings";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export const NewList = ({ page = 1 }) => {
    const [ data, setData ] = useState(null);
    useEffect(() => {
        fetch(`${API}/api/articles/?page=${page}`).then((r) => r.json()).then(setData);
    }, [page]);
    if (!data) return null;
    return data.results.map((a) => (
        <a key={a.id} href={`/news/${a.id}`}>
            {a.image && <img src={a.image} alt="" />}
            <h3>{a.title}</h3>
            <time>{new Date(a.time).toLocaleDateString('ru-RU')}</time>
        </a>
    ))
};
export const NewArticle = ({ id }) => {
    const [ a, setA ] = useState(null);
    useEffect(() => {
        fetch(`${API}/api/articles/${id}`).then((r) => (r.ok ? r.json() : null)).then(setA);
    }, [id]);
    if (!a) return null;
    return (
        <article>
            <h1>{a.title}</h1>
            {a.image && <img src={a.image} alt="" />}
            <ReactMarkdown remarkPlugins={[remarkGfm]}></ReactMarkdown>
        </article>
    )
};