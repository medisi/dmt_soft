import React, { useEffect, useRef, useState } from 'react';
import './ModulesSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MODULES } from '../../../hooks/data';
import { useLocalSettings } from '../../../hooks/useLocalSettings';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ModulesSlider = ({ initialIndex = 0, onActiveIndexChange }) => {
    const { lang, theme } = useLocalSettings();
    const swiperRef = useRef(null);

    useEffect(() => {
        // Синхронизируем слайдер с внешним индексом (если он изменился снаружи)
        if (swiperRef.current) {
            swiperRef.current.slideTo(initialIndex, 300, false);
        }
    }, [initialIndex]);


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
            <div className={`baseModules_prev ${initialIndex === 0 ? 'disabled' : ''}`}>
                <img src={require('../../../assets/icons/chevron.png')} alt="" />
            </div>

            <Swiper
                ref={(el) => (swiperRef.current = el)}
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1} // количество видимых слайдов
                spaceBetween={30}
                // loop // зацикленность
                speed={300}
                initialSlide={initialIndex}
                navigation={{
                    prevEl: '.baseModules_prev',
                    nextEl: '.baseModules_next',
                }}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 7500,
                    disableOnInteraction: false,
                }}
                style={{ width: '100%' }}
                onSwiper={(swiper) => {
                    // Сохраняем в ref сразу, как только слайдер готов
                    swiperRef.current = swiper;
                    // Если initialIndex пришёл до рендера — переключаем сразу
                    if (typeof initialIndex === 'number') {
                        swiper.slideTo(initialIndex, 300, false);
                    }
                }}
                onSlideChange={(swiper) => {
                    if (onActiveIndexChange) {
                        onActiveIndexChange(swiper.realIndex);
                    }
                }}
            >
                {MODULES.map((module) => (
                    <SwiperSlide key={module.id}>
                        <div className="moduleSlide">
                            <div className="moduleSlide_image anim">
                                <img
                                    src={require(`../../../assets/images/${theme === 'dark' ? module.image_dark : module.image_light}.png`)}
                                    alt={lang === 'ru' ? module.title_ru : module.title_en}
                                />
                            </div>

                            <div className="moduleSlide_info anim">
                                <h2 className='bold'>
                                    {lang === 'ru'
                                        ? module.title_ru
                                        : module.title_en
                                    }
                                </h2>
                                <p className='text'>
                                    {lang === 'ru'
                                        ? module.about_ru
                                        : module.about_en
                                    }
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={`baseModules_next ${initialIndex === 4 ? 'disabled' : ''}`}>
                <img src={require('../../../assets/icons/chevron.png')} alt="" />
            </div>
        </>
    )
};
export default ModulesSlider;