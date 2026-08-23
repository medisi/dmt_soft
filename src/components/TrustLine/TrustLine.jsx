import React from "react";
import './TrustLine.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import TrustCard from "./TrustCard/TrustCard";
import { TRUSTS } from "../../hooks/data";

const TrustLine = () => {
    const { lang } = useLocalSettings();

    return (
        <>
            <div className="trust">
                <div className="container">
                    <div className="trust_content">
                        <div className="trust_content_line">
                            <div className="trust_content_line_track">
                                <div className="trust_content_line_text text">
                                    {lang === 'ru'
                                        ? 'Программный продукт созданный инженерами для инженеров и проверенный годами эксплуатации в проектных организациях'
                                        : 'A software product created by engineers for engineers and proven over years of use in design organizations.'
                                    }
                                </div>
                                <div className="trust_content_line_text_line"></div>
                                <div className="trust_content_line_text text">
                                    {lang === 'ru'
                                        ? 'Программный продукт созданный инженерами для инженеров и проверенный годами эксплуатации в проектных организациях'
                                        : 'A software product created by engineers for engineers and proven over years of use in design organizations.'
                                    }
                                </div>
                                <div className="trust_content_line_text_line"></div>
                                <div className="trust_content_line_text trust_content_line_text-second text">
                                    {lang === 'ru'
                                        ? 'Программный продукт созданный инженерами для инженеров и проверенный годами эксплуатации в проектных организациях'
                                        : 'A software product created by engineers for engineers and proven over years of use in design organizations.'
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="trust_content_cards">
                            {TRUSTS.map((item) => (
                                <TrustCard
                                    key={item.id}
                                    count={item.count}
                                    title={lang === 'ru' ? item.title_ru : item.title_en}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default TrustLine;