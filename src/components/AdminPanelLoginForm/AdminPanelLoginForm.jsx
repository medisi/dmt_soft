import React, { useEffect, useRef, useState } from "react";
import './AdminPanelLoginForm.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { useNavigate } from "react-router-dom";
import { ADMINS } from "../../hooks/data";

const AdminPanelLoginForm = () => {
    const { lang } = useLocalSettings();
    const [ login, setLogin ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const loginRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

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

        const loginValue = loginRef.current.value || '';
        const passwordValue = passwordRef.current.value || '';

        // поиск совпадения с данными админов
        const matchedAdmin = ADMINS.find(
            (admin) => admin.login === loginValue && admin.password === passwordValue
        );
        if (matchedAdmin) {
            localStorage.setItem('currentAdmin', JSON.stringify(matchedAdmin.id));
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
                                        onChange={(e) => setLogin(e.target.value)}
                                    />
                                </div>
                                <div className="adminPanelLoginForm_content_form_input two">
                                    <input
                                        type="password"
                                        id=""
                                        placeholder={lang === 'ru' ? 'Пароль' : 'Password'}
                                        ref={passwordRef}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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