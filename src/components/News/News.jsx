import React, { useEffect, useState } from "react";
import './News.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { NEWS } from "../../hooks/data";
import NewCard from "./NewCard/NewCard";
import { Link } from "react-router-dom";

const News = () => {
    const { lang } = useLocalSettings();
    const [ columns, setColumns ] = useState(3);
    const [ articles, setArticles ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    // useEffect(() => {
    //     if (window.innerWidth <= 1899) {
    //         setCountCards(3);
    //     } else if (window.innerWidth >= 1900) {
    //         setCountCards(4);
    //     }
    // }, []);

    useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      setColumns(width >= 1900 ? 4 : 3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Замени на реальный базовый URL твоего API
    fetch('https://api..../api/articles/2/')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        console.log('res: ', res.json());
        return res.json();
      })
      .then((data) => {
        // data.results — это массив статей
        setArticles(data.results || []);
        console.log('data: ', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Не удалось загрузить новости');
        setLoading(false);
      });
  }, []);
   if (loading) return <div className="loading">Загрузка новостей...</div>;
  if (error) return <div className="error">{error}</div>;

    return (
        <>
            {/* <div className="news" id="news">
                <div className="container">
                    <div className="news_content">
                        <div className="news_content_title title bold anim">
                            {lang === 'ru'
                                ? 'Последние новости'
                                : 'Latest news'
                            }

                        </div>

                        <div className="news_content_cards">
                            {NEWS
                            .filter((item) => item.status === 'public')
                            .slice(0, countCards)
                            .map((item) => (
                                <NewCard
                                    key={item.id}
                                    id={item.id}
                                    image={item.image}
                                    time={lang === 'ru' ? item.time_ru : item.time_en}
                                    title={item.title}
                                    articles={item.articles}
                                />
                            ))}
                        </div>
                        {NEWS.length > 3 && (
                            <div className="news_content_btn">
                                <Link to="/articles" className="news_content_btn_link bold text">
                                    {lang === 'ru'
                                        ? 'Все новости'
                                        : 'All news'
                                    }
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div> */}
            <div className="news" id="news">
        <div className="container">
          <div className="news_content">
            <h2 className="news_content_title title bold anim">
              {lang === 'ru' ? 'Последние новости' : 'Latest news'}
            </h2>

            <div
              className="news_content_cards"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: '20px',
              }}
            >
              {articles
                .filter((item) => item.status !== 'draft') // если статус есть в API; иначе убери фильтр
                .map((item) => (
                  <NewCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    time={item.time} // ISO строка из API
                    title={item.title}
                    // articles не передаём — это превью одной статьи
                  />
                ))}
            </div>

            {articles.length > 0 && (
              <div className="news_content_btn">
                <Link to="/articles" className="news_content_btn_link bold text">
                  {lang === 'ru' ? 'Все новости' : 'All news'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
        </>
    )
};
export default News;