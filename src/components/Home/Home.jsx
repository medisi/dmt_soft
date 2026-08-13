import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import { ScrollLink } from '../../hooks/ScrollLink';

const Home = () => {
    const { lang, theme } = useLocalSettings();



     return (
        <>
            <div className="home">
                <div className="container">
                    <div className="home_content">
                        <div className="home_content_item info">
                            <div className={`home_content_item_info home_content_item_info_title bold`}>
                                DMT Base
                            </div>
                            <div className={`home_content_item_info home_content_item_info_title bold`}>
                                {lang === 'ru'
                                    ? 'Единая цифровая среда для вашей проектной организации'
                                    : 'A unified digital environment for your project organization'
                                }
                            </div>
                            <div className={`home_content_item_info home_content_item_info_subtitle`}>
                                {lang === 'ru'
                                    ? 'Для создания, централизованного хранения, управления и совместной работы с документами и данными проектов.'
                                    : 'To create, centrally store, manage, and collaborate with project documents and data.'
                                }
                            </div>
                            <div className="home_content_item_info home_content_item_info_text text">
                                {lang === 'ru'
                                    ? 'DMT Base — программный продукт, объединяющий в себе единую базу проектных данных, размещенную на корпоративном сервере организации, и клиентское приложение с простым и понятным интерфейсом.'
                                    : "DMT Base is a software product that combines a single project database hosted on an organization's corporate server and a client application with a simple and intuitive interface."
                                }
                            </div>
                            <div className="home_content_item_info_btns">
                                <div className="home_content_item_info_btns_item demo">
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
                                <ScrollLink
                                    to="#preview"
                                    className="home_content_item_info_btns_item tutorial box_shadow"
                                >
                                    <span>
                                        {lang === 'ru'
                                            ? 'Смотреть демо'
                                            : 'Watch the demo'
                                        }
                                    </span>
                                </ScrollLink>
                            </div>
                        </div>

                        <div className="home_content_item image">
                            {/* <img src={require('../../assets/images/main.png')} alt="" /> main_dark*/}
                            <img src={require(`../../assets/images/main_${theme}.png`)} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;