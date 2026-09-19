import { useEffect, useState } from 'react';
import { NEWS } from './data';
import { convertFromRaw } from 'draft-js';

// Преобразование raw Draft.js → массив строк (как articles в NEWS)
const rawToArticles = (rawContent) => {
    if (!rawContent || !rawContent.blocks) return [{ article: '' }];
    const blocks = rawContent.blocks
        .filter((block) => block.text && block.text.trim() !== '')
        .map((block) => ({ article: block.text }));
    return blocks.length > 0 ? blocks : [{ article: '' }];
};

// Преобразование одной записи из localStorage к формату NEWS
const normalizeStoredArticle = (item) => {
    // Если запись уже в формате NEWS (с articles), возвращаем как есть
    if (item.articles && !item.content) {
        return item;
    }

    return {
        id: item.id,
        title: item.title || '',
        status: item.status || 'draft',
        views: item.views || 0,
        time_ru: item.time_ru || '',
        time_en: item.time_en || '',
        image: item.image || null,
        articles: rawToArticles(item.content),
        // Сохраняем raw-контент для редактора
        content: item.content || null,
        // Флаг, что статья из localStorage
        _isLocal: true,
    };
};

export const useAllArticles = () => {
    const [allArticles, setAllArticles] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('ArticlesDMTSoft') || '[]');
        const normalized = stored.map(normalizeStoredArticle);

        // Статьи из data.js, которые НЕ перезаписаны в localStorage
        const storedIds = new Set(stored.map((s) => s.id));
        const originalNews = NEWS.filter((n) => !storedIds.has(n.id));

        // Объединяем: оригинальные NEWS + локальные (включая перезаписанные)
        const merged = [...originalNews, ...normalized].sort((a, b) => b.id - a.id);
        setAllArticles(merged);
    }, [refreshKey]);

    const refresh = () => setRefreshKey((prev) => prev + 1);

    return { allArticles, refresh };
};
