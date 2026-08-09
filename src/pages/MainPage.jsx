import React from "react";
import Header from "../components/Header/Header";
import BaseModules from "../components/BaseModules/BaseModules";
import StructureBase from "../components/StructureBase/StructureBase";
import WhyNecessary from "../components/WhyNecessary/WhyNecessary";
import News from "../components/News/News";
import DemoPreview from "../components/DemoPreview/DemoPreview";
import Footer from "../components/Footer/Footer";
import BlockForDemo from "../components/BlockForDemo/BlockForDemo";
import Home from "../components/Home/Home";
import { useLocalSettings } from "../hooks/useLocalSettings";
import QRCode from "../components/QRCode/QRCode";
import Clients from "../components/Clients/Clients";

const MainPage = () => {
    document.title = "ООО «ДМТ Софт» — компания информационных технологий, выделенная из проектной компании «ДМТ Групп» в 2016 году, с целью увеличить скорость развития программного обеспечения DMT Base.";
    
    return (
        <>
            <Header />
            <Home />
            <BaseModules />
            <StructureBase />
            <BlockForDemo />
            <WhyNecessary />
            <News />
            <Clients />
            <DemoPreview />
            <Footer />

            <QRCode />
        </>
    )
};
export default MainPage;