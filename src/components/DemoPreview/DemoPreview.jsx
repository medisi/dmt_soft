import React from "react";
import './DemoPreview.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const DemoPreview = () => {
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
        <>
            <div className="preview" id="preview">
                <div className="container">
                    <div className="preview_content">
                        <div className="preview_content_info">
                            <div className="preview_content_info_title bold anim">
                                {lang === 'ru'
                                    ? 'Посмотрите, как DMT Base может изменить ваши проекты'
                                    : 'See how DMT Base can change your projects.'
                                }
                            </div>
                            <div className="preview_content_info_text text anim">
                                {lang === 'ru'
                                    ? 'Демо за 2 минуты'
                                    : 'Demo in 2 minutes'
                                }
                            </div>
                            <button className="preview_content_info_btn anim">
                                <img src={require('../../assets/icons/play.png')} id="preview_content_info_btn_img1" alt="" />
                                <img src={require('../../assets/icons/playAct.png')} id="preview_content_info_btn_img2" alt="" />
                                <span className="text">
                                    {lang === 'ru'
                                        ? 'Смотреть демо'
                                        : 'Watch the demo'
                                    }
                                </span>
                            </button>
                        </div>

                        <div className="preview_content_video">
                            <div className="preview_content_video_content anim">
                                <img className="preview_content_video_content_bg" src={require('../../assets/images/bg_video.png')} alt="v" />
                                <button>
                                    <img className="preview_content_video_content_btn_img" src={require('../../assets/icons/play2.png')} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default DemoPreview;