import './BlockForDemo.css';
import { ScrollLink } from "../../hooks/ScrollLink";
import { useLocalSettings } from "../../hooks/useLocalSettings";

const BlockForDemo = () => {
    const { lang } = useLocalSettings();
    return (
        <>
            <div className="blockForDemo">
                <div className="container">
                    <div className="blockForDemo_content">
                        <div className="blockForDemo_content_title text">
                            {lang === 'ru'
                                ? 'Узнайте, как работает наш программный комплекс'
                                : 'Find out how our software package works'
                            }
                        </div>
                        <div className="blockForDemo_content_image">
                            <img src={require('../../assets/images/bg_video.png')} alt="" />
                            <img src={require('../../assets/images/bg_video.png')} alt="" />
                        </div>
                        <div className="blockForDemo_content_btn">
                            <ScrollLink
                                to="#preview"
                                className="blockForDemo_content_btn_link"
                            >
                                {lang === 'ru'
                                    ? 'Смотреть демо'
                                    : 'Watch the demo'
                                }
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlockForDemo;