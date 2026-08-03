import React from "react";
import './CardProgram.css';

const CardProgram = ({ image, title, description}) => {
    return (
        <>
            <div className="cardProgram">
                <div className="cardProgram_image">
                    <img src={require(`../../../assets/images/${image}.png`)} alt="" />
                </div>
                <div className="cardProgram_info">
                    {title && (
                        <div className="cardProgram_info_item cardProgram_info_title bold">{title}</div>
                    )}
                    <div className={`cardProgram_info_item cardProgram_info_text text ${title ? '' : 'notitle'}`}>{description}</div>
                </div>
            </div>
        </>
    );
};

export default CardProgram;