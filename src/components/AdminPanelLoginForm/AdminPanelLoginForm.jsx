import React, { useEffect, useRef, useState } from "react";
import './AdminPanelLoginForm.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useNavigate } from "react-router-dom";

const AdminPanelLoginForm = () => {
    const { lang } = useLocalSettings();
    const [ login, setLogin ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const loginRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const LOGIN = 'admin';
    const PASSWORD = 'admin';

    document.title = `DMT ${lang === 'ru' ? 'Софт' : 'Soft'} | ${lang === 'ru' ? 'Вход в панель администратора' : 'Login to admin panel'}`;

    useEffect(() => {
        if (!loading) {
            loginRef.current?.focus();
        }
    }, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const loginValue = loginRef.current.value;
        const passwordValue = passwordRef.current.value;

        if (loginValue === LOGIN && passwordValue === PASSWORD) {
            setError(null);
            setSuccess(true);
            navigate('/admin_panel');
        } else {
            setSuccess(false);
            setError(lang === 'ru' ? 'Доступ запрещён' : 'Access is prohibited')
        }
        setLoading(false);
    };

    return (
        <>
            <div className="adminPanelLoginForm">
                <div className="container">
                    <div className="adminPanelLoginForm_content">
                        <form className="adminPanelLoginForm_content_form" onSubmit={handleSubmit}>
                            <div className="adminPanelLoginForm_content_title bold">
                                <span className="adminPanelLoginForm_content_title_one">
                                    {lang === 'ru'
                                        ? 'Вход в'
                                        : 'Login to'
                                    }
                                </span>
                                <span className="adminPanelLoginForm_content_title_two">
                                    {lang === 'ru'
                                        ? 'Админ Панель'
                                        : 'Admin Panel'
                                    }
                                </span>
                            </div>
                            <div className="adminPanelLoginForm_content_form_inputs">
                                <div className="adminPanelLoginForm_content_form_input one">
                                    <input
                                        type="text"
                                        id=""
                                        placeholder={lang === 'ru' ? 'Логин' : 'Login'}
                                        ref={loginRef}
                                        value={login}
                                    />
                                </div>
                                <div className="adminPanelLoginForm_content_form_input two">
                                    <input
                                        type="password"
                                        id=""
                                        placeholder={lang === 'ru' ? 'Пароль' : 'Password'}
                                        ref={passwordRef}
                                        value={password}
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="adminPanelLoginForm_content_form_error">
                                    {error}
                                </div>
                            )}
                            <div className="adminPanelLoginForm_content_form_btn">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`adminPanelLoginForm_content_form_btn_item `}
                                >
                                    {loading ? (
                                        <>
                                            {lang === 'ru'
                                                ? 'Загрузка...'
                                                : 'Loading...'
                                            }
                                        </>
                                    ) : (
                                        success ? (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Осуществляется вход...'
                                                    : 'Logging in...'
                                                }
                                            </>
                                        ) : (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Войти'
                                                    : 'Login'
                                                }
                                            </>
                                        )
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
export default AdminPanelLoginForm;