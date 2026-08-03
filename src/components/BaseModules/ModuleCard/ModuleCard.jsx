import React from "react";
import './ModuleCard.css';

const ModuleCard = ({ image, title, isActive, onClick }) => {
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