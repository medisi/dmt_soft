import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SettingsProvider } from "./hooks/useLocalSettings";
import "./styles/theme.css";
import MainPage from "./pages/MainPage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <SettingsProvider>
      <>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new_content" element={<ArticlePage />} />
        </Routes>
      </>
    </SettingsProvider>
  );
}

export default App;