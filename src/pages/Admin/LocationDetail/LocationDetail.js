import React from "react";
import "./LocationDetail.css";
export default function LocationDetail(props) {
  console.log(props);

  return (
    <div className="location-detail">
      <div className="location-content">
        <div className="location-left">
          <div className="location-title">
            <h2>{props.ListlocationInfo.tenPhong}</h2>
          </div>
          <div className="location-name">An Giang</div>
          <div className="locaiton-description">
            <span className="description">{props.ListlocationInfo.moTa}</span>
          </div>
          <div className="location-title">
            <h2>Tiện nghi</h2>
          </div>
          <div className="location-convenient">
            <div className="convenient-left">
            {/* <div className="convenient-item">
                <i className="fa-solid fa-wifi"></i>
                <span>Wifi</span>
              </div> */}
              {props.ListlocationInfo.wifi ? (
                <div className="convenient-item">
                  <i className="fa-solid fa-wifi"></i>
                  <span>Wifi</span>
                </div>
              ) : (
                ""
              )}
              <div className="convenient-item">
                <i className="fa-solid fa-dumbbell"></i>
                <span>Phòng tập gym</span>
              </div>
              <div className="convenient-item">
                <i className="fa-solid fa-hot-tub-person"></i>
                <span>Bồn nước nóng</span>
              </div>
              <div className="convenient-item">
                <i className="fa-solid fa-baby-carriage"></i>
                <span>Lò sưởi trong nhà</span>
              </div>
              <div className="convenient-item">
                <i className="fa-solid fa-tv"></i>
                <span>TV truyền hình cáp</span>
              </div>
            </div>
            <div className="convenient-right">
              <div className="convenient-item">
                <i className="fa-solid fa-utensils"></i>
                <span>Bếp</span>
              </div>
              <div className="convenient-item">
                <i className="fa-solid fa-ear-deaf"></i>
                <span>Hệ thống sưởi</span>
              </div>
              <div className="convenient-item">
                <i className="fa-solid fa-water-ladder"></i>
                <span>Hồ bơi</span>
              </div>
              <div className="convenient-item">
                <i className="fa-regular fa-hard-drive"></i>
                <span>Máy sấy</span>
              </div>
              <div className="convenient-item">
                <i className="fa-solid fa-elevator"></i>
                <span>Thang máy</span>
              </div>
            </div>
          </div>
          <div className="location-title">
            <h2>Các phòng</h2>
          </div>
          <div className="location-room">
            <div className="location-room-item">
              <i className="fa-solid fa-bed"></i>
              <span>Phòng ngủ: {props.ListlocationInfo.phongNgu} phòng</span>
            </div>
            <div className="location-room-item">
              <i className="fa-solid fa-bath"></i>
              <span>Phòng tắm: {props.ListlocationInfo.phongTam} phòng</span>
            </div>
          </div>
        </div>
        <div className="location-right">
          <img
            className="location-info-image"
            src={props.ListlocationInfo.hinhAnh}
          />
        </div>
      </div>
    </div>
  );
}
