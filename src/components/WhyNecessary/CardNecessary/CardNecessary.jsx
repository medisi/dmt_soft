import React, { useState } from "react";
import { Collapse } from "@mui/material";
import "./CardNecessary.css";
import { useLocalSettings } from "../../../hooks/useLocalSettings";

const CardNecessary = ({ item }) => {
  const { lang } = useLocalSettings();
  const [isOpen, setIsOpen] = useState(false);
  // Отдельный стейт для раскрытия каждого пункта: id -> boolean
  const [expandedItems, setExpandedItems] = useState({});

  const getText = () => (lang === "ru" ? item.title_ru : item.title_en);
  const getDescription = () => (lang === "ru" ? item.description_ru : item.description_en);
  const getMore = (mor) => (lang === "ru" ? mor.title_ru : mor.title_en);
  const getPoint = (point) => (lang === "ru" ? point.point_ru : point.point_en);

  const hasPoints = Array.isArray(item.more) && item.more.length > 0;
  const hasDescription = item.description_ru || item.description_en;

  // Переключатель для конкретного id
  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      <div className={`necessary_card_front ${isOpen ? "open" : ""}`}>
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
            src={require("../../../assets/icons/chevron2.png")}
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
              {item.more.map((m) => {
                const isExpanded = expandedItems[m.id] ?? false;
                const hasSubpoints = Array.isArray(m.points) && m.points.length > 0;

                return (
                  <li key={m.id} className="risks-list-item">
                    <div
                      className="risks-list-title"
                      onClick={(e) => {
                        e.stopPropagation(); // важно: не закрывать всю карточку
                        if (hasSubpoints) {
                          toggleItem(m.id);
                        }
                      }}
                      role={hasSubpoints ? "button" : undefined}
                      aria-expanded={hasSubpoints ? isExpanded : undefined}
                      tabIndex={hasSubpoints ? 0 : -1}
                      style={{
                        cursor: hasSubpoints ? "pointer" : "default",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{getMore(m)}</span>
                      {hasSubpoints && (
                        // <span style={{ fontSize: 14, marginLeft: 8 }}>
                        //   {isExpanded ? "−" : "+"}
                        // </span>
                        <div className="necessary_card_chevron more">
                          <img
                            src={require("../../../assets/icons/chevron2.png")}
                            alt=""
                            loading="lazy"
                            width="24"
                            height="24"
                            style={{
                              transition: "transform 0.3s ease",
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {hasSubpoints && (
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <div className="risks-list-points">
                          {m.points.map((point) => (
                            <p
                              key={point.id}
                              className="text risks-list-text"
                              style={{ margin: "6px 0" }}
                            >
                              - {getPoint(point)}
                            </p>
                          ))}
                        </div>
                      </Collapse>
                    )}
                  </li>
                );
              })}
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