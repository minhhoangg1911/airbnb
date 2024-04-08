import React, { useEffect, useState } from "react";
import "./RoomImage.css";
import authentication from "../../api/authentication";
import { useParams } from "react-router-dom";
export default function RoomImage(props) {
  return (
    <div className="Room-img">
      <div className="title-content">
        <div className="title">
          <i className="fa-brands fa-autoprefixer"></i>
          <h1>{props.listRoomDetail.tenPhong}</h1>
        </div>
        <div className="judge-content">
          <div className="judge">
            <i className="fa-solid fa-star"></i>
            <span>4,88</span>
            <span>.</span>
            <a href="">162 Đánh giá</a>
            <span>.</span>
            <a href="#">Torino, Piemonte, Italy</a>
          </div>
          <div className="share">
            <div>
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
              <a href="#">Chia sẻ</a>
            </div>
            <div>
              <i className="fa-regular fa-heart"></i>
              <a href="#">Lưu</a>
            </div>
          </div>
        </div>
      </div>

      <div className="img-rent">
        <div className="img-item ">
          <img src={props.listRoomDetail.hinhAnh} />
        </div>
      </div>
    </div>
  );
}
