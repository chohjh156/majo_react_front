import Navbar from "./Navbar";
import Hamburger from "./Hamburger";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ArticleContext } from "../utils/context";
import { BodyScrollContext } from "../utils/context";
function Header({ id }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { page, setPage } = useContext(ArticleContext);
  const { bodyScroll, setBodyScroll } = useContext(BodyScrollContext);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
    setBodyScroll(!bodyScroll);
    document.body.style.overflow = bodyScroll ? "auto" : "hidden";
    if (Object.values(page).includes(true))
      document.body.style.overflow = "hidden";
  };
  const location = useLocation();
  useEffect(() => {
    setHamburgerOpen(false);
  }, [location]);
  // useEffect(() => {
  //   window.addEventListener("scroll", isSticky);
  //   return () => {
  //     window.removeEventListener("scroll", isSticky);
  //   };
  // });
  return (
    <div className="header" id={`${id}`}>
      {/* <div className="container"> */}
      <div className="container_fullwidth">
        <div className="top-navigation-main">
          <div className="logo">
            <a href="/">MajorDom</a>
          </div>

          <div onClick={() => toggleHamburger()}>
            <Hamburger isOpen={hamburgerOpen} />
          </div>
        </div>
        <Navbar />
      </div>
      <style>{`
        .burger .menu-icon:after {
            width: ${hamburgerOpen ? "39px" : "20px !important"};
            background-color: ${hamburgerOpen ? "#fff" : "#eee"};
            opacity: ${hamburgerOpen ? "1" : ".5"};
        }
        .top-menu {
            display: ${hamburgerOpen ? "block !important" : "none"}; 
        }
        `}</style>
    </div>
  );
}

export default Header;
