import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import { UploadOutlined } from "@ant-design/icons";

import { Space, Input, Modal, Button, Pagination, Upload } from "antd";
import { useSelector } from "react-redux";
import { signIn } from "../../../redux/reducers/signInReducer";
import authentication from "../../../api/authentication";
export default function UserInfo(props) {
  const [isModalImage, setIsModalImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [save, setSave] = useState(true);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [phone, Phone] = useState("");
  const [img, setImg] = useState("");

  // const username = useSelector(signIn);
  // const newUsername = username.payload.signInReducer.users.user;
  // console.log("avatar", newUsername);
  
  const token = JSON.parse(localStorage.getItem("data"));
  console.log("token", token);
  const users = JSON.parse(localStorage.getItem("user"))
  console.log(users);

  useEffect(() => {
    getApiUserId();
  }, []);
  const getApiUserId = async () => {
    let response = await authentication.fetchApiUserId(users.id);
    console.log("fetchApiUserId", response.data.content);
    setImg(response.data.content.avatar);
    setId(response.data.content.id);
    setName(response.data.content.name);
    setGender(response.data.content.gender);
    setBirthDay(response.data.content.birthday);
    setEmail(response.data.content.email);
    Phone(response.data.content.phone);
  };
  console.log(name);

  const showImage = () => {
    setIsModalImage(true);
  };

  const handleImageCancel = () => {
    setIsModalImage(false);
  };

  const handleEditImage = async () => {
    setIsModalImage(false);
    console.log("selectedFile", selectedFile);

    const formData = new FormData();

    formData.append("formFile", selectedFile);

    let response = await authentication.fetchPostApiUserUpload(formData, token);
    console.log("response", response);
    getApiUserId();
  };

  const handleChangeName = () => {
    setSave(false);
  };

  const handleSaveName = (e) => {
    setSave(true);
    let data = { id, name, email, phone, birthday, gender };

    let response = authentication.fetchPutApiUser(data);
    console.log("response", response);
    getApiUserId();
  };

  const fileList = [];

  return (
    <div className="user-info">
      <div className="user-info-left">
        <div className="left-content">
          <div className="left">
            <div className="left-image">
              <img className="image" src={img} />

              <div className="left-image-change">
                <button className="btn-user-info" onClick={showImage}>
                  <span>Cập nhật ảnh</span>
                </button>
                <Modal open={isModalImage} onCancel={handleImageCancel}>
                  <h2>sửa ảnh</h2>
                  <div>* Id</div>
                  <input />
                  <div className="image-title">Hình ảnh</div>
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture"
                    defaultFileList={[...fileList]}
                    className="upload-list-inline"
                    beforeUpload={(file, fileList) => {
                      // Access file content here and do something with it
                      setSelectedFile(file);

                      // Prevent upload
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload ảnh</Button>
                  </Upload>

                  <div className="handle">
                    <button className="btn-cancel" onClick={handleImageCancel}>
                      Hủy
                    </button>
                    <button className="btn-detail" onClick={handleEditImage}>
                      Sửa ảnh
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
            <div>
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="left-security">
              <h2>Xác minh danh tính</h2>
              <span>
                Xác thực danh tính của bạn với huy hiệu xác minh danh tính
              </span>
            </div>
            <button className="left-btn">Huy hiệu</button>
            <hr />
            <div className="left-tick">
              <span className="tick-title">{name} đã xác nhận</span>
              <div className="tick">
                <i className="fa-solid fa-check"></i>
                <span>Địa chỉ email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-info-right">
        <div className="right-content">
          <div className="right">
            <div className="right-name">
              <div className="name">Tên pháp lý</div>
              <div>{/* <span>{name}</span> */}</div>
              <input
                className="input-field-info"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {save ? (
              <div className="right-change" onClick={handleChangeName}>
                Thay đổi
              </div>
            ) : (
              <div className="right-change" onClick={handleSaveName}>
                Lưu
              </div>
            )}
          </div>
          <hr />
          <div className="right">
            <div className="right-name">
              <div className="name">Giới tính</div>
              <div>
                <span>Nam</span>
                {/* <select
                  style={{ outline: "none", border: "none" }}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select> */}
              </div>
              <input className="input-field-info" />
            </div>

            <div className="right-change">Thay đổi</div>
          </div>
          <hr />
          <div className="right">
            <div className="right-name">
              <div className="name">Ngày sinh</div>
              <div>
                <span>{birthday}</span>
              </div>
              <input className="input-field-info" />
            </div>
            <div className="right-change">Thay đổi</div>
          </div>
          <hr />
          <div className="right">
            <div className="right-name">
              <div className="name">Địa chỉ email</div>
              <div>
                <span>{email}</span>
              </div>
              <input className="input-field-info" />
            </div>
            <div className="right-change">Thay đổi</div>
          </div>
          <hr />
          <div className="right">
            <div className="right-name">
              <div className="name">Số điện thoại</div>
              <div>
                <span>{phone}</span>
              </div>
              <input className="input-field-info" />
            </div>
            <div className="right-change">Thay đổi</div>
          </div>
          <hr />
          <div className="right">
            <div className="right-name">
              <div className="name">Địa chỉ</div>
              <div>
                <span>Vinh Ha Long</span>
              </div>
              <input className="input-field-info" />
            </div>
            <div className="right-change">Thay đổi</div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
