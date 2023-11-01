import React from "react";

function NavbarFooter() {
  return (
    <div className="secondary-menu">
      <ul>
        <li key="menu1">
          <a href="#/privacy-policy">Privacy Policy</a>
        </li>
        <li key="menu2">
          <a href="#/term-of-use">Terms of Use</a>
        </li>
        <li key="menu3">
          <a href="#/sales-and-refunds">Sales and Refunds</a>
        </li>
        <li key="menu4">
          <a href="#/legal">Legal</a>
        </li>
      </ul>
    </div>
  );
}

export default NavbarFooter;
