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

    const [ isMobile, setIsMobile ] = useState(false);
    const [ isVisibleContent, setIsVisibleContent ] = useState(false);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(initialIndex, 300, false);
        }
    }, [initialIndex]);

    useEffect(() => {
        if (window.innerWidth <= 767) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    const handleClickContent = () => {
        setIsVisibleContent((prev) => !prev);
    };
    

    
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
                autoplay={{
                    delay: 35000,
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
                        <div className="moduleSlide" id="sliderCustom">
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
                                <p
                                    className={`moduleSlide_info_text text 
                                        ${isMobile ? 'mobile' : ''}
                                        ${isVisibleContent ? 'visible' : ''}
                                    `}
                                >
                                    {lang === 'ru'
                                        ? module.about_ru
                                        : module.about_en
                                    }
                                </p>
                                {isMobile && (
                                    <span
                                        className='moduleSlide_reveal_btn'
                                        onClick={handleClickContent}
                                    >
                                        {isVisibleContent ? (
                                            lang === 'ru' ? 'скрыть' : 'hide'
                                        ) : (
                                            lang === 'ru' ? 'раскрыть' : 'expand'
                                        )}
                                    </span>
                                )}
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