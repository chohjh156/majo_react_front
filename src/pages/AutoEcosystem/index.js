import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const AutoEcosystem = () => {
  return (
    <div className="detail-sidebar__page">
      <DetailSidebar
        id={data[1].id}
        title={data[1].title}
        subtitle={data[1].subtitle}
        title_style="ecosystem__title"
        logo={data[1].detailSidebarImage}
        content={data[1].content}
      />
    </div>
  );
};

export default AutoEcosystem;
