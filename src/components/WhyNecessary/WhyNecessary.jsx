import React from "react";
import './WhyNecessary.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { NECESSARY } from "../../hooks/data";
import CardNecessary from "./CardNecessary/CardNecessary";

const WhyNecessary = () => {
    const { lang } = useLocalSettings();

    return (
        <div className="whyNecessary">
            <div className="container">
                <div className="whyNecessary_content">
                    <div className="whyNecessary_content_title title bold anim">
                        {lang === 'ru'
                            ? 'Зачем это нужно?'
                            : 'Why is this necessary?'
                        }
                    </div>
                    <div className="whyNecessary_content_description text anim">
                        {lang === 'ru'
                            ? 'Использование DMT Base позволяет создать единую цифровую среду для централизованного хранения, управления и совместной работы с данными проекта. Все участники процесса работают в единой среде получая быстрый доступ к актуальной информации, а использование единого источника данных исключает дублирование, потерю и противоречивость информации. Структурированное древовидное хранение данных, автоматический контроль истории изменений  и версий документов обеспечивают прозрачность процессов и упрощают взаимодействие между отделами и повышают эффективность работы.'
                            : 'Using DMT Base allows you to create a single digital environment for centralized storage, management and collaboration with project data. All participants in the process work in a single environment, gaining quick access to up-to-date information, and using a single data source eliminates duplication, loss, and inconsistency of information. Structured tree-based data storage, automatic monitoring of the history of changes and versions of documents ensure transparency of processes and simplify interaction between departments and increase work efficiency.'
                        }
                    </div>
                    <div className="whyNecessary_content_cards">
                        {NECESSARY.map((item) => (
                            <CardNecessary
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default WhyNecessary;