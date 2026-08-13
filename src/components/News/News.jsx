import React from "react";
import './News.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { NEWS } from "../../hooks/data";
import NewCard from "./NewCard/NewCard";
import { Link } from "react-router-dom";

const News = () => {
    const { lang } = useLocalSettings();

    return (
        <>
            <div className="news" id="news">
                <div className="container">
                    <div className="news_content">
                        <div className="news_content_title title bold anim">
                            {lang === 'ru'
                                ? 'Последние новости'
                                : 'Latest news'
                            }

                        </div>

                        <div className="news_content_cards">
                            {NEWS.slice(0, 3).map((item) => (
                                <NewCard
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    time={lang === 'ru' ? item.time_ru : item.time_en}
                                    title={item.title}
                                    articles={item.articles}
                                />
                            ))}
                        </div>
                        {NEWS.length > 3 && (
                            <div className="news_content_btn">
                                <Link to="/articles" className="news_content_btn_link bold text">
                                    {lang === 'ru'
                                        ? 'Все новости'
                                        : 'All news'
                                    }
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};
export default News;