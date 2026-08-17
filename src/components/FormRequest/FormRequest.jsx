import React, { useState } from "react";
import './FormRequest.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const FormRequest = () => {
    const { lang, theme } = useLocalSettings();
    const [ checked, setChecked ] = useState(false);

    return (
        <>
            <div className="formRequest" id="form_request">
                <div className="container">
                    <div className="formRequest_content">
                        <img className="formRequest_content_image" src={require('../../assets/images/contact.png')} alt="" />
                        <div className="formRequest_content_form box_shadow">
                            <form>
                                <div className="formRequest_content_form_title bold">
                                    {lang === 'ru'
                                        ? 'Оформите'
                                        : 'Submit'
                                    }
                                    <span>
                                        {lang === 'ru'
                                            ? ' заявку '
                                            : ' an application '
                                        }
                                    </span>
                                    {lang === 'ru'
                                        ? 'на демонстрацию'
                                        : 'for the demonstration'
                                    }
                                </div>
                                <div className="formRequest_content_form_description">
                                    {lang === 'ru'
                                        ? 'Заполните форму, и мы свяжемся с вами в ближайшее время'
                                        : 'Fill out the form, and we will contact you soon'
                                    }
                                </div>
                                <div className="formRequest_content_form_inputs">
                                    <div className="formRequest_content_form_inputs_item">
                                        <div className="formRequest_content_form_inputs_item_image" id="formRequest_image_name">
                                            <img src={require('../../assets/icons/username.png')} alt="" />
                                        </div>
                                        <input
                                            className="formRequest_content_form_inputs_item_input"
                                            type="text"
                                            id="formRequest_name"
                                            placeholder={lang === 'ru' ? 'Ваше имя' : 'Your name'}
                                        />
                                    </div>
                                    <div className="formRequest_content_form_inputs_item">
                                        <div className="formRequest_content_form_inputs_item_image" id="formRequest_image_company">
                                            <img src={require('../../assets/icons/company.png')} alt="" />
                                        </div>
                                        <input
                                            className="formRequest_content_form_inputs_item_input"
                                            type="text"
                                            id="formRequest_company"
                                            placeholder={lang === 'ru' ? 'Компания' : 'Company'}
                                        />
                                    </div>
                                    <div className="formRequest_content_form_inputs_item">
                                        <div className="formRequest_content_form_inputs_item_image" id="formRequest_image_email">
                                            <img src={require('../../assets/icons/email.png')} alt="" />
                                        </div>
                                        <input
                                            className="formRequest_content_form_inputs_item_input"
                                            type="text"
                                            id="formRequest_email"
                                            placeholder={lang === 'ru' ? 'E-mail' : 'E-mail'}
                                        />
                                    </div>
                                    <div className="formRequest_content_form_inputs_item">
                                        <div className="formRequest_content_form_inputs_item_image" id="formRequest_image_phone">
                                            <img src={require('../../assets/icons/phone.png')} alt="" />
                                        </div>
                                        <input
                                            className="formRequest_content_form_inputs_item_input"
                                            type="tel"
                                            id="formRequest_phone"
                                            placeholder={lang === 'ru' ? 'Телефон' : 'Phone'}
                                        />
                                    </div>
                                </div>
                                <div className={`formRequest_content_form_btn ${checked ? 'active' : 'noactive'}`}>
                                    <button
                                        disabled={!checked}
                                    >
                                        <span>
                                            {lang === 'ru'
                                                ? 'Отправить заявку'
                                                : 'Submit'
                                            }
                                        </span>
                                        <img
                                            className="formRequest_content_form_btn_icon"
                                            src={require(`../../assets/icons/arrow2.png`)}
                                            alt=""
                                        />
                                    </button>
                                </div>
                                <div className="formRequest_content_form_checkbox">
                                    <input
                                        type="checkbox"
                                        id="formRequest_content_form_checkbox_input"
                                        hidden
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                    />
                                    <div
                                        className="formRequest_content_form_checkbox_div"
                                        onClick={() => setChecked(!checked)}
                                    >
                                        {checked ? '✓' : ''}
                                    </div>
                                    <label htmlFor="formRequest_content_form_checkbox_input" className="formRequest_content_form_checkbox_label">
                                        {lang === 'ru'
                                            ? 'Даю согласие на обработку персональных данных и соглашаюсь '
                                            : 'I consent to the processing of personal data and agree '
                                        }
                                        <span>
                                            {lang === 'ru'
                                                ? 'с политикой конфиденциальности'
                                                : 'to the privacy policy'
                                            }
                                        </span>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default FormRequest;