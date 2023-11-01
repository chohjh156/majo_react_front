import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const Archie = () => {
  return (
    <div className="detail-sidebar__page">
      <DetailSidebar
        id={data[3].id}
        title={data[3].title}
        subtitle={data[3].description}
        logo={data[3].detailSidebarImage}
        content={data[3].content}
      />
    </div>
  );
};

export default Archie;
