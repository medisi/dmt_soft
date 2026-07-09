import React, { useState } from "react";
import { Collapse } from "@mui/material";
import "./CardNecessary.css"; // можно оставить для иконок, фронтовой части и т.п.
import { useLocalSettings } from "../../../hooks/useLocalSettings";

const CardNecessary = ({ item }) => {
const { lang } = useLocalSettings();
  const [isOpen, setIsOpen] = useState(false);

  const getText = () => (lang === "ru" ? item.title_ru : item.title_en);
  const getDescription = () => (lang === "ru" ? item.description_ru : item.description_en);
  const getPoint = (point) => (lang === "ru" ? point.point_ru : point.point_en);

  const hasPoints = Array.isArray(item.points) && item.points.length > 0;
  const hasDescription = item.description_ru || item.description_en;

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
    <div
      className="necessary_card box_shadow anim"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div className={`necessary_card_front ${isOpen ? 'open' : ''}`}>
        <div className="necessary_card_info">
          <div className="necessary_card_info_icon">
            <img
              src={require(`../../../assets/icons/${item.icon}.png`)}
              alt=""
              loading="lazy"
              width="40"
              height="40"
            />
          </div>
          <div className="necessary_card_info_text text">
            {getText()}
          </div>
        </div>

        <div className="necessary_card_chevron">
          <img
            src={require('../../../assets/icons/chevron2.png')}
            alt=""
            loading="lazy"
            width="24"
            height="24"
            style={{
              transition: "transform 0.3s ease",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </div>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="necessary_card_back">
          {hasPoints ? (
            <ol className="risks-list">
              {item.points.map((point) => (
                <li key={point.id} className="text">
                  {getPoint(point)}
                </li>
              ))}
            </ol>
          ) : hasDescription ? (
            <p className="text description-text">{getDescription()}</p>
          ) : (
            <p className="text" style={{ color: "#999" }}>
              Нет данных для отображения
            </p>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CardNecessary;
