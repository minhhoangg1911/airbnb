import React, { useState } from "react";
import "./AddLocation.css";
import { useSelector } from "react-redux";
import { signIn } from "../../../redux/reducers/signInReducer";
import authentication from "../../../api/authentication";
import Detail from "../../Detail/Detail";
export default function AddLocation(props) {
  const [id, setId] = useState("");
  const [addLocation, setAddLocation] = useState({ hinhAnh: "" });

  // const username = useSelector(signIn);
  // const token = username.payload.signInReducer.users.token
  // console.log("username", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await authentication.fetchAddApiLocation(
      addLocation,
      props.token
    );
    alert("Bạn đã thêm địa điểm");

    console.log("data", response);
  };
  const handleAddForm = (e) => {
    const { name, value } = e.target;
    setAddLocation((prev) => {
      return { ...prev, [name]: value };
    });
  };
  console.log("addLocation", addLocation);
  return (
    <div className="add-location">
      <div className="add-header">
        <i className="fa-brands fa-airbnb"></i>
        <span>airbnb</span>
      </div>
      <h2 className="add-location-title">Thêm địa điểm</h2>
      <form className="add-location-form" onSubmit={handleSubmit}>
        <div className="add-location-content">
          <div className="add-location-left">
            <div className="add-location-name">Tên địa danh</div>
            <input
              className="add-location-input"
              name="tenViTri"
              onChange={handleAddForm}
            />
            <div className="add-location-name">Tên địa điểm</div>
            <input
              className="add-location-input"
              name="quocGia"
              onChange={handleAddForm}
            />
            <div>
              <button type="submit" className="add-location-btn">
                Thêm địa điểm
              </button>
            </div>
          </div>
          <div className="add-location-right">
            <div className="add-location-name">Tên địa bàn tỉnh</div>
            <input
              className="add-location-input"
              name="tinhThanh"
              onChange={handleAddForm}
            />
            <div className="add-location-name">Đánh giá</div>
            <input
              className="add-location-input"
              name="danhGia"
              onChange={handleAddForm}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
