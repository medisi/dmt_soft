import React from "react";
import './TrustCard.css';

const TrustCard = ({ count, title }) => {
    return (
        <>
            <div className="trustCard">
                <div className="trustCard_num">{count}</div>
                <div className="trustCard_text text">{title}</div>
            </div>
        </>
    )
};
export default TrustCard;