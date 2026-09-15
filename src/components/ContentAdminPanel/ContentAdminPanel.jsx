import React, { useEffect, useMemo, useRef, useState } from "react";
import './ContentAdminPanel.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { Link, useNavigate } from "react-router-dom";
import { ADMINS, BRIEF_SUMMARY, NEWS } from "../../hooks/data";
import DropdownButtonFilter from "../DropdownButtonFilter/DropdownButtonFilter";

function parseDDMMYYYY(dateStr) {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('.').map(Number);
    if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return null;
    return new Date(year, month - 1, day);
}
function getDaysSinceLogin(dateStr) {
    const start = parseDDMMYYYY(dateStr);
    if (!start) return null;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const diffMs = now.getTime() - start.getTime();
    return Math.floor(diffMs / msPerDay);
}

const ContentAdminPanel = () => {
    const { lang, theme, updateTheme, updateLang } = useLocalSettings();
    const navigate = useNavigate();

    // Получаем ID из localStorage, сразу с дефолтным значением (например, 0 или null)
    const savedId = localStorage.getItem('currentAdmin');
    const currentAdminId = savedId ? Number(savedId) : 0;
    // Вычисляем текущего админа напрямую — это всегда актуально
    const infoCurrentAdmin = useMemo(
        () => ADMINS.find((admin) => admin.id === currentAdminId) || {},
        [currentAdminId]
    );

    const [ sidebarHidden, setSidebarHidden ] = useState(true);
    const [ selectedRows, setSelectedRows ] = useState([]);
    const [ currentFilter, setCurrentFilter ] = useState(lang === 'ru' ? 'Все' : 'All');
    const [ showWarning, setShowWarning ] = useState(false);
    const [ warning, setWarning ] = useState({ message: '',  btn:'', action: '' });
    const inputSearchRef = useRef();
    const [ isSearchActive, setIsSearchActive ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ tabContent, setTabContent ] = useState('home');
    const [ currentAdmin, setCurrentAdmin ] = useState(currentAdminId);
    // const [ infoCurrentAdmin, setInfoCurrentAdmin ] = useState({});
    const [ showEditingAdmins, setShowEditingAdmins ] = useState(false);
    const [ editingAdmins, setEditingAdmins ] = useState({ id: '', login: '', password: '', role: '', last: '', period: '', action: '', etc: '' });
    const [ activeContextArticle, setActiveContextArticle ] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('currentAdmin')) {
            navigate('/admin_panel-authorization');
        } else {
            if (localStorage.getItem('saveTab')) {
                setTabContent(localStorage.getItem('saveTab'));
            } else {
                setTabContent('home');
            }
        }
    }, []);

    const handleChangeSidebar = () => {
        setSidebarHidden((prev) => !prev);
    };
    const handleBack = () => {
        navigate('/admin_panel-authorization');
        localStorage.removeItem('saveTab');
        localStorage.removeItem('currentAdmin');
    };

    useEffect(() => {
        if (window.innerWidth <= 1350) {
            setSidebarHidden(true);
        } else {
            setSidebarHidden(false);
        }
    }, []);

    const handleClickRow = (e, rowId) => {
        if (e.target.closest('.adminPanel_layout_content_articles_table_layout_tbody_col_actions_div button' || e.target.closest('.adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_link'))) return;

        e.preventDefault();
        e.stopPropagation();
        setSelectedRows(prev =>
            prev.includes(rowId)
                ? prev.filter(id => id !== rowId)
                : [...prev, rowId]
        );
    };
    const handleSelectedAll = () => {
        if (selectedRows.length < NEWS.length || selectedRows.length === 0) {
            const allRows = [];
            for (let i = 0; allRows.length < NEWS.length; i++) {
                allRows.push(NEWS[i].id);
            }
            setSelectedRows(allRows);
        } else {
            setSelectedRows([]);
        }
    };

    // фильтрация таблицы
    const filteredNews = useMemo(() => {
        // if (currentFilter === 'all') return NEWS;
        // if (currentFilter === 'public') return NEWS.filter(item => item.status === 'public');
        // if (currentFilter === 'draft') return NEWS.filter(item => item.status === 'draft');
        // return NEWS;
        
        // фильтр по статусу
        let result = '';
        if (currentFilter === 'all') {
            result = [...NEWS];
        } else if (currentFilter === 'public') {
            result = NEWS.filter(item => item.status === 'public');
        } else if (currentFilter === 'draft') {
            result = NEWS.filter(item => item.status === 'draft');
        } else {
            result = [...NEWS];
        }
        // фильтрация по поисковому запросу, если он есть
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return result.filter(item => {
                // проверка id
                const idMatch = item.id.toString().includes(term);
                // проверка заголовка
                const titleMatch = item.title.toLowerCase().includes(term);
                // проверка даты
                const timeRuDate = item.time_ru.toLowerCase().includes(term);
                const timeEnDate = item.time_en.toLowerCase().includes(term);
                // проверка статей
                // const articlesMatch = item.articles.some(articleItem =>
                //     articleItem.article.toLowerCase().includes(term)
                // );
                return idMatch || titleMatch || timeRuDate || timeEnDate;
            });
        }
        result.sort((a, b) => b.id - a.id);

        return result;
    }, [currentFilter, searchTerm, NEWS]);
    

    const handleClickDeleteBtn = () => {
        if (selectedRows.length === 0) return;
        setShowWarning(true);
        setWarning({
            message: lang === 'ru'
                ? 'Вы уверены, что хотите удалить выбранные статьи?'
                : 'Are you sure you want to delete the selected articles?'
            ,
            btn: lang === 'ru' ? 'Удалить' : 'Delete',
            action: () => {
                setShowWarning(false);
                setSelectedRows([]);
            },
            etc: '',
        });
    };
    const handleClickDeleteAdminBtn = () => {
        setShowWarning(true);
        setWarning({
            message: lang === 'ru'
                ? 'Вы уверены, что хотите удалить все данные выбранного администратора?'
                : 'Are you sure you want to delete all the data of the selected administrator?'
            ,
            btn: lang === 'ru' ? 'Удалить' : 'Delete',
            action: () => {
                setShowWarning(false);
                setSelectedRows([]);
            },
            etc: '',
        });
    };
    const handleClickSaveNewInfoBtn = () => {
        setShowWarning(true);
        setWarning({
            message: lang === 'ru'
                ? 'Обнаружены изменения. Новая информация об администраторе будет сохранена. Продолжить?'
                : 'Changes have been detected. The new information about the administrator will be saved. Continue?'
            ,
            btn: lang === 'ru' ? 'Подтвердить изменения' : 'Confirm the changes',
            action: () => {
                setShowEditingAdmins(false);
                setShowWarning(false);
            },
            etc: 'adminCard',
        });
    };
    const handleClickDeleteArticleBtn = () => {
        setShowWarning(true);
        setWarning({
            message: lang === 'ru'
                ? 'Подтвердите удаление статьи'
                : 'Confirm the deletion of the article.'
            ,
            btn: lang === 'ru' ? 'Удалить' : 'Delete',
            action: () => {
                setShowEditingAdmins(false);
                setShowWarning(false);
            },
            etc: 'adminCard',
        });
    };
    const handleClickEditAdminBtn = (person) => {
        const days = getDaysSinceLogin(person.last_login);
        setShowEditingAdmins(true);
        setEditingAdmins({
            id: person.id,
            login: person.login,
            password: person.password,
            role: lang === 'ru' ? person.role_ru : person.role_en,
            last: person.last_login,
            period: days !== null
                ? (lang === 'ru' ? `${days} дн. назад` : `${days} d. ago`)
                : '—',
            action: () => {},
        });
    };

    const handleTabClick = (tab) => {
        setTabContent(tab);
    };

    const handleOpenContextArticle = (e, article) => {
        e.stopPropagation();
        setActiveContextArticle(prev => (prev === article.id ? null : article.id));
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest('.adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more') &&
                !e.target.closest('.adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more_content'))
            {
                setActiveContextArticle(null);
            };
            setSelectedRows([]);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <>
            <div className="adminPanel">
                <div className="container">
                    <div className={`adminPanel_layout ${sidebarHidden ? 'hiddenAside' : ''}`}>

                        <aside className={`adminPanel_layout_sidebar ${sidebarHidden ? 'hidden' : ''}`}>
                            <button
                                id="adminPanel_layout_sidebar_hidden_btn"
                                onClick={handleChangeSidebar}
                            >
                                <img src={require('../../assets/icons/hidden.png')} alt="" />
                            </button>

                            <div className={`adminPanel_layout_sidebar_logo ${sidebarHidden ? 'hidden' : 'visible'}`}>
                                <img src={require(`../../assets/images/${sidebarHidden ? 'logotip' : 'logo'}.png`)} alt="" />
                                <span>ADMIN</span>
                            </div>

                            <div className="adminPanel_layout_sidebar_menu">
                                <div
                                    className={`adminPanel_layout_sidebar_menu_item ${tabContent === 'home' ? 'active' : ''}`}
                                    title={sidebarHidden && (lang === 'ru' ? 'Главная' : 'Home')}
                                    onClick={() => {
                                        handleTabClick('home');
                                        localStorage.setItem('saveTab', 'home');
                                    }}
                                >
                                    <img src={require('../../assets/icons/home.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Главная'
                                            : 'Home'
                                        }
                                    </span>
                                </div>
                                <div
                                    className={`adminPanel_layout_sidebar_menu_item ${tabContent === 'articles' ? 'active' : ''}`}
                                    title={sidebarHidden && (lang === 'ru' ? 'Статьи' : 'Articles')}
                                    onClick={() => {
                                        handleTabClick('articles');
                                        localStorage.setItem('saveTab', 'articles');
                                    }}
                                >
                                    <img src={require('../../assets/icons/articles.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Статьи'
                                            : 'Articles'
                                        }
                                    </span>
                                </div>
                                <div
                                    className={`adminPanel_layout_sidebar_menu_item ${tabContent === 'admins' ? 'active' : ''}`}
                                    title={sidebarHidden && (lang === 'ru' ? 'Администраторы' : 'Administrators')}
                                    onClick={() => {
                                        handleTabClick('admins');
                                        localStorage.setItem('saveTab', 'admins');
                                    }}
                                >
                                    <img src={require('../../assets/icons/admins.png')} alt="" />
                                    <span>
                                        {lang === 'ru'
                                            ? 'Администраторы'
                                            : 'Administrators'
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="adminPanel_layout_sidebar_tools">
                                <div
                                    className="adminPanel_layout_sidebar_menu_item"
                                    title={sidebarHidden && (lang === 'ru' ? 'Тема' : 'Theme')}
                                    onClick={() => updateTheme(theme === 'dark' ?  'light' : 'dark')}
                                >
                                    <img src={require(`../../assets/icons/${theme === 'dark' ? 'admin_theme_dark' : 'admin_theme_light'}.png`)} alt="" />
                                    <span>
                                        {theme === 'dark' ? (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Темная тема'
                                                    : 'Dark theme'
                                                }
                                            </>
                                        ) : (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Светлая тема'
                                                    : 'Light theme'
                                                }
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div
                                    className="adminPanel_layout_sidebar_menu_item"
                                    title={sidebarHidden && (lang === 'ru' ? 'Язык' : 'Language')}
                                    onClick={() => updateLang(lang === 'ru' ?  'en' : 'ru')}
                                >
                                    <img src={require("../../assets/icons/language.png")} alt="" />
                                    <span>
                                        {lang === 'ru' ? (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Русский'
                                                    : 'Russian'
                                                }
                                            </>
                                        ) : (
                                            <>
                                                {lang === 'ru'
                                                    ? 'Английский'
                                                    : 'English'
                                                }
                                            </>
                                        )}
                                    </span>
                                </div>
                                    {/* <div className="adminPanel_layout_sidebar_menu_item" title={sidebarHidden && (lang === 'ru' ? 'Настройки' : 'Settings')}>
                                        <img src={require('../../assets/icons/settings.png')} alt="" />
                                        <span>
                                            {lang === 'ru'
                                                ? 'Настройки'
                                                : 'Settings'
                                            }
                                        </span>
                                    </div> */}
                                <button
                                    className={`adminPanel_layout_sidebar_tools_bnt ${sidebarHidden ? 'hidden' : ''}`}
                                    title={sidebarHidden && (lang === 'ru' ? 'Выйти' : 'Quit')}
                                    onClick={handleBack}
                                >
                                    <img
                                        className="adminPanel_layout_sidebar_tools_bnt_image"
                                        src={require('../../assets/icons/exit.png')} alt=""
                                    />
                                    <span className="adminPanel_layout_sidebar_tools_bnt_text">
                                        {lang === 'ru'
                                            ? 'Выйти'
                                            : 'Quit'
                                        }
                                    </span>
                                </button>
                            </div>
                        </aside>

                        <div className={`adminPanel_layout_content_page adminPanel_layout_content_home ${tabContent === 'home' ? 'active' : ''} ${sidebarHidden ? 'hiddenAside' : ''}`}>
                            <div className="adminPanel_layout_content_home_header">
                                <div className="adminPanel_layout_content_home_header_title bold">
                                    {lang === 'ru'
                                        ? 'Главная'
                                        : 'Home'
                                    }
                                </div>
                                <div className="adminPanel_layout_content_home_header_text">
                                    {lang === 'ru'
                                        ? 'Краткая сводка по публикациям и просмотрам'
                                        : 'A brief summary of publications and views'
                                    }
                                </div>
                            </div>

                            <div className="adminPanel_layout_content_home_brief_summary">
                                {BRIEF_SUMMARY.map((item) => (
                                    <div className="adminPanel_layout_content_home_brief_summary_item" key={item.id}>
                                        <div className="adminPanel_layout_content_home_brief_summary_item_image">
                                            <span className={`adminPanel_layout_content_home_brief_summary_item_image_span ${item.image}`}>
                                                <img src={require(`../../assets/icons/${item.image}.png`)} alt="" />
                                            </span>
                                        </div>
                                        <div className="adminPanel_layout_content_home_brief_summary_item_info">
                                            <div className="adminPanel_layout_content_home_brief_summary_item_info_title">
                                                {lang === 'ru'
                                                    ? item.title_ru
                                                    : item.title_en
                                                }
                                            </div>
                                            <div className="adminPanel_layout_content_home_brief_summary_item_info_count">
                                                <div className="adminPanel_layout_content_home_brief_summary_item_info_count_value bold">
                                                    <span>{item.count}</span>
                                                </div>
                                                <div className="adminPanel_layout_content_home_brief_summary_item_info_count_procent">
                                                    <img src={require('../../assets/icons/admin_arrow.png')} alt="" />
                                                    <span>+${item.procent}%</span>
                                                </div>
                                            </div>
                                            <div className="adminPanel_layout_content_home_brief_summary_item_info_text">
                                                {lang === 'ru'
                                                    ? 'за последние 30 дней'
                                                    : 'over the past 30 days'
                                                }
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                            <div className="adminPanel_layout_content_home_static">
                                <div className="adminPanel_layout_content_home_static_graph">
                                    <div className="adminPanel_layout_content_home_static_graph_header">
                                        <span className="adminPanel_layout_content_home_static_graph_header_item bold" translate="no">
                                            {lang === 'ru'
                                                ? 'Динамика просмотров'
                                                : 'Viewing dynamics'
                                            }
                                        </span>

                                        <select className="adminPanel_layout_content_home_static_graph_header_item select">
                                            {window.innerWidth > 380 ? (
                                                <>
                                                    <option value="thirty">
                                                        {lang === 'ru'
                                                            ? 'Последние 30 дней'
                                                            : 'The last 30 days'
                                                        }
                                                    </option>
                                                    <option value="fifteen">
                                                        {lang === 'ru'
                                                            ? 'Последние 15 дней'
                                                            : 'The last 15 days'
                                                        }
                                                    </option>
                                                    <option value="seven">
                                                        {lang === 'ru'
                                                            ? 'Последние 7 дней'
                                                            : 'The last 7 days'
                                                        }
                                                    </option>
                                                    <option value="one">
                                                        {lang === 'ru'
                                                            ? 'Последний 1 дней'
                                                            : 'The last 1 days'
                                                        }
                                                    </option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="thirty">
                                                        {lang === 'ru'
                                                            ? '30 дней'
                                                            : '30 days'
                                                        }
                                                    </option>
                                                    <option value="fifteen">
                                                        {lang === 'ru'
                                                            ? '15 дней'
                                                            : '15 days'
                                                        }
                                                    </option>
                                                    <option value="seven">
                                                        {lang === 'ru'
                                                            ? '7 дней'
                                                            : '7 days'
                                                        }
                                                    </option>
                                                    <option value="one">
                                                        {lang === 'ru'
                                                            ? '1 дней'
                                                            : '1 days'
                                                        }
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                </div>

                                <div className="adminPanel_layout_content_home_static_popular">
                                    <div className="adminPanel_layout_content_home_static_popular_header">
                                        <span className="adminPanel_layout_content_home_static_popular_header_item bold" translate="no">
                                            {lang === 'ru'
                                                ? 'Популярные статьи'
                                                : 'Popular articles'
                                            }
                                        </span>
                                        <Link to="" className="adminPanel_layout_content_home_static_popular_header_item link" translate="no">
                                            {lang === 'ru'
                                                ? 'Все статьи'
                                                : 'All articles'
                                            }
                                            <img src={require('../../assets/icons/arrow3.png')} alt="" />
                                        </Link>
                                    </div>

                                    <div className="adminPanel_layout_content_home_static_popular_cards">
                                        {NEWS
                                            .sort((a, b) => b.views - a.views)
                                            .slice(0, 5)
                                            .map((item, index) => {
                                                const views = item.views;
                                                const formattedViews = views.toLocaleString('ru-RU');
                                                const getViewsText = (count) => {
                                                    const lastDigit = count % 10;
                                                    const lastTwoDigits = count % 100;
                                                    if (lastTwoDigits >= 11 && lastTwoDigits <=19) {
                                                        return lang === 'ru' ? 'просмотров' : 'views';
                                                    }
                                                    if (lastDigit === 1) {
                                                        return lang === 'ru' ? 'просмотр' : 'views';
                                                    } else if (lastDigit >= 2 && lastDigit <= 4) {
                                                        return lang === 'ru' ? 'просмотра' : 'views';
                                                    } else {
                                                        return lang === 'ru' ? 'просмотров' : 'views';
                                                    }
                                                };
                                                const viewsText = getViewsText(views);
                                                if (item.status === 'public')
                                                    return (
                                                        <Link to={`/article/${item.id}`} className="adminPanel_layout_content_home_static_popular_cards_item" key={item.id}>
                                                            <div className="adminPanel_layout_content_home_static_popular_cards_item_number">{index + 1}</div>
                                                            <div className="adminPanel_layout_content_home_static_popular_cards_item_info">
                                                                <div className="adminPanel_layout_content_home_static_popular_cards_item_info_title">{item.title}</div>
                                                                <div className="adminPanel_layout_content_home_static_popular_cards_item_info_views">{formattedViews} {viewsText}</div>
                                                            </div>
                                                            <div className="adminPanel_layout_content_home_static_popular_cards_item_image">
                                                                <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                                            </div>
                                                        </Link>
                                                    )
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={`adminPanel_layout_content_page adminPanel_layout_content_articles ${tabContent === 'articles' ? 'active' : ''}  ${sidebarHidden ? 'hiddenAside' : ''}`}>
                            <div className="adminPanel_layout_content_articles_header">
                                <div className="adminPanel_layout_content_articles_header_title bold">
                                    {lang === 'ru'
                                        ? 'Статьи'
                                        : 'Articles'
                                    }
                                </div>

                                <div className="adminPanel_layout_content_articles_header_btns">
                                    <div className="adminPanel_layout_content_articles_header_btns_item search" id="search_btn">
                                        <input
                                            type="text"
                                            className="adminPanel_layout_content_articles_header_btns_item_input"
                                            placeholder={lang === 'ru' ? 'Поиск статей' : 'Search articles'}
                                            ref={inputSearchRef}
                                            onBlur={() => {
                                                setIsSearchActive(false);
                                            }}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            value={searchTerm}
                                            translate="no"
                                        />
                                        <img src={require('../../assets/icons/search.png')} alt="" />
                                    </div>
                                    <button className="adminPanel_layout_content_articles_header_btns_item adding">
                                        <img src={require('../../assets/icons/plus.png')} alt="" />
                                        <span>
                                            {lang === 'ru'
                                                ? 'Новая статья'
                                                : 'New article'
                                            }
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="adminPanel_layout_content_articles_table">
                                <div className="adminPanel_layout_content_articles_table_tools">
                                    <div className="adminPanel_layout_content_articles_table_tools_choose">
                                        <input
                                            type="checkbox"
                                            hidden
                                            id="btn_checkbox_all"
                                            onChange={handleSelectedAll}
                                        />
                                        <div
                                            className={`
                                                adminPanel_layout_content_articles_table_checkbox_btn
                                                ${selectedRows.length === NEWS.length ? 'checked' : ''}
                                            `}
                                            onClick={handleSelectedAll}
                                        >
                                            <img src={require('../../assets/icons/checked.png')} alt="" />
                                        </div>
                                        <div className="adminPanel_layout_content_articles_table_tools_choose_spans">
                                            {selectedRows.length === 0 ? (
                                                <label htmlFor="btn_checkbox_all">
                                                    <span translate="no">
                                                        {lang === 'ru'
                                                            ? 'Выбрать все'
                                                            : 'Select all'
                                                        }
                                                    </span>
                                                </label>
                                            ) : (
                                                selectedRows.length < NEWS.length ? (
                                                    <label htmlFor="btn_checkbox_all">
                                                        <span translate="no">
                                                            {lang === 'ru'
                                                                ? 'Выбрано: '
                                                                : 'Selected: '
                                                            }
                                                        </span>
                                                        <span>{selectedRows.length}</span>
                                                    </label>
                                                ) : (
                                                    <label htmlFor="btn_checkbox_all">
                                                        <span translate="no">
                                                            {lang === 'ru'
                                                                ? 'Отменить выбор всех '
                                                                : 'Unselected all'
                                                            }
                                                        </span>
                                                    </label>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="adminPanel_layout_content_articles_table_tools_filter">
                                        {selectedRows.length > 0 && (
                                            <button
                                                className="adminPanel_layout_content_articles_table_tools_filter_btn"
                                                onClick={handleClickDeleteBtn}
                                            >
                                                <img src={require('../../assets/icons/trash.png')} alt="" />
                                            </button>
                                        )}

                                        <DropdownButtonFilter
                                            label={lang === 'ru' ? 'Фильтры' : 'Filter'}
                                            initialValue={lang === 'ru' ? 'Все' : 'All'}
                                            onSelect={(value) => {
                                                setCurrentFilter(value);
                                            }}
                                        >
                                            {({ onSelect}) => (
                                                <>
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => onSelect('all', lang === 'ru' ? 'Все' : 'All')}
                                                    >
                                                        {lang === 'ru' ? 'Все' : 'All'}
                                                    </div>
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => onSelect('public', lang === 'ru' ? 'Опубликовано' : 'Published')}
                                                    >
                                                        {lang === 'ru' ? 'Опубликовано' : 'Published'}
                                                    </div>
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => onSelect('draft', lang === 'ru' ? 'Черновики' : 'Drafts')}
                                                    >
                                                        {lang === 'ru' ? 'Черновики' : 'Drafts'}
                                                    </div>
                                                </>
                                            )}
                                        </DropdownButtonFilter>
                                    </div>
                                </div>
                                <div className="adminPanel_layout_content_articles_table_layout">
                                    <table className="adminPanel_layout_content_articles_table_layout_table">
                                        <thead className="adminPanel_layout_content_articles_table_layout_thead">
                                            <tr>
                                                <th className="col col-check"></th>
                                                <th className="col col-name">{lang === 'ru' ? 'Наименование' : 'Name'}</th>
                                                <th className="col col-status">{lang === 'ru' ? 'Статус' : 'Status'}</th>
                                                <th className="col col-views">{lang === 'ru' ? 'Просмотры' : 'Views'}</th>
                                                <th className="col col-date">{lang === 'ru' ? 'Дата публикации' : 'Publication date'}</th>
                                                <th className="col col-actions">{lang === 'ru' ? 'Действия' : 'Actions'}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="adminPanel_layout_content_articles_table_layout_tbody">
                                            {filteredNews.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className={`
                                                        adminPanel_layout_content_articles_table_layout_tbody_tr
                                                        ${selectedRows.includes(item.id) ? 'selected' : ''}
                                                    `}
                                                    onClick={(e) => handleClickRow(e, item.id)}
                                                >
                                                    <td className="col col-check adminPanel_layout_content_articles_table_layout_tbody_col_check">
                                                        <input
                                                            type="text"
                                                            hidden
                                                        />
                                                        <div
                                                            className={`
                                                                adminPanel_layout_content_articles_table_checkbox_btn
                                                                ${selectedRows.includes(item.id) ? 'checked' : ''}
                                                            `}
                                                        >
                                                            <img src={require('../../assets/icons/checked.png')} alt="" />
                                                        </div>
                                                    </td>
                                                    <td className="col col-name adminPanel_layout_content_articles_table_layout_tbody_col_name">
                                                        <div className="adminPanel_layout_content_articles_table_layout_tbody_col_name_div">
                                                            <div className="adminPanel_layout_content_articles_table_layout_tbody_col_name_div_image">
                                                                <img src={require(`../../assets/images/${item.image}`)} alt="imag" />
                                                            </div>
                                                            <div className="adminPanel_layout_content_articles_table_layout_tbody_col_name_div_info">
                                                                <span className="adminPanel_layout_content_articles_table_layout_tbody_col_name_div_info_span">
                                                                    {item.title}
                                                                </span>
                                                                {item.status !== 'draft' && (
                                                                    <Link
                                                                        to={`/article/${item.id}`}
                                                                        className="adminPanel_layout_content_articles_table_layout_tbody_col_name_div_info_link"
                                                                    >
                                                                        /article/{item.id}
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={`
                                                            col
                                                            col-status
                                                            adminPanel_layout_content_articles_table_layout_tbody_col_status
                                                            ${item.status === 'public' ? 'public' : 'draft'}
                                                        `}
                                                    >
                                                        {item.status === 'public' ? (
                                                            <span translate="no">
                                                                {lang === 'ru' ? 'Опубликовано' : 'Published'}
                                                            </span>
                                                        ) : (
                                                            <span translate="no">
                                                                {lang === 'ru' ? 'Черновик' : 'Draft'}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="col col-views adminPanel_layout_content_articles_table_layout_tbody_col_views">
                                                        {item.status !== 'draft' ? (
                                                            item.views.toLocaleString('ru-RU')
                                                        ) : (
                                                            <span className="adminPanel_layout_content_articles_table_layout_tbody_col_time_span">
                                                                —
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="col col-time adminPanel_layout_content_articles_table_layout_tbody_col_time">
                                                        {item.status !== 'draft' ? (
                                                            lang === 'ru' ? item.time_ru : item.time_en
                                                        ) : (
                                                            <span className="adminPanel_layout_content_articles_table_layout_tbody_col_time_span">
                                                                —
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="col col-actions adminPanel_layout_content_articles_table_layout_tbody_col_actions">
                                                        <div className="adminPanel_layout_content_articles_table_layout_tbody_col_actions_div">
                                                            <button title={lang === 'ru' ? 'Редактировать' : 'Edit'}>
                                                                <img src={require('../../assets/icons/action_edit.png')} alt="" />
                                                            </button>
                                                            {item.status === 'draft' ? (
                                                                <button
                                                                    className="disabled"
                                                                    disabled={item.status === 'draft'}
                                                                    title={lang === 'ru' ? 'Просматривать статьи можно только после публикации' : 'You can view the articles only after they have been published'}
                                                                >
                                                                    <img src={require('../../assets/icons/action_view.png')} alt="" />
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    to={`/article/${item.id}`}
                                                                    className="adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_link"
                                                                    title={lang === 'ru' ? 'Перейти на страницу' : 'Go to page'}
                                                                >
                                                                    <img src={require('../../assets/icons/action_view.png')} alt="" />
                                                                </Link>
                                                            )}
                                                            <button
                                                                title={lang === 'ru' ? 'Другие действия' : 'Other actions'}
                                                                className="adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more"
                                                                onClick={(e) => {handleOpenContextArticle(e, item)}}
                                                            >
                                                                <img src={require('../../assets/icons/action_more.png')} alt="" />

                                                                <div
                                                                    key={item.id}
                                                                    className={`
                                                                        adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more_content
                                                                        ${activeContextArticle === item.id ? 'active' : ''}
                                                                    `}
                                                                >
                                                                    {item.status === 'draft' && (
                                                                        <div className="adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more_content_item">
                                                                            {lang === 'ru'
                                                                                ? 'Опубликовать'
                                                                                : 'To publish'
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {item.status === 'public' && (
                                                                        <div className="adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more_content_item">
                                                                            {lang === 'ru'
                                                                                ? 'Отправить рассылку'
                                                                                : 'Send a newsletter'
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    <div
                                                                        className="adminPanel_layout_content_articles_table_layout_tbody_col_actions_div_more_content_item"
                                                                        onClick={handleClickDeleteArticleBtn}
                                                                    >
                                                                        {lang === 'ru' ? 'Удалить' : 'Delete'}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>

                        <div className={`adminPanel_layout_content_page adminPanel_layout_content_admins ${tabContent === 'admins' ? 'active' : ''}  ${sidebarHidden ? 'hiddenAside' : ''}`}>
                            <div className="adminPanel_layout_content_admins_header">
                                <div className="adminPanel_layout_content_articles_header_title bold">
                                    {lang === 'ru'
                                        ? 'Администраторы'
                                        : 'Administrators'
                                    }
                                </div>
                                <button className="adminPanel_layout_content_articles_header_btn">
                                    <img src={require('../../assets/icons/action_edit.png')} alt="" />
                                </button>
                            </div>
                            <div className="adminPanel_layout_content_admins_table">
                                <div className="adminPanel_layout_content_admins_table_layout">
                                    <table className="adminPanel_layout_content_admins_table_layout_table">
                                        <thead className="adminPanel_layout_content_admins_table_layout_table_thead">
                                            <tr className="adminPanel_layout_content_admins_table_layout_table_thead_tr">
                                                <th className="ad_col ad_col_mark"></th>
                                                <th className="ad_col ad_col_id">{lang === 'ru' ? 'ID' : 'ID'}</th>
                                                <th className="ad_col ad_col_role">{lang === 'ru' ? 'Роль' : 'Role'}</th>
                                                <th className="ad_col ad_col_login">{lang === 'ru' ? 'Логин' : 'Login'}</th>
                                                <th className="ad_col ad_col_password">{lang === 'ru' ? 'Пароль' : 'Password'}</th>
                                                <th className="ad_col ad_col_last">{lang === 'ru' ? 'Последний вход' : 'Last login'}</th>
                                                <th className="ad_col ad_col_btns"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="adminPanel_layout_content_admins_table_layout_table_tbody">
                                            {infoCurrentAdmin.id === 1 ? (
                                                ADMINS.map((item) => (
                                                    <tr className="adminPanel_layout_content_admins_table_layout_table_tbody_tr">
                                                        <td className="ad_col ad_col_mark adminPanel_layout_content_admins_table_layout_table_tbody_tr_mark">
                                                            {currentAdmin === item.id && (
                                                                <div className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_mark_div">
                                                                    <span>
                                                                        {lang === 'ru'
                                                                            ? 'Вы'
                                                                            : 'You'
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="ad_col ad_col_id adminPanel_layout_content_admins_table_layout_table_tbody_tr_id">
                                                            {item.id}
                                                        </td>
                                                        <td className="ad_col ad_col_role adminPanel_layout_content_admins_table_layout_table_tbody_tr_role">
                                                            {lang === 'ru' ? item.role_ru : item.role_en}
                                                        </td>
                                                        <td className="ad_col ad_col_login adminPanel_layout_content_admins_table_layout_table_tbody_tr_login">
                                                            {item.login}
                                                        </td>
                                                        <td className="ad_col ad_col_password adminPanel_layout_content_admins_table_layout_table_tbody_tr_password">
                                                            {item.password && (
                                                                <div className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_password_div">
                                                                    {Array.from({ length: 6 }).map((_, index) => (
                                                                        <span></span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="ad_col ad_col_last adminPanel_layout_content_admins_table_layout_table_tbody_tr_last">
                                                            {currentAdmin === item.id ? (
                                                                <span className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_last_online">
                                                                    {lang === 'ru' ? 'В сети' : 'Online'}
                                                                </span>
                                                            ) : (
                                                                <span>{item.last_login}</span>
                                                            )}
                                                        </td>
                                                        <td className="ad_col ad_col_btns adminPanel_layout_content_admins_table_layout_table_tbody_tr_btns">
                                                            <div className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_last_div">
                                                                <button
                                                                    onClick={() => handleClickEditAdminBtn(item)}
                                                                >
                                                                    <img src={require('../../assets/icons/action_edit.png')} alt="" />
                                                                </button>
                                                                <button className="delete" onClick={handleClickDeleteAdminBtn}>
                                                                    <img src={require('../../assets/icons/trash.png')} alt="" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="adminPanel_layout_content_admins_table_layout_table_tbody_tr">
                                                    <td className="ad_col ad_col_mark adminPanel_layout_content_admins_table_layout_table_tbody_tr_mark">
                                                        <div className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_mark_div">
                                                            <span>
                                                                {lang === 'ru'
                                                                    ? 'Вы'
                                                                    : 'You'
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="ad_col ad_col_id adminPanel_layout_content_admins_table_layout_table_tbody_tr_id">
                                                        {infoCurrentAdmin.id}
                                                    </td>
                                                    <td className="ad_col ad_col_role adminPanel_layout_content_admins_table_layout_table_tbody_tr_role">
                                                        {lang === 'ru' ? infoCurrentAdmin.role_ru : infoCurrentAdmin.role_en}
                                                    </td>
                                                    <td className="ad_col ad_col_login adminPanel_layout_content_admins_table_layout_table_tbody_tr_login">
                                                        {infoCurrentAdmin.login}
                                                    </td>
                                                    <td className="ad_col ad_col_password adminPanel_layout_content_admins_table_layout_table_tbody_tr_password">
                                                        {infoCurrentAdmin.password && (
                                                            <div className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_password_div">
                                                                {Array.from({ length: 6 }).map((_, index) => (
                                                                    <span></span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="ad_col ad_col_last adminPanel_layout_content_admins_table_layout_table_tbody_tr_last">
                                                        {currentAdmin === infoCurrentAdmin.id ? (
                                                            <span className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_last_online">
                                                                {lang === 'ru' ? 'В сети' : 'Online'}
                                                            </span>
                                                        ) : (
                                                            <span>{infoCurrentAdmin.last_login}</span>
                                                        )}
                                                    </td>
                                                    <td className="ad_col ad_col_btns adminPanel_layout_content_admins_table_layout_table_tbody_tr_btns">
                                                        <div className="adminPanel_layout_content_admins_table_layout_table_tbody_tr_last_div">
                                                            <button
                                                                onClick={() => handleClickEditAdminBtn(infoCurrentAdmin)}
                                                            >
                                                                <img src={require('../../assets/icons/action_edit.png')} alt="" />
                                                            </button>
                                                            <button className="delete" onClick={handleClickDeleteAdminBtn}>
                                                                <img src={require('../../assets/icons/trash.png')} alt="" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>



                {/* окно подтверждения */}
                {showWarning && (
                    <div className="modal">
                        <div className={`modal_content ${warning.etc === 'adminCard' ? 'adminCard' : ''}`}>
                            <div className="modal_text">{warning.message}</div>
                            <div className="modal_btns">
                                <button className='modal_btns_item agree' onClick={warning.action}>
                                    {warning.btn}
                                </button>
                                <button className='modal_btns_item cancel' onClick={() => setShowWarning(false)}>
                                    {lang === 'ru' ? 'Отмена' : 'Cancel'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* окно редактирования информации об администраторе */}
                {showEditingAdmins && (
                    <div className="editing">
                        <div className="editing_content">
                            <div className="editing_content_header">
                                <span onClick={() => setShowEditingAdmins(false)}></span>
                            </div>
                            <div className="editing_content_title bold">
                                {lang === 'ru'
                                    ? 'Карточка администратора'
                                    : 'Administrator card'
                                }
                            </div>
                            <div className="editing_content_form">
                                <div className="editing_content_form_input">
                                    <input
                                        type="text"
                                        placeholder={lang === 'ru' ? 'ID' : 'ID'}
                                        id="editing_admin_id"
                                        value={editingAdmins.id}
                                    />
                                    <label htmlFor="editing_admin_id">
                                        {lang === 'ru' ? 'ID' : 'ID'}
                                    </label>
                                </div>
                                <div className="editing_content_form_input">
                                    <input
                                        type="text"
                                        placeholder={lang === 'ru' ? 'Роль' : 'Role'}
                                        id="editing_admin_role"
                                        value={editingAdmins.role}
                                    />
                                    <label htmlFor="editing_admin_role">
                                        {lang === 'ru' ? 'Роль' : 'Role'}
                                    </label>
                                </div>
                                <div className="editing_content_form_input">
                                    <input
                                        type="text"
                                        placeholder={lang === 'ru' ? 'Логин' : 'Login'}
                                        id="editing_admin_login"
                                        value={editingAdmins.login}
                                    />
                                    <label htmlFor="editing_admin_login">
                                        {lang === 'ru' ? 'Логин' : 'Login'}
                                    </label>
                                </div>
                                <div className="editing_content_form_input">
                                    <input
                                        type="password"
                                        placeholder={lang === 'ru' ? 'Пароль' : 'Password'}
                                        id="editing_admin_password"
                                        value={editingAdmins.password}
                                    />
                                    <label htmlFor="editing_admin_password">
                                        {lang === 'ru' ? 'Пароль' : 'Password'}
                                    </label>
                                </div>
                                <div className="editing_content_form_input">
                                    <div
                                        className="editing_content_form_input_div"
                                        id="editing_admin_last"
                                    >
                                        <span>{editingAdmins.last}</span>
                                        <span className="period">{editingAdmins.period}</span>
                                    </div>
                                    <label htmlFor="editing_admin_last">
                                        {lang === 'ru' ? 'Последнее посещение' : 'Last visit'}
                                    </label>
                                </div>
                                <div className="editing_content_form_btns">
                                    <button className="editing_content_form_btns_item agree" onClick={handleClickSaveNewInfoBtn}>
                                        {lang === 'ru' ? 'Сохранить' : 'Save'}
                                    </button>
                                    <button className="editing_content_form_btns_item cancel" onClick={() => setShowEditingAdmins(false)}>
                                        {lang === 'ru' ? 'Отмена' : 'Cancel'}
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </>
    );
};
export default ContentAdminPanel;