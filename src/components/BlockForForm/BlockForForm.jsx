import './BlockForForm.css';
import { ScrollLink } from "../../hooks/ScrollLink";
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useRef, useState } from 'react';

const BlockForForm = () => {
    const { lang } = useLocalSettings();

    // STATES
    const [ checked, setChecked ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ userCompany, setUserCompany ] = useState('');
    const [ userEmail, setUserEmail ] = useState('');
    const [ userPhone, setUserPhone ] = useState('');
    const [ errorsForm, setErrorsForm ] = useState({
        nameUser: false,
        companyUser: false,
        emailUser: false,
        phoneUser: false,
    });
    // REFS
    const userNameRef = useRef(null);
    const userCompanyRef = useRef(null);
    const userEmailRef = useRef(null);
    const userPhoneRef = useRef(null);

    // валидация имени
    const validateName = (name) => {
        const trimmed = name.trim();
        if (!trimmed) return false;
        const regex = /^[A-Za-zA-Яа-яЁё]+$/;
        return regex.test(trimmed);
    };
    // валидация почты
    const validateEmail = (email) => {
        if (!email) return false;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    // маска для номера телефона
    const handlePhoneChange = (event) => {
        const input = event.target;
        let value = input.value.replace(/\D/g, '');
        // если начинается с 8, заменяем на 7
        if (value.startsWith('8')) {
            value = "7" + value.slice(1);
        }
        // обрезаем до 11 цифр
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        // если не начинается с 7, очищаем
        if (!value.startsWith("7")) {
            setUserPhone("");
            setErrorsForm((prev) => ({ ...prev, phoneUser: true }));
            return;
        }
        // форматирование
        let maskedValue = "+7";
        if (value.length > 1) maskedValue += ` (${value.slice(1, 4)}`;
        if (value.length > 4) maskedValue += `) ${value.slice(4, 7)}`;
        if (value.length > 7) maskedValue += `-${value.slice(7, 9)}`;
        if (value.length > 9) maskedValue += `-${value.slice(9, 11)}`;

        setUserPhone(maskedValue);

        // если длина 11 - значит номер полный, убираем ошибку
        const hasError = value.length !== 11;
        setErrorsForm((prev) => ({ ...prev, phoneUser: hasError }));
    };
    const checkForm = (e) => {
        e.preventDefault();

        // валидация имени
        const nameHasError = !validateName(userName);
        // валидация наименования компании
        const companyHasError = !userCompany.trim();
        // валидация почты
        const emailHasError = !validateEmail(userEmail);
        // валидация телефона
        const phoneHasError = userPhone.replace(/\D/g, "").length !== 11;

        // обновление всех ошибок сразу
        setErrorsForm({
            nameUser: nameHasError,
            companyUser: companyHasError,
            emailUser: emailHasError,
            phoneUser: phoneHasError,
        });
        // если ошибки имеются, то ставим фокус в первое поле с ошибкой
        if (nameHasError && userNameRef.current) {
            userNameRef.current.focus();
            return;
        }
        if (companyHasError && userCompanyRef.current) {
            userCompanyRef.current.focus();
            return;
        }
        if (emailHasError && userEmailRef.current) {
            userEmailRef.current.focus();
            return;
        }
        if (phoneHasError && userPhoneRef.current) {
            userPhoneRef.current.focus();
            return;
        }

        // очистка полей
        setUserName("");
        setUserCompany("");
        setUserEmail("");
        setUserPhone("");
        setErrorsForm({
            nameUser: false,
            companyUser: false,
            emailUser: false,
            phoneUser: false,
        });
        setChecked(false);
    };

    return (
        <>
            {/* <div className="blockForForm">
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
            </div> */}
            <div className="blockForForm">
                <div className="container">
                    <div className="blockForForm_content box_shadow">
                        <form onSubmit={checkForm}>
                            <div className="blockForForm_content_title bold">
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
                            <div className="blockForForm_content_description text">
                                {lang === 'ru'
                                    ? 'Заполните форму, и мы свяжемся с вами в ближайшее время'
                                    : 'Fill out the form, and we will contact you soon'
                                }
                            </div>
                            <div className="blockForForm_content_inputs">
                                <div className="blockForForm_content_inputs_item">
                                    <div className="blockForForm_content_inputs_item_image" id="blockForForm_image_name">
                                        <img src={require('../../assets/icons/username.png')} alt="" />
                                    </div>
                                    <input
                                        className="blockForForm_content_inputs_item_input text"
                                        type="text"
                                        id="blockForForm_name"
                                        placeholder={lang === 'ru' ? 'Ваше имя' : 'Your name'}
                                        ref={userNameRef}
                                        value={userName}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                            setErrorsForm((prev) => ({ ...prev, nameUser: false }));
                                        }}
                                    />
                                    {errorsForm.nameUser && (
                                        <div className="blockForForm_content_inputs_item_error text">
                                            *{lang === 'ru'
                                                ? 'Некорректное имя'
                                                : 'Incorrect name'
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="blockForForm_content_inputs_item">
                                    <div className="blockForForm_content_inputs_item_image" id="blockForForm_image_company">
                                        <img src={require('../../assets/icons/company.png')} alt="" />
                                    </div>
                                    <input
                                        className="blockForForm_content_inputs_item_input text"
                                        type="text"
                                        id="blockForForm_company"
                                        placeholder={lang === 'ru' ? 'Компания' : 'Company'}
                                        ref={userCompanyRef}
                                        value={userCompany}
                                        onChange={(e) => {
                                            setUserCompany(e.target.value);
                                            setErrorsForm((prev) => ({ ...prev, companyUser: false }));
                                        }}
                                    />
                                    {errorsForm.companyUser && (
                                        <div className="blockForForm_content_inputs_item_error text">
                                            *{lang === 'ru'
                                                ? 'Некорректное наименование'
                                                : 'Incorrect name'
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="blockForForm_content_inputs_item">
                                    <div className="blockForForm_content_inputs_item_image" id="blockForForm_image_email">
                                        <img src={require('../../assets/icons/email.png')} alt="" />
                                    </div>
                                    <input
                                        className="blockForForm_content_inputs_item_input text"
                                        type="text"
                                        id="blockForForm_email"
                                        placeholder={lang === 'ru' ? 'E-mail' : 'E-mail'}
                                        ref={userEmailRef}
                                        value={userEmail}
                                        onChange={(e) => {
                                            setUserEmail(e.target.value);
                                            setErrorsForm((prev) => ({ ...prev, emailUser: false }));
                                        }}
                                        autoComplete="email"
                                    />
                                    {errorsForm.emailUser && (
                                        <div className="blockForForm_content_inputs_item_error text">
                                            *{lang === 'ru'
                                                ? 'Некорректная почта'
                                                : 'Incorrect email'
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="blockForForm_content_inputs_item">
                                    <div className="blockForForm_content_inputs_item_image" id="blockForForm_image_phone">
                                        <img src={require('../../assets/icons/phone.png')} alt="" />
                                    </div>
                                    <input
                                        className="blockForForm_content_inputs_item_input text"
                                        type="text"
                                        id="blockForForm_phone"
                                        placeholder={lang === 'ru' ? 'Телефон' : 'Phone'}
                                        ref={userPhoneRef}
                                        value={userPhone}
                                        onChange={handlePhoneChange}
                                        inputMode="numeric"
                                        autoComplete="tel"
                                    />
                                    {errorsForm.phoneUser && (
                                        <div className="blockForForm_content_inputs_item_error text">
                                            *{lang === 'ru'
                                                ? 'Некорректный телефон'
                                                : 'Incorrect phone'
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="blockForForm_content_checks">
                                <div className="blockForForm_content_checks_checkbox">
                                    <input
                                        type="checkbox"
                                        id="blockForForm_content_checks_input"
                                        hidden
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                    />
                                    <div
                                        className="blockForForm_content_checks_div text"
                                        onClick={() => setChecked(!checked)}
                                    >
                                        {checked ? '✓' : ''}
                                    </div>
                                    <label htmlFor="blockForForm_content_checks_input" className="blockForForm_content_checks_label text">
                                        {lang === 'ru'
                                            ? 'Даю согласие на обработку персональных данных и соглашаюсь '
                                            : 'I consent to the processing of personal data and agree '
                                        }
                                        <span className='text'>
                                            {lang === 'ru'
                                                ? 'с политикой конфиденциальности'
                                                : 'to the privacy policy'
                                            }
                                        </span>
                                    </label>
                                </div>
                                <div className={`blockForForm_content_checks_button ${checked ? 'active' : 'noactive'}`}>
                                    <button
                                        disabled={!checked}
                                        type="submit"
                                    >
                                        <span className='text'>
                                            {lang === 'ru'
                                                ? 'Отправить заявку'
                                                : 'Submit'
                                            }
                                        </span>
                                        <img
                                            className="blockForForm_content_checks_button_icon"
                                            src={require(`../../assets/icons/arrow2.png`)}
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlockForForm;