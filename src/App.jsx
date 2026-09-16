import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SettingsProvider } from "./hooks/useLocalSettings";
import "./styles/theme.css";
import MainPage from "./pages/MainPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserAgreement from "./pages/UserAgreement";
import AdminPanelLogin from "./pages/AdminPanel/AdminPanelLogin";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import CompanyPage from "./pages/CompanyPage";
import AdminPanelEditor from "./pages/AdminPanel/AdminPanelEditor";

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
          <Route path="/company-information" element={<CompanyPage />} />
          {/* admin panel */}
          <Route path="/admin_panel-authorization" element={<AdminPanelLogin />} />
          <Route path="/admin_panel" element={<AdminPanel />} />
          <Route path="/admin_panel_editor" element={<AdminPanelEditor />} />
        </Routes>
      </>
    </SettingsProvider>
  );
}

export default App;