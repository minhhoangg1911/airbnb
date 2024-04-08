import React, { useState } from "react";
import "./AddUser.css";
import moment from "moment/moment";
import authentication from "../../../api/authentication";
export default function AddUser() {
  const [addUser, setAddUser] = useState({ name: "", birthday: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await authentication.fetchPostApiUser(addUser);
    alert("Thêm mới thành công");
    console.log("<<< check data", response);
  };

  const handleAddFormUser = (e) => {
    // let value = e.target.value
    // let name = e.target.name
    let { value, name } = e.target;
    setAddUser((addUser) => {
      return { ...addUser, [name]: value };
    });
  };

  console.log(addUser);
  return (
    <div className="add-user">
      <div className="add-header">
        <i className="fa-brands fa-airbnb"></i>
        <span>airbnb</span>
      </div>
      <h2>Thêm Tài Khoản</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="add-left">
          <div>Tên người dùng</div>
          <input
            className="input-field"
            name="name"
            onChange={handleAddFormUser}
          />
          <div>Số điện thoại</div>
          <input
            className="input-field"
            name="phone"
            onChange={handleAddFormUser}
          />
          <div>Địa chỉ</div>
          <input
            className="input-field"
            name="diaChi"
            onChange={handleAddFormUser}
          />
          <div>Giới tính</div>
          <select
            className="input-field"
            name="gender"
            onChange={handleAddFormUser}
          >
            <option>Chưa chọn</option>
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </select>
          <div>
            <button type="submit" className="add-user-btn">
              Tạo tài khoản
            </button>
          </div>
        </div>
        <div className="add-right">
          <div>Email</div>
          <input
            className="input-field"
            name="email"
            onChange={handleAddFormUser}
          />
          <div>Mật khẩu</div>
          <input
            className="input-field"
            name="password"
            onChange={handleAddFormUser}
          />
          <div>Birthday</div>
          <input
            className="input-field"
            placeholder="enter your text"
            type="date"
            name="birthday"
            onChange={handleAddFormUser}
          />
          <div>Loại tài khoản</div>
          <select
            className="input-field"
            name="role"
            onChange={handleAddFormUser}
          >
            <option>Chưa chọn</option>
            <option>USER</option>
            <option>ADMIN</option>
          </select>
        </div>
      </form>
    </div>
  );
}
