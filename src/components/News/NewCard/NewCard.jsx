import React, { useEffect, useState } from "react";
import './NewCard.css';
import { useLocalSettings } from "../../../hooks/useLocalSettings";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const NewCard = ({ id, image, time, title, article, views }) => {
    const { lang } = useLocalSettings();
    const navigate = useNavigate();
    const [ isMobile, setIsMobile ] = useState(false);

    // useEffect(() => {
    //     if (window.innerWidth <= 1050) {
    //         setIsMobile(true);
    //     } else {
    //         setIsMobile(false);
    //     }
    // }, []);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1050);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={isMobile ? 'mobile-article-card' : 'desktop-article-card'}>
                {image && (
                    <div className="article-card-image-wrapper">
                        <img
                            src={image}
                            alt={title}
                            className="article-card-image"
                            loading="lazy"
                        />
                    </div>
                )}
                <div className="article-card-meta">
                    <span className="article-card-time">{new Date(time).toLocaleString()}</span>
                    {views !== undefined && (
                        <span className="article-card-views">
                            {lang === 'ru' ? 'Просмотры: ' : 'Views: '} {views}
                        </span>
                    )}
                </div>

                <h2 className="article-card-title bold">{title}</h2>

                <div className="article-card-content">
                    <ReactMarkdown components={{
                        img: ({ node, ...props }) => (
                            <img
                                src={props.src}
                                alt={props.alt || 'Иллюстрация'}
                                className="markdown-image"
                                loading="lazy"
                            />
                        ),
                        a: ({ node, href, children, ...props }) => (
                            <a href={href}>
                                {children}
                            </a>
                        )
                    }}
                    >
                        {article}
                    </ReactMarkdown>
                </div>
                <Link
                    to="/news"
                    className="article-card-back-link text"
                >
                    {lang === 'ru' ? '← Назад к новостям' : '← Back to news'}
                </Link>
            </div>
            {/* {!isMobile ? (
                <div className="news_content_cards_item">
                    <div className="news_content_cards_item_image">
                        <img src={require(`../../../assets/images/${image}`)} alt="" />
                    </div>
                    <div className="news_content_cards_item_time">{time}</div>
                    <div className="news_content_cards_item_title bold">{title}</div>
                    <div className="news_content_cards_item_texts">
                        {articles.map((item) => (
                            <p className="news_content_cards_item_texts_item text">
                                {item.article}
                            </p>
                        ))}
                    </div>
                    <Link
                        to={`/article/${encodeURIComponent(id)}`}
                        className="news_content_cards_item_btn text"
                    >
                        {lang === 'ru'
                            ? 'Подробнее'
                            : 'More detailed'
                        }
                    </Link>
                </div>
            ) : (
                <div className="modileNews_content_cards_item">
                    <div className="modileNews_content_cards_item_image">
                        <img src={require(`../../../assets/images/${image}`)} alt="" />
                    </div>
                    <div className="modileNews_content_cards_item_info">
                        <div className="modileNews_content_cards_item_info_time">{time}</div>
                        <div className="modileNews_content_cards_item_info_title bold">{title}</div>
                        <div className="modileNews_content_cards_item_info_texts">
                            {articles.map((item) => (
                                <p className="modileNews_content_cards_item_info_texts_item text">
                                    {item.article}
                                </p>
                            ))}
                        </div>
                    </div>
                    <Link
                        to={`/article/${encodeURIComponent(id)}`}
                        className="modileNews_content_cards_item_link"
                    >
                        <img src={require('../../../assets/icons/arrow.png')} alt="" />
                    </Link>
                </div>
            )} */}
        </>
    )
};
export default NewCard;