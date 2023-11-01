import { useState, useEffect, useContext } from "react";
import TopBanner from "../components/TopBanner";
import MainSlider from "../components/MainSlider";
import Article from "../components/Article";

import { Fragment } from "react";
import TrueAutomation from "./TrueAutomation";
import Privacy from "./Privacy";
import Merlin from "./Merlin";
import Integration from "./Integration";
import Archie from "./Archie";
import AutoEcosystem from "./AutoEcosystem";
import Security from "./Security";
import OpenSource from "./OpenSource";

import { ArticleContext } from "../utils/context";
import ContactForm from "../components/ContactForm";
function Home() {
  const { page, setPage } = useContext(ArticleContext);
  return (
    <div>
      <div>
        <TopBanner />
        <ContactForm />
        <MainSlider />
        <Article />
      </div>
      <div className="detail-sidebar">
        <div id="true-automation" className="detail-sidebar__show">
          <TrueAutomation />
        </div>
        <div className="detail-sidebar__show" id="privacy">
          <Privacy />
        </div>
        <div className="detail-sidebar__show" id="merlin">
          <Merlin />
        </div>
        <div className="detail-sidebar__show" id="integration">
          <Integration />
        </div>
        <div className="detail-sidebar__show" id="autonomous-ecosystem">
          <AutoEcosystem />
        </div>
        <div className="detail-sidebar__show" id="security">
          <Security />
        </div>
        <div className="detail-sidebar__show" id="archie">
          <Archie />
        </div>
        <div className="detail-sidebar__show" id="open-source">
          <OpenSource />
        </div>
      </div>
    </div>
  );
}
export default Home;
