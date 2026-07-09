import React from "react";
import './News.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { NEWS } from "../../hooks/data";
import NewCard from "./NewCard/NewCard";

const News = () => {
    const { lang } = useLocalSettings();

    const cards = document.querySelectorAll('.anim');
    const checkCards = () => {
        const trigger = (window.innerHeight / 5) * 4.5;
        for (const card of cards) {
            const topOfCard = card.getBoundingClientRect().top;
            if (topOfCard < trigger) {
                card.classList.add('show');
            }
        }
    };
    checkCards();
    window.addEventListener('scroll', checkCards);

    return (
        <>
            <div className="news">
                <div className="container">
                    <div className="news_content">
                        <div className="news_content_title title bold anim">
                            {lang === 'ru'
                                ? 'Последние новости'
                                : 'Latest news'
                            }
                        </div>

                        <div className="news_content_cards">
                            {NEWS.map((item) => (
                                <NewCard
                                    key={item.id}
                                    image={item.image}
                                    time={lang === 'ru' ? item.time_ru : item.time_en }
                                    title={lang === 'ru' ? item.title_ru : item.title_en }
                                    articles={item.articles}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default News;