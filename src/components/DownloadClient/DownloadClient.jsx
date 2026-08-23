import React from "react";
import './DownloadClient.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const DownloadClient = () => {
    const { lang, theme } = useLocalSettings();

    return (
        <div className="downloadClient" id="downloadClient">
            <div className="container">
                <div className="downloadClient_content">
                    <div className="downloadClient_content_item system_specifications">
                        <div className="downloadClient_content_title bold">
                            {lang === 'ru'
                                ? 'Системные требования'
                                : 'System requirements'
                            }
                        </div>
                        <div className="specifications_block">
                            <div className="specifications_item">
                                <div className="specifications_item_text">
                                    {lang === 'ru'
                                        ? 'Архитектура процессора'
                                        : 'Processor Architecture'
                                    }
                                </div>
                                <div className="specifications_item_value">
                                    {lang === 'ru'
                                        ? 'х64'
                                        : 'х64'
                                    }
                                </div>
                            </div>
                            <div className="specifications_item">
                                <div className="specifications_item_text">
                                    {lang === 'ru'
                                        ? 'Операционная система'
                                        : 'Operating system'
                                    }
                                </div>
                                <div className="specifications_item_value">
                                    {lang === 'ru'
                                        ? 'Windows 10/11'
                                        : 'Windows 10/11'
                                    }
                                </div>
                            </div>
                            <div className="specifications_item">
                                <div className="specifications_item_text">
                                    {lang === 'ru'
                                        ? 'Оперативная память'
                                        : 'RAM'
                                    }
                                </div>
                                <div className="specifications_item_value">
                                    {lang === 'ru'
                                        ? '4 Гб (мин.), 16 Гб (реком.)'
                                        : '4 GB (min.), 16 GB (recom.)'
                                    }
                                </div>
                            </div>
                            <div className="specifications_item">
                                <div className="specifications_item_text">
                                    {lang === 'ru'
                                        ? 'Видеоадаптер'
                                        : 'Video Adapter'
                                    }
                                </div>
                                <div className="specifications_item_value">
                                    {lang === 'ru'
                                        ? 'с поддержкой DireactX 11'
                                        : 'with support for DirectX 11'
                                    }
                                </div>
                            </div>
                            <div className="specifications_item">
                                <div className="specifications_item_text">
                                    {lang === 'ru'
                                        ? 'Разрешение экрана'
                                        : 'Screen resolution'
                                    }
                                </div>
                                <div className="specifications_item_value">
                                    {lang === 'ru'
                                        ? '1280 x 1024 или более'
                                        : '1280 x 1024 or more'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="downloadClient_content_line one"></div>

                    <div className="downloadClient_content_item download_client">
                        <div className="downloadClient_content_title bold">
                            {lang === 'ru'
                                ? 'Попробовать бесплатно'
                                : 'Try it for free'
                            }
                        </div>
                        <div className="download_client_block">
                            <div className="download_client_text text">
                                {lang === 'ru'
                                    ? 'Загрузите и попробуйте актуальную версию продукта без регистрации'
                                    : 'Download and try the latest version of the product without registration.'
                                }
                            </div>
                            <div className="download_client_block_data">
                                <div className="download_client_block_data_item">
                                    <div className="download_client_block_data_item_text">
                                        {lang === 'ru'
                                            ? 'Размер'
                                            : 'Size'
                                        }
                                    </div>
                                    <div className="download_client_block_data_item_count">
                                        {lang === 'ru'
                                            ? '949 Мб'
                                            : '949 Mb'
                                        }
                                    </div>
                                </div>
                                <div className="download_client_block_data_item">
                                    <div className="download_client_block_data_item_text">
                                        {lang === 'ru'
                                            ? 'Дата обновления'
                                            : 'Update data'
                                        }
                                    </div>
                                    <div className="download_client_block_data_item_count">
                                        {lang === 'ru'
                                            ? '21.08.2026'
                                            : '21/08/2026'
                                        }
                                    </div>
                                </div>
                                <div className="download_client_block_data_item">
                                    <div className="download_client_block_data_item_text">
                                        {lang === 'ru'
                                            ? 'Версия'
                                            : 'Version'
                                        }
                                    </div>
                                    <div className="download_client_block_data_item_count">
                                        {lang === 'ru'
                                            ? '1.23.05'
                                            : '1.23.05'
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="download_client_block_data_btn">
                                <button>
                                    <img src={require('../../assets/icons/downloadContactUs_dark.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Загрузить дистрибутив'
                                            : 'Download the distribution'
                                        }
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="downloadClient_content_line two"></div>

                    <div className="downloadClient_content_item contact_data">
                        <div className="downloadClient_content_title bold">
                            {lang === 'ru'
                                ? 'Связаться с нами'
                                : 'Contact us'
                            }
                        </div>
                        <div className="contact_data_block">
                            <div className="contact_data_item">
                                <div className="contact_data_item_image address">
                                    <img src={require(`../../assets/icons/addressContactUs_${theme}.png`)} alt="" />
                                </div>
                                <div className="contact_data_item_text text">
                                    {lang === 'ru'
                                        ? 'г. Москва, проезд 2-й Рощинский, д. 8, строение 1'
                                        : 'Moscow, 2nd Roshchinsky Lane, building 8, building 1'
                                    }
                                </div>
                            </div>
                            <div className="contact_data_item">
                                <div className="contact_data_item_image phone">
                                    <img src={require(`../../assets/icons/phoneContactUs_${theme}.png`)} alt="" />
                                </div>
                                <div className="contact_data_item_text text">
                                    {lang === 'ru'
                                        ? '+7 (903) 270-11-77'
                                        : '+7 (903) 270-11-77'
                                    }
                                </div>
                            </div>
                            <div className="contact_data_item">
                                <div className="contact_data_item_image email">
                                    <img src={require(`../../assets/icons/emailContactUs_${theme}.png`)} alt="" />
                                </div>
                                <div className="contact_data_item_text text">
                                    {lang === 'ru'
                                        ? 'info@dmt.soft'
                                        : 'info@dmt.soft'
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};
export default DownloadClient;