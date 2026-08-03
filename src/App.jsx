import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SettingsProvider } from "./hooks/useLocalSettings";
import "./styles/theme.css";
import MainPage from "./pages/MainPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";

function App() {
  return (
    <SettingsProvider>
      <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/article/:idArticle" element={<ArticlePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
      </>
    </SettingsProvider>
  );
}

export default App;