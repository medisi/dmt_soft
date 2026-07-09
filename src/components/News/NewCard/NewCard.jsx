import React from "react";
import './NewCard.css';
import { useLocalSettings } from "../../../hooks/useLocalSettings";
import { Link } from "react-router-dom";

const NewCard = ({ image, time, title, articles }) => {
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
        <div className="news_content_cards_item box_shadow anim">
            <div className="news_content_cards_item_image">
                <img src={require(`../../../assets/images/${image}`)} alt="" />
            </div>
            <div className="news_content_cards_item_time">{time}</div>
            <div className="news_content_cards_item_title bold">{title}</div>
            <div className="news_content_cards_item_texts">
                {articles.map((item) => (
                    <p className="news_content_cards_item_texts_item text">
                        {lang === 'ru' ? item.article_ru : item.article_en}
                    </p>
                ))}
            </div>
            <Link
                to="/new_content"
                className="news_content_cards_item_btn text"
            >
                Подробнее
            </Link>
            {/* <a href="##" className="news_content_cards_item_btn text">
                Подробнее
            </a> */}
        </div>
    )
};
export default NewCard;