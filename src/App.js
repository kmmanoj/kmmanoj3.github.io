import { useState } from "react";
import { Container, Tab } from "semantic-ui-react";

import Introduction from "./components/Introduction.js";
import Experience from "./components/Experience.js";
import Work from "./components/Work.js";
import SiteFooter from "./components/SiteFooter.js";
import SiteHeader from "./components/SiteHeader.js";

import "semantic-ui-css/semantic.min.css";

function getLastActiveIndex() {
    let index = localStorage.getItem("activeIndex");
    return index || 0;
}

function setLastActiveIndex(e, data) {
    let activeIndex = data.activeIndex;
    localStorage.setItem("activeIndex", activeIndex);
}

export default function App() {
    let [activeIndex, setActiveIndex] = useState(getLastActiveIndex());

    let panes = [
        {
            menuItem: "Experience",
            render: () => <Experience />
        },
        {
            menuItem: "Work",
            render: () => <Work />
        }
    ];

    return (
        <div>
            <SiteHeader />
            <Introduction />
            <Container text fluid>
                <Tab 
                    menu={{ secondary: true }} 
                    panes={panes} 
                    onTabChange={(e, data) => { 
                        setActiveIndex(data.activeIndex); 
                        setLastActiveIndex(e, data); 
                    }} 
                    activeIndex={activeIndex}
                />
            </Container>
            <SiteFooter />
        </div>
    );
}           