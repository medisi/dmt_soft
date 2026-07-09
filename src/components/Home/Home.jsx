import React from 'react';
import './Home.css';
import { useLocalSettings } from '../../hooks/useLocalSettings';

const Home = () => {
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
            <div className="home">
                <div className="container">
                    <div className="home_content">
                        <div className="home_content_item info">
                            <div className="home_content_item_info home_content_item_info_title bold anim">
                                {lang === 'ru'
                                    ? 'Единая цифровая среда'
                                    : 'Unified digital environment'
                                }
                            </div>
                            <div className="home_content_item_info home_content_item_info_subtitle anim">
                                {lang === 'ru'
                                    ? 'для создания, хранения, обновления и работы с документами и данными проектов'
                                    : 'to create, store, update, and work with project documents and data.'
                                }
                            </div>
                            <div className="home_content_item_info home_content_item_info_text text anim">
                                {lang === 'ru'
                                    ? 'DMT Base - программный продукт, объединяющий в себе базу данных с проектами на вашем корпоративном сервере, систему управления базой данных на базе PostgreSQL и клиентское приложение с простым и понятным интерфейсом'
                                    : 'DMT Base is a software product that combines a database with projects on your corporate server, a PostgreSQL database management system, and a client application with a simple and intuitive interface.'
                                }
                            </div>
                            <div className="home_content_item_info_btns">
                                <div className="home_content_item_info_btns_item demo anim">
                                    <span>
                                        {lang === 'ru'
                                            ? 'Попробовать бесплатно'
                                            : 'Try it for free'
                                        }
                                    </span>
                                    <div className="home_content_item_info_btns_item_round">
                                        <img src={require('../../assets/icons/arrow.png')} alt="" />
                                    </div>
                                </div>
                                <div className="home_content_item_info_btns_item tutorial box_shadow anim">
                                    <span>
                                        {lang === 'ru'
                                            ? 'Смотреть демо'
                                            : 'Watch the demo'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="home_content_item image anim">
                            <img src={require('../../assets/images/main.png')} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;