import React, { useEffect, useState } from 'react';
import './BaseModules.css';
import { useLocalSettings } from '../../hooks/useLocalSettings';
import { MODULES } from '../../hooks/data';
import ModuleCard from './ModuleCard/ModuleCard';
import ModulesSlider from './ModulesSlider/ModulesSlider';

const BaseModules = () => {
    const { lang } = useLocalSettings();
    const [ activeModule, setActiveModule ] = useState(1);
    const [ activeIndex, setActiveIndex ] = useState(0);
    
    const handleClick = (moduleId) => {
        setActiveModule(moduleId);
    };
    
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
            <div className="baseModules" id="baseModules">
                <div className="container">
                    <div className="baseModules_content">
                        <div className="baseModules_content_titles anim">
                            <span className='title bold'>
                                {lang === 'ru'
                                    ? 'Модульная система DMT Base'
                                    : 'DMT Base Modular System'
                                }
                            </span>
                            <span className='text'>
                                {lang === 'ru'
                                ? 'Подключайте только те модули, которые нужны именно вам'
                                : 'Connect only the modules that you need.'
                            }
                            </span>
                        </div>

                        <div className="baseModules_content_main anim">
                            <div className="baseModules_content_main_line left"></div>
                            <div className="baseModules_content_main_card">
                                <div className="about_modules_content_modules_main_item_image">
                                    <img src={require('../../assets/images/dmt_base.png')} alt="" />
                                </div>
                                <span className="about_modules_content_modules_main_item_text">
                                    {lang === 'ru' 
                                        ? 'Базовая платформа' 
                                        : 'Basic platform'
                                    }
                                </span>
                            </div>
                            <div className="baseModules_content_main_line right"></div>
                        </div>

                        <div className="baseModules_content_modules">
                            {MODULES.map((item, idx) => (
                                <ModuleCard
                                    key={item.id}
                                    title={lang === 'ru' ? item.title_ru : item.title_en}
                                    image={item.image}
                                    isActive={activeIndex === idx}
                                    onClick={() => setActiveIndex(idx)}
                                />
                            ))}
                        </div>
                        <div className="baseModules_content_slides">
                            <ModulesSlider
                                initialIndex={activeIndex}
                                onActiveIndexChange={setActiveIndex}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default BaseModules;