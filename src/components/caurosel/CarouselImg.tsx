import { Carousel } from "antd";
import React from "react";
import "./carousel.css";

export const CarouselImg = () => {
  return (
    <Carousel
      autoplay
      style={{ width: "600px", height: "400px", borderRadius: "5px" }}
    >
      <div className="carousel1"></div>
      <div className="carousel2"></div>
      <div className="carousel3"></div>
      <div className="carousel4"></div>
      <div className="carousel5"></div>
      <div className="carousel6"></div>
    </Carousel>
  );
};
