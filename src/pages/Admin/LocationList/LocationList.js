import React, { useEffect, useRef, useState } from "react";
import "./LocationList.css";
import {
  UploadOutlined,
  StarOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Space, Input, Modal, Button, Pagination, Upload } from "antd";
import { async } from "q";
import authentication from "../../../api/authentication";
import { useSelector } from "react-redux";
import { signIn } from "../../../redux/reducers/signInReducer";

export default function LocationList(props) {
  const [Listlocation, setListLocation] = useState([]);
  const [LocationId, setLocationId] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [judge, setJudge] = useState("");
  const [LocationEdit, setLocationEdit] = useState({});

  // const [locationAddList, setLocationAddList] = useState({ hinhAnh: "" });
  const [search, setSearch] = useState("");
  const [img, setImg] = useState("");
  const [imgEdit, setImgEdit] = useState("");
  const [imgIdEdit, setIdImgEdit] = useState("");
  const { Search } = Input;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalImage, setIsModalImage] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");

  const [child, setChild] = useState(9);

  // const username = useSelector(signIn);
  // const token = username.payload.signInReducer.users.token;
  // console.log("username", token);

  const fileList = [];

  const getListLocation = async () => {
    let response = await authentication.fetchApiLocation();
    setListLocation(response.data.content);
    console.log(Listlocation);
  };

  useEffect(() => {
    getListLocation();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setLocationId(LocationEdit.id);
      setLocation(LocationEdit.tenViTri);
      setProvince(LocationEdit.tinhThanh);
      setCountry(LocationEdit.quocGia);
      setJudge(LocationEdit.judge);
    }
  }, [LocationEdit]);

  useEffect(() => {
    if (isModalImage) {
      setIdImgEdit(img.id);
      setImgEdit(img.hinhAnh);
    }
  }, [img]);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showImage = (item) => {
    setIsModalImage(true);
    setImg(item);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageCancel = () => {
    setIsModalImage(false);
  };

  const handleEditLocation = (item) => {
    setIsModalOpen(true);
    setLocationEdit(item);
  };
  const handleEdit = async () => {
    setIsModalOpen(false);
    let id = LocationId;
    let tenViTri = location;
    let tinhThanh = province;
    let quocGia = country;
    let data = { id, tenViTri, tinhThanh, quocGia, hinhAnh: "", judge: "" };
    console.log("data", data);
    let response = await authentication.fetchEditApiLocation(data, props.token);
    getListLocation();
  };

  const handleFormAddList = (e) => {
    console.log(e.target);
  };

  const handleEditImage = async () => {
    setIsModalImage(false);
    console.log("selectedFile", selectedFile);

    const formData = new FormData();

    formData.append("formFile", selectedFile);

    for (const value of formData.values()) {
      console.log("Value", value);
    }

    let id = imgIdEdit;

    let response = await authentication.fetchPostImgApiLocation(
      id,
      formData,
      props.token
    );
    console.log("response", response);
    getListLocation();
  };

  const handleDeleteLocation = async (item) => {
    let id = item.id;
    console.log(id, props.token);
    const response = await authentication.fetchDeleteApiLocation(
      id,
      props.token
    );
    console.log(response);
    alert("Bạn đã xóa địa điểm");
    getListLocation();
  };

  const handleDetail = async (item) => {
    let id = item.id;
    console.log(item.id);
    props.parentCallback({ child, id });
  };

  return (
    <div className="location-list">
      <h2>Quản lý vị trí</h2>
      <Search
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>Địa danh</th>
              <th>Địa bàn tỉnh</th>
              <th>Địa điểm</th>
              <th>Hình ảnh</th>
              <th>Đánh giá</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Listlocation?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.tenViTri.toLowerCase().includes(search);
            }).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.tenViTri}</td>
                  <td>{item.tinhThanh}</td>

                  <td>{item.quocGia}</td>
                  <td className="image-change">
                    <img className="location-image" src={item.hinhAnh} />
                    <div className="image-icon">
                      <button onClick={() => showImage(item)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="location-judge">
                      <div>0.4</div>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </td>

                  <td>
                    <Button
                      className="btn-edit"
                      type="none"
                      onClick={() => handleEditLocation(item)}
                    >
                      Sửa
                    </Button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteLocation(item)}
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => handleDetail(item)}
                      className="btn-detail"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
            <Modal open={isModalImage} onCancel={handleImageCancel}>
              <h2>Form sửa ảnh</h2>
              <div>* Id</div>
              <input disabled value={imgIdEdit} />
              <div className="image-title">Hình ảnh</div>

              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                defaultFileList={[...fileList]}
                className="upload-list-inline"
                // onChange={(data)=> setSelectedFile(data.file)}
                beforeUpload={(file, fileList) => {
                  setSelectedFile(file);

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

            <Modal open={isModalOpen} onCancel={handleCancel}>
              <h2>Sửa thông tin người dùng</h2>
              <div className="edit-room-list">
                <div className="edit-room-title"> * Id</div>
                <input
                  className="edit-room-input"
                  value={LocationId}
                  onChange={(e) => setLocationId(e.target.value)}
                />
                <div className="edit-room-title"> * Tên địa danh</div>
                <input
                  className="edit-room-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="edit-room-title"> * Địa bàn tỉnh</div>
                <input
                  className="edit-room-input"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
                <div className="edit-room-title"> * Quốc gia</div>
                <input
                  className="edit-room-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <div className="edit-room-title"> * Đánh giá</div>
                <Space direction="vertical" size="middle">
                  <Space.Compact
                    style={{
                      width: "100%",
                    }}
                  >
                    <Input
                      value={judge}
                      onChange={(e) => setJudge(e.target.value)}
                    />
                    <Button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#ffd216",
                      }}
                      type="primary"
                    >
                      <StarOutlined />
                    </Button>
                  </Space.Compact>
                </Space>
              </div>

              <div className="handle">
                <button onClick={handleCancel}>Hủy</button>
                <button className="btn-edit" onClick={handleEdit}>
                  Sửa
                </button>
              </div>
            </Modal>
            <Pagination defaultCurrent={1} total={50} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
