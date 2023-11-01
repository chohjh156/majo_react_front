import React, { useEffect } from "react";
import data from "../../blog-data.json";

const Blog = () => {
  const baseURL = window.location.origin;
  useEffect(() => {
    const header_height =
      document.getElementsByClassName("header")[0].clientHeight;
    const footer_height =
      document.getElementsByClassName("footer")[0].clientHeight;

    const temp = window.innerHeight - header_height - footer_height;
    document.getElementsByClassName("blog__container")[0].style.minHeight =
      temp + "px";
  });
  return (
    <div className="blog__container">
      {data.map((item) => (
        <div className="blog-item">
          <a className="blog-item__img" href={`${baseURL}/blog/${item.url}`}>
            <img src={item.bg_url} alt="" />
          </a>
          <span className="blog-item__release">{item.release}</span>
          <a href={`${baseURL}/blog/${item.url}`} className="blog-item__title">
            <div>{item.title}</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Blog;
