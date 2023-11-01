import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  Component,
} from "react";
import { ArticleContext, BodyPosContext } from "../../utils/context";
import { BodyScrollContext } from "../../utils/context";
export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) {
          return;
        }
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          el.scrollLeft += e.deltaX;
        }
        el.scrollTo({ left: el.scrollLeft + e.deltaY });
      };
      el.addEventListener("wheel", onWheel);
      return () => el?.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
const DetailSidebar = ({
  id,
  title,
  title_style,
  subtitle,
  logo,
  content,
  content_image,
}) => {
  const barRef = useRef(null);
  const componentRef = useHorizontalScroll();
  const progressBarRef = useRef(null);
  const { page, setPage } = useContext(ArticleContext);
  const { bodyScroll, setBodyScroll } = useContext(BodyScrollContext);
  const { bodyPos, setBodyPos } = useContext(BodyPosContext);

  const topContentElements = [];
  const bottomContentElements = [];
  const [scrollState, setScrollState] = useState("0%");

  const baseURL = window.location.origin;

  const handleResize = () => {
    progressBarRef.current.style.width =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";
    if (componentRef.current.scrollWidth == componentRef.current.clientWidth)
      progressBarRef.current.style.width = "100%";
  };
  const handleKeydown = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      if (Object.values(page).includes(true)) handleClose();
    }
  };
  const handleBottomScroll = () => {
    const temp =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";
    setScrollState(temp);
  };
  const handleClose = () => {
    const temp = {};
    document.getElementById(`${id}`).style.left = "100%";
    document.body.style.touchAction = "auto";
    document.body.style.overflow = bodyScroll ? "initial" : "hidden";
    document.body.style.position = "relative";
    window.scrollTo(0, bodyPos);
    document.getElementById("land-header").style.borderBottom = "0px #999";
    setBodyScroll(!bodyScroll);
    temp[`${title}`] = false;
    setPage({ ...temp });
    setTimeout(() => {
      componentRef.current.scrollLeft = 0;
      progressBarRef.current.style.width = 0;
    }, 250);
  };

  for (let i = 0; i < content.length; i++) {
    if (i <= content.length / 2)
      topContentElements.push(
        <div className="mainbar__container">
          <h2 className="">{content[i].title}</h2>
          <p className="">{content[i].description}</p>
          {content[i].button && (
            <a href="" className="purple_btn">
              {content[i].button}
            </a>
          )}
        </div>
      );
    else
      bottomContentElements.push(
        <div className="mainbar__container">
          <h2>{content[i].title}</h2>
          <p>{content[i].description}</p>
          {content[i].button && (
            <a href="" className="purple_btn">
              {content[i].button}
            </a>
          )}
        </div>
      );
  }

  useEffect(() => {
    const rect = barRef.current.getBoundingClientRect();
    progressBarRef.current.style.width =
      (componentRef.current.scrollLeft /
        (componentRef.current.scrollWidth - componentRef.current.clientWidth)) *
        100 +
      "%";
    if (componentRef.current.scrollWidth == componentRef.current.clientWidth)
      progressBarRef.current.style.width = "100%";
    componentRef.current.addEventListener("scroll", handleBottomScroll);
    !Object.values(page).includes(true) &&
      window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      componentRef.current.removeEventListener("scroll", handleBottomScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [page]);

  return (
    <div className="detail-sidebar__container">
      <div ref={componentRef} className="detail-sidebar__content">
        <div
          id="mainbar"
          className={`mainbar ${
            title == "Privacy First" && "privacy__container"
          }`}
          ref={barRef}
        >
          <div
            className={`mainbar-content  ${
              title == "Privacy First" && "privacy__flex"
            } ${content_image && "gap-100"}`}
          >
            <div
              className={`logo-content__container ${
                title == "Privacy First" && "privacy__center"
              } ${title == "Open source" && "opensource"} ${
                title == "A.R.C.H.I.E" && "archie"
              } ${title == "Merlin" && "merlin"} ${
                title == "Ultimate Security" && "security"
              } ${title == "True Automation" && "trueautomation"} ${
                title == "Autonomous Ecosystem" && "ecosystem"
              }`}
            >
              {title && title != "Merlin" && (
                <p className={`article_text ${title_style}`}>{title}</p>
              )}
              {logo && title != "Privacy First" && (
                <img src={logo} width="originalWidth" height="originalHeight" />
              )}
              {subtitle && (
                <div
                  id={`${title == "Privacy First" && "privacy_subtitle"}`}
                  className="subtitle"
                >
                  {subtitle}
                </div>
              )}
            </div>
            <div
              className={`features ${
                title == "Privacy First" && "privacy-feature"
              }`}
            >
              <div
                className={`features__container ${
                  bottomContentElements.length == 0 && "no-gap"
                }`}
              >
                <div className="features">{topContentElements}</div>
                <div className="features">{bottomContentElements}</div>
              </div>
              {content_image && (
                <div className="features__img">
                  <img src={content_image} width="100%" height="100%" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="slidebar">
        <div className="slide">
          <div className="scroll_2"></div>
          <div
            ref={progressBarRef}
            className="scroll__thumb"
            style={{ width: `${scrollState}` }}
          ></div>
        </div>
        {Object.values(page).includes(true) ? (
          <button onClick={() => handleClose()}>
            <img
              src={`${baseURL}/images/close.svg`}
              alt="not found"
              width={40}
              height={40}
            />
          </button>
        ) : (
          <a href="/">
            <img
              src={`${baseURL}/images/close.svg`}
              alt="not found"
              width={40}
              height={40}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default DetailSidebar;
