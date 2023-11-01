import React, { useContext } from "react";
import { ArticleContext } from "../utils/context";

function Navbar() {
  const { page, setPage } = useContext(ArticleContext);
  return (
    <div className="top-menu">
      <div className="menu-list__wrapper">
        <ul>
          <li>
            <a href="/merlin">
              <span>Merlin</span>
              <img src="/images/arrow-right.svg" />
            </a>
          </li>
          <li>
            <a href="/archie">
              <span>Archie</span>
              <img src="/images/arrow-right.svg" />
            </a>
          </li>
          <li>
            <a href="/blog">
              <span>Blog</span>
              <img src="/images/arrow-right.svg" />
            </a>
          </li>
          <li>
            <a href="/faq">
              <span>FAQ</span>
              <img src="/images/arrow-right.svg" />
            </a>
          </li>
        </ul>
      </div>
      <div className="top-menu__footer">
        <div className="social">
          <a href="#" className="github"></a>
          <a href="#" className="kickstarter"></a>
          <a href="#" className="linked_in"></a>
          <a href="#" className="youtube"></a>
          <a href="#" className="instagram"></a>
          <a href="#" className="twitter"></a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
