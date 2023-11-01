import NavbarFooter from "./NavbarFooter";

function Footer({ id }) {
  return (
    <div id={`${id}`} className="container_fullwidth">
      <div className="footer">
        {/* <div className="bottom-navigation-main">
           <div className="logo">
                    <a href="/">majordom</a>
                </div> 
          <div className="social">
            <a href="#" className="github"></a>
            <a href="#" className="kickstarter"></a>
            <a href="#" className="linked_in"></a>
            <a href="#" className="youtube"></a>
            <a href="#" className="instagram"></a>
            <a href="#" className="twitter"></a>
          </div>
        </div> */}
        <div className="bottom-navigation-secondary">
          <div className="copyright">
            Copyright © 2023 Majordom. All rights reserved.
          </div>

          {/* <NavbarFooter /> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
