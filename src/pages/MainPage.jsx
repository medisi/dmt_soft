import React from "react";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import BaseModules from "../components/BaseModules/BaseModules";
import StructureBase from "../components/StructureBase/StructureBase";
import WhyNecessary from "../components/WhyNecessary/WhyNecessary";
import News from "../components/News/News";
import DemoPreview from "../components/DemoPreview/DemoPreview";
import Footer from "../components/Footer/Footer";

const MainPage = () => {
    document.title = "ООО «ДМТ Софт» — компания информационных технологий, выделенная из проектной компании «ДМТ Групп» в 2016 году, с целью увеличить скорость развития программного обеспечения DMT Base.";
    
    return (
        <>
            <Header />
            <Home />
            <BaseModules />
            <StructureBase />
            <WhyNecessary />
            <News />
            <DemoPreview />
            <Footer />
            </>
    )
};
export default MainPage;