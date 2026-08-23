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
    
    const handleClick = () => {
        const el = document.getElementById("sliderCustom");
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Полная видимость: верхняя граница >= 0 и нижняя граница <= высоты окна
        const isFullyVisible = rect.top >= 0 && rect.bottom <= windowHeight;
        
        // Частичная видимость: пересекается с окном (top < windowHeight && bottom > 0)
        const isPartiallyVisible = rect.top < windowHeight && rect.bottom > 0;

        if (isFullyVisible) {
            // Ничего не делаем
            return;
        }

        if (isPartiallyVisible) {
            // Слегка прокручиваем вниз, чтобы выровнять по нижней грани экрана
            el.scrollIntoView({ behavior: "smooth", block: "end" });
        } else {
            // Совсем не видно — прокручиваем, чтобы элемент появился (можно тоже block: "end")
            el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    return (
        <>
            <div className="baseModules" id="baseModules">
                <div className="container">
                    <div className="baseModules_content">
                        <div className="baseModules_content_titles anim">
                            {/* <div className='baseModules_content_titles_comment'>
                                <div className="baseModules_content_titles_comment_line one">
                                    <span></span>
                                </div>
                                <div className='baseModules_content_titles_comment_text'>
                                    {lang === 'ru'
                                        ? 'технологии. опыт. надежность'
                                        : 'technologies. experience. reliability'
                                    }
                                </div>
                                <div className="baseModules_content_titles_comment_line two">
                                    <span></span>
                                </div>
                            </div> */}
                            {/* <span className='title bold'>
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
                            </span> */}
                        </div>

                        <div className="baseModules_content_main anim">
                            <div className="baseModules_content_main_line left"></div>
                            <div className="baseModules_content_main_card">
                                <div className="about_modules_content_modules_main_item_image">
                                    <img src={require('../../assets/images/dmt_base.png')} alt="" />
                                </div>
                                <span className="about_modules_content_modules_main_item_text bold">
                                    {lang === 'ru' 
                                        ? 'Базовая платформа с широким функционалом' 
                                        : 'Basic platform with extensive functionality'
                                    }
                                </span>
                            </div>
                            <div className="baseModules_content_main_line right"></div>
                        </div>
                        <span className='baseModules_content_main_description text'>
                            {lang === 'ru'
                            ? 'Дополнительные модули для расширения возможностей системы'
                            : "Additional modules to expand the system's capabilities"
                        }
                        </span>

                        <div className="baseModules_content_modules">
                            {MODULES.map((item, idx) => (
                                <ModuleCard
                                    key={item.id}
                                    title={lang === 'ru' ? item.title_ru : item.title_en}
                                    image={item.image}
                                    isActive={activeIndex === idx}
                                    onClick={() => {
                                        setActiveIndex(idx);
                                        handleClick();
                                    }}
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