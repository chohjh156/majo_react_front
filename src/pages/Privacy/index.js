import * as React from "react";
import data from "../../article-data.json";

import DetailSidebar from "../../components/DetailSidebar";
import Header from "../../components/Header";
const Privacy = () => {
  return (
    <div className="detail-sidebar__page">
      <DetailSidebar
        id={data[4].id}
        title={data[4].title}
        subtitle={data[4].description}
        title_style="privacy__title"
        logo={data[4].detailSidebarImage}
        content={data[4].content}
        content_image={data[4].content_image}
      />
    </div>
  );
};

export default Privacy;
