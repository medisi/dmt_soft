import "./App.css";
import BaseModules from "./components/BaseModules/BaseModules";
import DemoPreview from "./components/DemoPreview/DemoPreview";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import StructureBase from "./components/StructureBase/StructureBase";
import WhyNecessary from "./components/WhyNecessary/WhyNecessary";
import { SettingsProvider } from "./hooks/useLocalSettings";
import "./styles/theme.css";

function App() {
  document.title = "ООО «ДМТ Софт» — компания информационных технологий, выделенная из проектной компании «ДМТ Групп» в 2016 году, с целью увеличить скорость развития программного обеспечения DMT Base.";

  return (
    <SettingsProvider>
      <>
        <Header />
        <Home />
        <BaseModules />
        <StructureBase />
        <WhyNecessary />
        <DemoPreview />
        <Footer />
      </>
    </SettingsProvider>
  );
}

export default App;
