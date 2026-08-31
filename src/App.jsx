import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SettingsProvider } from "./hooks/useLocalSettings";
import "./styles/theme.css";
import MainPage from "./pages/MainPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserAgreement from "./pages/UserAgreement";

function App() {
  return (
    <SettingsProvider>
      <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/article/:idArticle" element={<ArticlePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/private_policy" element={<PrivacyPolicy />} />
          <Route path="/user_agreement" element={<UserAgreement />} />
        </Routes>
      </>
    </SettingsProvider>
  );
}

export default App;