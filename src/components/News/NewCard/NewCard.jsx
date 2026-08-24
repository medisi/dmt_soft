import React, { useEffect, useState } from "react";
import './NewCard.css';
import { useLocalSettings } from "../../../hooks/useLocalSettings";
import { Link } from "react-router-dom";

const NewCard = ({ id, image, time, title, articles }) => {
    const { lang } = useLocalSettings();
    const [ isMobile, setIsMobile ] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 1050) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    return (
        <>
            {!isMobile ? (
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
            )}
        </>
    )
};
export default NewCard;