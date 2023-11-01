import React from "react";
import ArticleSingle from "./ArticleSingle";

import data from "./../article-data.json";

function Article() {
  return (
    <div className="container">
      <div className="product-grid">
        {data.map((item, index) => {
          return <ArticleSingle index={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Article;
