import React, { useRef, useState } from "react";
import './FormRequest.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const FormRequest = () => {
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

    // валидация email
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

        // для отправки лучше брать «чистый» номер - убираем всё, кроме цифр
        // const rawPhone = userPhone.replace(/\D/g, "");

        
        // console.log({
        //     userName: userNameValue,
        //     userCompany: userCompanyValue,
        //     userEmail: userEmailValue,
        //     userPhone: userPhone,
        //     userPhoneFormatted: rawPhone,
        // })
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
            <div className="formRequest" id="form_request">
                <div className="container">
                    <div className="formRequest_content">
                        <img className="formRequest_content_image" src={require('../../assets/images/contact.png')} alt="" />
                        <div className="formRequest_content_form box_shadow">
                            <form onSubmit={checkForm}>
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
                                            ref={userNameRef}
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                                setErrorsForm((prev) => ({ ...prev, nameUser: false }));
                                            }}
                                        />
                                        {errorsForm.nameUser && (
                                            <div className="formRequest_content_form_inputs_item_error">
                                                *{lang === 'ru'
                                                    ? 'Некорректное имя'
                                                    : 'Incorrect name'
                                                }
                                            </div>
                                        )}
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
                                            ref={userCompanyRef}
                                            value={userCompany}
                                            onChange={(e) => {
                                                setUserCompany(e.target.value);
                                                setErrorsForm((prev) => ({ ...prev, companyUser: false }));
                                            }}
                                        />
                                        {errorsForm.companyUser && (
                                            <div className="formRequest_content_form_inputs_item_error">
                                                *{lang === 'ru'
                                                    ? 'Некорректное наименование'
                                                    : 'Incorrect name'
                                                }
                                            </div>
                                        )}
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
                                            ref={userEmailRef}
                                            value={userEmail}
                                            onChange={(e) => {
                                                setUserEmail(e.target.value);
                                                setErrorsForm((prev) => ({ ...prev, emailUser: false }));
                                            }}
                                            autoComplete="email"
                                        />
                                        {errorsForm.emailUser && (
                                            <div className="formRequest_content_form_inputs_item_error">
                                                *{lang === 'ru'
                                                    ? 'Некорректная почта'
                                                    : 'Incorrect email'
                                                }
                                            </div>
                                        )}
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
                                            ref={userPhoneRef}
                                            value={userPhone}
                                            onChange={handlePhoneChange}
                                            inputMode="numeric"
                                            autoComplete="tel"
                                        />
                                        {errorsForm.phoneUser && (
                                            <div className="formRequest_content_form_inputs_item_error">
                                                *{lang === 'ru'
                                                    ? 'Некорректный телефон'
                                                    : 'Incorrect phone'
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={`formRequest_content_form_btn ${checked ? 'active' : 'noactive'}`}>
                                    <button
                                        disabled={!checked}
                                        type="submit"
                                        // onClick={(e) => {checkForm(e)}}
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