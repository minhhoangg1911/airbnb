import React from "react";
import "./style.css";
import { Col, Divider, Row, Button } from "antd";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import authentication from "../../api/authentication";
import { useListRoom } from "../../hooks/useListRoom";
import LoadMore from "../LoadMore/LoadMore";
import { Link } from "react-router-dom";

export default function ListRoom(props) {


  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <i
        className="fa-solid fa-chevron-right slick-right"
        onClick={onClick}
      ></i>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <i className="fa-solid fa-chevron-left slick-left" onClick={onClick}></i>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="carousel-page">
      <div className="carousel-content">
        {props.listRoom.slice(0, props.visible).map((item, index) => {
          return (
            <Link className='carousel-link' key={index} to={`/detail/${item.id}`}>
              <div  className="carousel">
                <Slider {...settings}>
                  <div>
                    <img src={item.hinhAnh} />
                  </div>
                  <div>
                    <img src={item.hinhAnh} />
                  </div>
                  <div>
                    <img src={item.hinhAnh} />
                  </div>
                </Slider>
                <div className="sale">
                  <div className="favourite">
                    <h3 className="title">{item.tenPhong}</h3>
                    <div className="carousel-judge">
                      <i className="fa-solid fa-star"></i>
                      <span>4,87</span>
                    </div>
                  </div>
                  <div className="distance">Cách 2.603 km</div>
                  <div className="carousel-date">
                    Ngày 25 - Ngày 30 tháng 11
                  </div>
                  <div className="price">
                    ${item.giaTien} / &nbsp; <span>Đêm</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <LoadMore showLoadMore={props.showLoadMore} />
    </div>
  );
}
