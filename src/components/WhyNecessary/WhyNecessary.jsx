import React from "react";
import './WhyNecessary.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { NECESSARY } from "../../hooks/data";
import CardNecessary from "./CardNecessary/CardNecessary";

const WhyNecessary = () => {
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
        <div className="whyNecessary">
            <div className="container">
                <div className="whyNecessary_content">
                    <div className="whyNecessary_content_title title bold anim">
                        {lang === 'ru'
                            ? 'Зачем это нужно?'
                            : 'Why is this necessary?'
                        }
                    </div>
                    <div className="whyNecessary_content_description text anim">
                        {lang === 'ru'
                            ? 'Использование DMT Base позволяет создать единое централизованное хранилище данных, обеспечив быстрый доступ к актуальной информации для всех участников процесса проектирования. Централизованная информационная среда позволяет исключить дублирование и противоречивость данных за счет хранения информации в структурированном виде и постоянного контроля версий. '
                            : 'Using DMT Base allows you to create a single centralized data warehouse, providing quick access to up-to-date information for all participants in the design process. A centralized information environment allows you to eliminate duplication and inconsistency of data by storing information in a structured form and constant version control.'
                        }
                    </div>
                    <div className="whyNecessary_content_cards">
                        {NECESSARY.map((item) => (
                            <CardNecessary
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default WhyNecessary;