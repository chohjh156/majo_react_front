import React, { useContext } from "react";
import { ArticleContext } from "../utils/context";
import { BodyScrollContext } from "../utils/context";
import { BodyPosContext } from "../utils/context";
function ArticleSingle(props) {
  const { page, setPage } = useContext(ArticleContext);
  const { bodyScroll, setBodyScroll } = useContext(BodyScrollContext);
  const { bodyPos, setBodyPos } = useContext(BodyPosContext);
  const handleClick = () => {
    const temp = {};
    document.getElementById(`${props.item.id}`).style.left = "0";
    temp[props.item.id] = true;
    setPage(temp);
    setBodyScroll(!bodyScroll);
    setBodyPos(window.scrollY);
    document.body.style.overflow = bodyScroll ? "initial" : "hidden";
    document.body.style.touchAction = "none";
    document.getElementById("land-header").style.borderBottom =
      "1px solid #999";
    setTimeout(() => {
      document.body.style.position = "fixed";
    }, 250);
  };
  return (
    <div id={`item-${props.index}`} className="item-child">
      <div className="product_item">
        <div className="product_img">
          <img src={props.item.landingImage} />
        </div>
        <span className="article_title">
          <span>{props.item.title}</span>
          {props.item.dectitle && (
            <span className="article_dectitle"> {props.item.dectitle}</span>
          )}
        </span>
        <span className="article_subtitle">{props.item.subtitle}</span>
        <div className="product_item-detail">
          <a
            className="product_item-arrow item-arrow"
            onClick={() => handleClick()}
          ></a>
        </div>
      </div>
    </div>
  );
}

export default ArticleSingle;

/* <div className="product_bg">
          <img src={props.item.image} alt="" width="100%" height="auto" />
        </div> */
