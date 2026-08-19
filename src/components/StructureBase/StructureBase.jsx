import React from "react";
import './StructureBase.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { PROGRAMMS, TASKS_SERVER } from "../../hooks/data";
import CardProgram from "./CardProgram/CardProgram";

const StructureBase = () => {
    const { lang } = useLocalSettings();

    // const cards = document.querySelectorAll('.anim');
    // const checkCards = () => {
    //     const trigger = (window.innerHeight / 5) * 4.5;
    //     for (const card of cards) {
    //         const topOfCard = card.getBoundingClientRect().top;
    //         if (topOfCard < trigger) {
    //             card.classList.add('show');
    //         }
    //     }
    // };
    // checkCards();
    // window.addEventListener('scroll', checkCards);

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
                                    <div className="structure_content_roles_item_text user">
                                        <span className="bold">
                                            {lang === 'ru'
                                                ? 'Пользователь DMT Base'
                                                : 'User DMT Base'
                                            }
                                        </span>
                                    </div>
                                    <div className="structure_content_roles_item_text_info text">
                                        {lang === 'ru'
                                            ? 'Сотрудник организации'
                                            : 'An employee of the organization'
                                        }
                                    </div>
                                </div>

                                <div className="structure_content_roles_arrows">
                                    <div className="structure_content_roles_arrows_item one top">
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                    <div className="structure_content_roles_arrows_item one bottom">
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                </div>

                                <div className="structure_content_roles_item two anim">
                                    <div className="structure_content_roles_item_image">
                                        <img src={require('../../assets/images/web.png')} alt="" />
                                    </div>
                                    <div className="structure_content_roles_item_text">
                                        <span className="bold">
                                            {lang === 'ru'
                                                ? 'Декстопное приложение и веб-интерфейс'
                                                : 'Desktop application and web interface'
                                            }
                                        </span>
                                    </div>
                                    <div className="structure_content_roles_item_text_info text">
                                        {lang === 'ru'
                                            ? 'Простой и понятный рабочий инструмент пользователя'
                                            : "A simple and intuitive user's work tool"
                                        }
                                    </div>
                                </div>

                                <div className="structure_content_roles_arrows">
                                    <div className="structure_content_roles_arrows_item two top">
                                        <div className="structure_content_roles_arrows_item_arrow"></div>
                                    </div>
                                    <div className="structure_content_roles_arrows_item two bottom">
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
                                    <div className="structure_content_roles_item_text_info text">
                                        {lang === 'ru'
                                            ? 'Уверенность в том, что все данные данные проекта находятся на сервере вашей организации, всегда доступны и актуальны'
                                            : "Make sure that all the project data is on your organization's server, always available and up-to-date."
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="structure_content_roles_roles anim">
                                {/* <div className="structure_content_roles_roles_title title bold">
                                    {lang === 'ru'
                                        ? 'Роли:'
                                        : 'Roles:'
                                    }
                                </div> */}
                                <div className="structure_content_roles_roles_items">
                                    {/* <div className="structure_content_roles_roles_item user">
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
                                    </div> */}
                                    {/* <div className="structure_content_roles_roles_item mob">
                                        <div className="structure_content_roles_roles_item_text text">
                                            {lang === 'ru'
                                                ? 'Сотрудник организации'
                                                : 'An employee of the organization'
                                            }
                                        </div>
                                    </div>
                                    <div></div>
                                    <div className="structure_content_roles_roles_item mob">
                                        <div className="structure_content_roles_roles_item_text text">
                                            {lang === 'ru'
                                                ? 'Простой и понятный рабочий инструмент пользователя'
                                                : "A simple and intuitive user's work tool"
                                            }
                                        </div>
                                    </div>
                                    <div></div>
                                    <div className="structure_content_roles_roles_item">
                                        <div className="structure_content_roles_roles_item_text text">
                                            {lang === 'ru'
                                                ? 'Хранилище, механизм управления и передачи данных'
                                                : 'Storage, data managment and data transmission'
                                            } 
                                            {lang === 'ru'
                                                ? 'Уверенность в том, что все данные данные проекта находятся на сервере вашей организации, всегда доступны и актуальны'
                                                : "Make sure that all the project data is on your organization's server, always available and up-to-date."
                                            }
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="structure_row_for_two_round"></div>

                        {/* <div className="structure_content_tasks anim">
                            <div className="structure_content_roles_item">
                                <div className="structure_content_tasks_item_image user">
                                    <img src={require('../../assets/images/user.png')} alt="" />
                                </div>
                                <div className="structure_content_tasks_item_text">
                                    <span className="bold">
                                        {lang === 'ru'
                                            ? 'Пользователь'
                                            : 'User'
                                        }
                                    </span>
                                    <span className="bold">DMT Base</span>
                                </div>
                            </div>

                            <div className="structure_content_tasks_arrows">
                                <div className="structure_content_tasks_arrows_text text one">
                                    {lang === 'ru'
                                        ? 'работа пользователей'
                                        : 'user experience'
                                    }
                                </div>
                                <div className="structure_content_tasks_arrows_arrows">
                                    <div className="structure_content_tasks_arrows_arrows_item one"></div>
                                    <div className="structure_content_tasks_arrows_arrows_item two"></div>
                                </div>
                                <div className="structure_content_tasks_arrows_text text two">
                                    {lang === 'ru'
                                        ? 'в привычных программах'
                                        : 'in the usual programs'
                                    }
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
                                <div className="structure_content_tasks_arrows_text text one">
                                    {lang === 'ru'
                                        ? 'управление и передача данных'
                                        : 'data management and transmission'
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
                                        <div className="structure_content_tasks_item_tasks_item text" key={item.id}>
                                            {lang === 'ru' ? item.name_ru : item.name_en}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
};
export default StructureBase;