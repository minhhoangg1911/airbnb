import React, { useEffect, useState } from "react";
import "./ListUser.css";
import {
  UserOutlined,
  EnvironmentOutlined,
  ReconciliationOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Modal,
  Button,
  Pagination,
} from "antd";
import authentication from "../../../api/authentication";
import { async } from "q";
import axios from "axios";

const { Search } = Input;

export default function ListUser() {
  const [listUser, setListUser] = useState([]);
  const [userEdit, setUserEdit] = useState({});
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAdress, setUserAdress] = useState("");
  const [userType, setUserType] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userDate, setUserDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getListUser();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setUserId(userEdit.id);
      setUserName(userEdit.name);
      setUserPhone(userEdit.phone);
      setUserEmail(userEdit.email);
      setUserDate(userEdit.birthday);
      setUserGender(userEdit.gender);
      setUserType(userEdit.role);
    }
  }, [userEdit]);

  const getListUser = async () => {
    const response = await authentication.fetchApiUser();
    setListUser(response.data.content);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    setIsModalOpen(false);
    let name = userName;
    let email = userEmail;
    let id = userId;
    let role = userType;
    let gender = userGender;
    let data = { id, name, email, role, gender };
    console.log(data);
    let response = await authentication.fetchPutApiUser(data);
    getListUser();
  };
  const handleDeleteUser = async (item) => {
    let id = item.id;
    let response = await authentication.fetchDeleteApiUser(id);
    console.log("id", response);
    alert("Ban đã  xóa User");
    getListUser();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEditUser = (item) => {
    setIsModalOpen(true);
    setUserEdit(item);
  };
  console.log("userType", userType);

  return (
    <div className="list-user">
      <h2>Quản lý thông tin người dùng</h2>
      <Search
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        <table>
          <thead>
            <tr>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Ảnh đại diện</th>
              <th>Số điện thoại</th>
              <th>Loại tài khoản</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listUser
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <img src={item.avatar} />
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <Button
                        className="btn-edit"
                        type="none"
                        onClick={() => handleEditUser(item)}
                      >
                        Sửa
                      </Button>

                      <Button
                        onClick={() => handleDeleteUser(item)}
                        className="btn-delete"
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}

            <Modal open={isModalOpen} onCancel={handleCancel}>
              <h2>Sửa thông tin người dùng</h2>
              <div className="list-user-title">
                <span>id</span>
              </div>
              <input disabled value={userId} />
              <div className="list-user-title">
                <span>Tên người dùng</span>
              </div>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <div className="list-user-title">
                <span>Số điện thoại</span>
              </div>
              <input value={userPhone} />
              <div className="list-user-title">
                <span>Email</span>
              </div>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <div className="list-user-title">
                <span>Địa chỉ</span>
              </div>
              <input value={userAdress} />
              <div className="list-user-title">
                <span>Loại người dùng</span>
              </div>

              <select
                className="list-user-title"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <div className="list-user-title">
                <span>Giới tính</span>
              </div>
              <select
                className="list-user-title"
                value={userGender}
                onChange={(e) => setUserGender(e.target.value)}
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
              <div className="list-user-title">
                <span>Ngày sinh</span>
              </div>
              <input type="date" className="birth-date" value={userDate} />
              <div className="handle">
                <button onClick={handleCancel}>Hủy</button>
                <button className="btn-edit" onClick={handleEdit}>
                  Sửa
                </button>
              </div>
            </Modal>
            <Pagination pageSize={1} defaultCurrent={1} total={10} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
