import majordom_img from ".././images/top_img.png";

function TopBanner() {
  const handleClick = () => {
    document.getElementsByClassName("form")[0].style.display = "flex";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    setTimeout(() => {
      document.body.style.position = "fixed";
    }, 300);
  };
  return (
    <>
      <div className="container_dark_bg">
        <div className="container ">
          <div className="main_section">
            <div className="main_section-text">
              <h1>Your Digital Majordomo</h1>
              <p>
                designed to turn your living space into a smart and automated
                home.
              </p>
              <a className="purple_btn" onClick={() => handleClick()}>
                Get Early Access
              </a>
            </div>
            <div className="main_section-image">
              <img src={majordom_img} alt="majordom" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBanner;
