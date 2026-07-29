import React from "react";
import './NewCard.css';
import { useLocalSettings } from "../../../hooks/useLocalSettings";
import { Link } from "react-router-dom";

const NewCard = ({ id, image, time, title, articles }) => {
    const { lang } = useLocalSettings();

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
                state={id}
            >
                Подробнее
            </Link>
        </div>
    )
};
export default NewCard;