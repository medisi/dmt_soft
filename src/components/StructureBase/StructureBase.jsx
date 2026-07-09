import React from "react";
import './StructureBase.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { PROGRAMMS, TASKS_SERVER } from "../../hooks/data";
import CardProgram from "./CardProgram/CardProgram";

const StructureBase = () => {
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
            <div className="structure">
                <div className="container">
                    <div className="structure_content">
                        <div className="structure_content_title title bold anim">
                            {lang === 'ru'
                                ? 'DMT Base - единая информационная среда для всей организации'
                                : 'DMT Base is a single information environment for the entire organization'
                            }
                        </div>

                        <div className="structure_content_roles anim">
                            <div className="structure_content_roles_cards">
                                <div className="structure_content_roles_item one anim">
                                    <div className="structure_content_roles_item_image">
                                        <img src={require('../../assets/images/user.png')} alt="" />
                                    </div>
                                    <div className="structure_content_roles_item_text">
                                        <span className="bold">
                                            {lang === 'ru'
                                                ? 'Пользователь'
                                                : 'User'
                                            }
                                        </span>
                                        <span className="bold">DMT Base</span>
                                    </div>
                                </div>

                                <div className="structure_content_roles_arrows">
                                    <div className="structure_content_roles_arrows_item one top">
                                        <div className="structure_content_roles_arrows_item_text text">
                                            <span className="round text">1</span>
                                            <span className="request text">
                                                {lang === 'ru'
                                                    ? 'отправка запросов и выбор действий'
                                                    : 'sending requests and selecting actions'
                                                }
                                            </span>
                                        </div>
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                    <div className="structure_content_roles_arrows_item one bottom">
                                        <div className="structure_content_roles_arrows_item_text">
                                            <span className="round text">4</span>
                                            <span className="request text">
                                                {lang === 'ru'
                                                    ? 'показ результата запроса пользователю'
                                                    : 'showing the query result to the user'
                                                }
                                            </span>
                                            
                                        </div>
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                </div>

                                <div className="structure_content_roles_item two anim">
                                    <div className="structure_content_roles_item_image">
                                        <img src={require('../../assets/images/client.png')} alt="" />
                                    </div>
                                    <div className="structure_content_roles_item_text">
                                        <span className="bold">
                                            {lang === 'ru'
                                                ? 'Клиент'
                                                : 'Client'
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="structure_content_roles_arrows">
                                    <div className="structure_content_roles_arrows_item two top">
                                        <div className="structure_content_roles_arrows_item_text">
                                            <span className="round text">2</span>
                                            {lang === 'ru'
                                                ? <span className="request text">отправляет <span style={{whiteSpace: 'nowrap'}}>SQL-запрос</span></span>
                                                : <span className="request text">sends an <span style={{whiteSpace: 'nowrap'}}>SQL query</span></span>
                                            }
                                        </div>
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                    <div className="structure_content_roles_arrows_item two bottom">
                                        <div className="structure_content_roles_arrows_item_text">
                                            <span className="round text">3</span>
                                            {lang === 'ru'
                                                ? <span className="request text">передаёт результат <span style={{whiteSpace: 'nowrap'}}>SQL-запроса</span></span>
                                                : <span className="request text">transmits the result of an <span style={{whiteSpace: 'nowrap'}}>SQL query</span></span>
                                            }
                                        </div>
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                </div>
                                
                                <div className="structure_content_roles_item three anim">
                                    <div className="structure_content_roles_item_image">
                                        <img src={require('../../assets/images/server.png')} alt="" />
                                    </div>
                                    <div className="structure_content_roles_item_text">
                                        <span className="bold">
                                            {lang === 'ru'
                                                ? 'Сервер'
                                                : 'Server'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="structure_content_roles_roles anim">
                                <div className="structure_content_roles_roles_title title bold">
                                    {lang === 'ru'
                                        ? 'Роли:'
                                        : 'Roles:'
                                    }
                                </div>
                                <div className="structure_content_roles_roles_items">
                                    <div className="structure_content_roles_roles_item user">
                                        <div className="structure_content_roles_roles_item_image box_shadow">
                                            <img src={require('../../assets/icons/role_user.png')} alt="" />
                                        </div>
                                        <div className="structure_content_roles_roles_item_text text">
                                            {lang === 'ru'
                                                ? 'работа в системе и получение результатов обработки запросов'
                                                : 'working in the system and getting query processing results'
                                            }
                                        </div>
                                    </div>
                                    <div className="structure_content_roles_roles_item message">
                                        <div className="structure_content_roles_roles_item_image box_shadow">
                                            <img src={require('../../assets/icons/role_message.png')} alt="" />
                                        </div>
                                        <div className="structure_content_roles_roles_item_text text">
                                            {lang === 'ru'
                                                ? 'интерфейс для отправки запросов и просмотра результатов'
                                                : 'interface for sending requests and viewing results'
                                            }
                                        </div>
                                    </div>
                                    <div className="structure_content_roles_roles_item server">
                                        <div className="structure_content_roles_roles_item_image box_shadow">
                                            <img src={require('../../assets/icons/role_server.png')} alt="" />
                                        </div>
                                        <div className="structure_content_roles_roles_item_text text">
                                            {lang === 'ru'
                                                ? 'обработка запросов, управление доступом, оптимизация данных, выполнение операций с данными'
                                                : 'query processing, access control, data optimization, performing operations with data'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="structure_row_for_two_round"></div>

                        <div className="structure_content_tasks anim">
                            <div className="structure_content_roles_item">
                                <div className="structure_content_tasks_item_image user">
                                    <img src={require('../../assets/images/user.png')} alt="" />
                                </div>
                                <div className="structure_content_tasks_item_text">
                                    <span className="bold">
                                        {lang === 'ru'
                                            ? 'Пользователь'
                                            : 'DMT Base'
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="structure_content_tasks_arrows">
                                <div className="structure_content_tasks_arrows_text text">
                                    {lang === 'ru'
                                        ? 'работа пользователей с прикладными программами'
                                        : 'user experience with application programs'
                                    }
                                </div>
                                <div className="structure_content_tasks_arrows_arrows">
                                    <div className="structure_content_tasks_arrows_arrows_item one"></div>
                                    <div className="structure_content_tasks_arrows_arrows_item two"></div>
                                </div>
                            </div>

                            <div className="structure_content_tasks_item_programs">
                                {PROGRAMMS.map((item) => (
                                    <CardProgram
                                        key={item.id}
                                        image={item.image}
                                        title={item.title}
                                        description={lang === 'ru' ? item.description_ru : item.description_en}
                                    />
                                ))}
                            </div>
                            
                            <div className="structure_content_tasks_arrows">
                                <div className="structure_content_tasks_arrows_text text">
                                    {lang === 'ru'
                                        ? 'хранение, обработка, и контроль документов и информации'
                                        : 'storage, processing, and control of documents and information'
                                    }
                                </div>
                                <div className="structure_content_tasks_arrows_arrows">
                                    <div className="structure_content_tasks_arrows_arrows_item one"></div>
                                    <div className="structure_content_tasks_arrows_arrows_item two"></div>
                                </div>
                            </div>

                            <div className="structure_content_tasks_item">
                                <div className="structure_content_tasks_item_image server">
                                    <img src={require('../../assets/images/server.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Сервер'
                                            : 'Server'
                                        }
                                    </span>
                                </div>
                                <div className="structure_content_tasks_item_tasks">
                                    {TASKS_SERVER.map((item) => (
                                        <div className="structure_content_tasks_item_tasks_item" key={item.id}>
                                            {lang === 'ru' ? item.name_ru : item.name_en}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default StructureBase;