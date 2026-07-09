import React from "react";
import './ModuleCard.css';

const ModuleCard = ({ image, title, isActive, onClick }) => {
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
            <div 
                className={`moduleCard_content box_shadow ${isActive ? 'active' : ''} ${image}`}
                onClick={onClick}
            >
                <div className="moduleCard_content_item anim image">
                    <img src={require(`../../../assets/images/${image}.png`)} alt="" />
                </div>
                <div className="moduleCard_content_item anim name text">{title}</div>
            </div>
        </>
    )
};
export default ModuleCard;