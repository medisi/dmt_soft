import React from "react";
import './WhyDMTBase.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { WHIESDMTBASE } from "../../hooks/data";

const WhyDMTBase = () => {
    const { lang } = useLocalSettings();

    return (
        <>
            <div className="whyDMTBase">
                <div className="container">
                    <div className="whyDMTBase_content">
                        <div className="whyDMTBase_content_title bold">
                            {lang === 'ru'
                                ? 'Почему DMT Base?'
                                : 'Why DMT Base?'
                            }
                        </div>
                        <div className="whyDMTBase_content_cards">
                            {WHIESDMTBASE.map((item) => (
                                <div className={`whyDMTBase_content_cards_item whyDMTBase_content_cards_item_${item.id}`} key={item.id}>
                                    <div className="whyDMTBase_content_cards_item_image">
                                        <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                    </div>
                                    <div className="whyDMTBase_content_cards_item_text text">{lang === 'ru' ? item.text_ru : item.text_en}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default WhyDMTBase;