import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import data from "./../slider-data.json";

const MainSlider = () => {
  const settings = {
    className: "main_slider center",
    dots: false,
    arrow: false,
    infinite: true,
    centerMode: true,
    centerPadding: "30px",
    // speed: 1000,
    // autoplaySpeed: 2000,
    // autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div className="container_fullwidth container_bg">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div className="main_slider-item">
            <img src={item.image} alt="slide" />
            <div className="main_slider-detail">
              <span className="main_slider-title">{item.description}</span>
              <a href={item.url} className="main_slider-arrow"></a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
