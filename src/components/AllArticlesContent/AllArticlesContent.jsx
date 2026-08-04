import React from "react";
import './AllArticlesContent.css';
import { NEWS } from "../../hooks/data";
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { Link } from "react-router-dom";

const AllArticlesContent = () => {
    const { lang } = useLocalSettings();
    return (
        <div className="allArticlesContent">
            <div className="container">
                <div className="allArticlesContent_content">
                    <div className="allArticlesContent_content_title title">
                        <Link
                            to="/"
                            className="allArticlesContent_content_title_item home"
                        >
                            {lang === 'ru'
                                ? 'Главная'
                                : 'Home'
                            }
                        </Link>
                        <span className="allArticlesContent_content_title_item">/</span>
                        <span className="allArticlesContent_content_title_item">
                            {lang === 'ru'
                                ? 'Все новости'
                                : 'All news'
                            }
                        </span>
                    </div>
                    <div className="allArticlesContent_content_cards">
                        {NEWS.map((item) => (
                            <div className="allArticlesContent_content_cards_item" key={item.id}>
                                <div className="allArticlesContent_content_cards_item_image">
                                    <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                </div>
                                <div className="allArticlesContent_content_cards_item_time">{lang === 'ru' ? item.time_ru : item.time_en}</div>
                                <div className="allArticlesContent_content_cards_item_title text">{item.title}</div>
                                <div className="allArticlesContent_content_cards_item_texts">
                                    {item.articles.slice(0, 1).map((item) => (
                                        <p className="allArticlesContent_content_cards_item_texts_item text">{item.article}</p>
                                    ))}
                                </div>
                                <Link
                                    to={`/article/${encodeURIComponent(item.id)}`}
                                    className="allArticlesContent_content_cards_item_btn text"
                                >
                                    {lang === 'ru'
                                        ? 'Подробнее'
                                        : 'More detailed'
                                    }
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AllArticlesContent;