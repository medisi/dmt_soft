import React from "react";
import './ClientCard.css';

const ClientCard = ({ id, image, title }) => {
    return (
        <>
            
            <div className={`clientCard ${title}`} key={id}>
                <img
                    src={require(`../../../assets/images/${image}`)}
                    className="clientCard_image"
                    alt=""
                />
            </div>
        </>
    )
};
export default ClientCard;