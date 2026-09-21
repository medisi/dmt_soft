import React, { useMemo } from "react";
import "./ViewsChart.css";
import { useLocalSettings } from "../../hooks/useLocalSettings";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale);

const ViewsChart = ({ allArticles }) => {
  const { lang, theme } = useLocalSettings();

  const processed = useMemo(() => {
    if (!allArticles || allArticles.length === 0) return { labels: '', values: '' };

    const monthsRu = [
        "янв", "фев", "марта", "апр", "мая", "июня",
        "июля", "авг", "сент", "окт", "нояб", "дек"
    ];
    const monthsEn = [
        "jan", "feb", "march", "apr", "may", "june",
        "july", "aug", "sep", "oct", "nov", "dec"
    ];

    const grouped = allArticles.reduce((acc, article) => {
      // article — это текущий объект из массива, например { id: 6, views: 3, time_ru: '...' }
      const dateStr = article.time_ru;
      console.log(dateStr);
      if (!dateStr) return acc;

      const [day, month, year] = dateStr.split(".").map(Number);
      console.log('day: ', day);
      if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return acc;
      console.log('acc1: ', acc);

    //   const date = new Date(year, month - 1, day);
      const date = new Date(year, month - 1, day);
      const getMonth = lang === 'ru' ? monthsRu[date.getMonth()] : monthsEn[date.getMonth()];
      console.log('getMonth: ', getMonth);
      const formattedDay = day + ' ' + getMonth;

    //   const date = new Date(year, month - 1, day);
      // Ключ в формате YYYY-MM-DD для группировки
    //   const key = date.toISOString().split("T");
    //   console.log('key: ', key);
    //   console.log('key: ', key);

      
      // Берем views, если нет — считаем 0
      acc[formattedDay] = ((acc[formattedDay] || 0) + (article.views || 0));
      console.log('acc2: ', acc);
      return acc;
    }, {});

    // Сортируем ключи (даты), чтобы график шел по порядку
    const sortedKeys = Object.keys(grouped).sort();
    
    return {
      labels: sortedKeys,
      values: sortedKeys.map(key => grouped[key])
    };
  }, [allArticles]);

  const { labels, values } = processed;

  // Расчет оси Y
  const maxVal = values.length > 0 ? Math.max(...values) : 0;
  let maxY = 500;
  let step = 500;

  if (maxVal > 0) {
    if (maxVal < 500) {
      step = 100;
      maxY = Math.ceil(maxVal / step) * step;
    } else {
      maxY = Math.ceil(maxVal / step) * step;
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: lang === "ru" ? "Просмотры" : "Views",
        data: values,
        borderColor: "#F46D27",
        // backgroundColor: "rgba(255, 165, 0, 0.2)",
        backgroundColor: (context) => {
            const { ctx } = context.chart;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);

            gradient.addColorStop(0, '#F46D2750');
            gradient.addColorStop(1, '#F46D2700');

            return gradient;
        },
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    layout: {
        padding: 0,
    },
    scales: {
      x: {
        type: "category",
        time: {
          unit: "day",
          displayFormats: { day: "d MMM" },
        },
        grid: { color: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(26, 24, 24, 0.08)", drawBorder: false },
        ticks: { color: "#AAAAAA", font: { size: 12 } },
      },
      y: {
        min: 0,
        max: maxY,
        ticks: {
          stepSize: step,
          color: "#AAAAAA",
          font: { size: 12 },
          callback: (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
        },
        grid: { color: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(26, 24, 24, 0.08)", drawBorder: false },
      },
    },
  };

  if (values.length === 0) {
    return (
      <div className="views-chart-container">
        <div className="views-chart-placeholder">
          {lang === "ru" ? "Нет данных для отображения" : "No data to display"}
        </div>
      </div>
    );
  }

  return (
    <div className="views-chart-container">
      <div className="views-chart-header">
        <h3 className="views-chart-title">
          {lang === "ru" ? "Динамика просмотров" : "Viewing dynamics"}
        </h3>
        <select className="views-chart-select">
            <option value="month">
                {lang === 'ru'
                    ? 'Месяц'
                    : 'Month'
                }
            </option>
            <option value="week">
                {lang === 'ru'
                    ? 'Неделя'
                    : 'Week'
                }
            </option>
            <option value="day">
                {lang === 'ru'
                    ? 'День'
                    : 'Day'
                }
            </option>
        </select>
      </div>
      <Line data={data} options={options} key="views-chart" />
    </div>
  );
};

export default ViewsChart;