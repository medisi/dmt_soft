import './BlockForForm.css';
import { ScrollLink } from "../../hooks/ScrollLink";
import { useLocalSettings } from "../../hooks/useLocalSettings";

const BlockForForm = () => {
    const { lang } = useLocalSettings();
    return (
        <>
            <div className="blockForForm">
                <div className="container">
                    <div className="blockForForm_content">
                        <div className="blockForForm_content_title text">
                            {lang === 'ru'
                                ? 'Попробуйте демо-версию клиента'
                                : 'Try the demo version of the client'
                            }
                        </div>
                        <div className="blockForForm_content_image">
                            <img src={require('../../assets/images/bg_video.png')} alt="" />
                            <img src={require('../../assets/images/bg_video.png')} alt="" />
                        </div>
                        <div className="blockForForm_content_btn">
                            <ScrollLink
                                to="#form_request"
                                className="blockForForm_content_btn_link"
                            >
                                {lang === 'ru'
                                    ? 'Оставить заявку'
                                    : 'Submit'
                                }
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlockForForm;