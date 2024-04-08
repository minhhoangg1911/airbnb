import React, { useEffect, useState } from "react";
import "./RoomList.css";
import { UploadOutlined } from "@ant-design/icons";
import { Space, Input, Modal, Button, Pagination, Upload } from "antd";
import authentication from "../../../api/authentication";
export default function RoomList(props) {
  const { Search } = Input;

  const [isModalImage, setIsModalImage] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [search, setSearch] = useState("");

  const showImage = () => {
    setIsModalImage(true);
  };

  const handleImageCancel = () => {
    setIsModalImage(false);
  };

  const handleEditImage = () => {
    setIsModalImage(false);
  };

  const fileList = [
    // {
    //   uid: '-1',
    //   name: 'yyy.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ];

  const getApiRoom = async () => {
    let response = await authentication.fetchListRoom();
    setListRoom(response.data.content);
    // console.log(response.data.content)
  };
  useEffect(() => {
    getApiRoom();
  }, []);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handleDeleteRoom = async (item) => {
    console.log(item);
    let id = item.id;
    let response = await authentication.fetchDeleteListRoom(id, props.token);
    alert("Xóa thành công");
    console.log(response);
    getApiRoom();
  };

  return (
    <div className="room-list">
      <h2>Quản lý thông tin phòng</h2>
      <Search
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <table>
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Hình ảnh</th>
              <th>Địa danh</th>
              <th>guests Max</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listRoom
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.tenPhong.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.tenPhong}</td>

                    <td className="image-change">
                      <img className="location-image" src={item.hinhAnh} />
                      <div className="image-icon">
                        <button onClick={showImage}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                      </div>
                    </td>
                    <td>Việt Nam</td>
                    <td>
                      <div className="room-list-judge">
                        <div>{item.khach}</div>
                        <i className="fa-solid fa-person"></i>
                      </div>
                    </td>

                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteRoom(item)}
                      >
                        Xóa
                      </button>
                      <button className="btn-detail">Chi tiết</button>
                    </td>
                  </tr>
                );
              })}
            {/* <tr>
              <td>1</td>
              <td>Hải Quan</td>

              <td className="image-change">
                <img
                  className="location-image"
                  src="https://cdn.tgdd.vn/Files/2021/06/28/1363875/kham-pha-10-dia-diem-du-lich-hap-dan-tai-an-giang-thu-hut-du-khach-202106281518155043.jpg"
                />
                <div className="image-icon">
                  <button onClick={showImage}>
                 
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <Modal open={isModalImage} onCancel={handleImageCancel}>
                    <h2>Form sửa ảnh</h2>
                    <div>* Id</div>
                    <input />
                    <div className="image-title">Hình ảnh</div>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture"
                      defaultFileList={[...fileList]}
                      className="upload-list-inline"
                    >
                      <Button icon={<UploadOutlined />}>Upload ảnh</Button>
                    </Upload>

                    <div className="handle">
                      <button
                        className="btn-cancel"
                        onClick={handleImageCancel}
                      >
                        Hủy
                      </button>
                      <button className="btn-detail" onClick={handleEditImage}>
                        Sửa ảnh
                      </button>
                    </div>
                  </Modal>
                </div>
              </td>
              <td>Việt Nam</td>
              <td>
                <div className="room-list-judge">
                  <div>5</div>
                  <i className="fa-solid fa-person"></i>
                </div>
              </td>

              <td>
                <button className="btn-delete">Xóa</button>
                <button className="btn-detail">Chi tiết</button>
              </td>
            </tr> */}
            <Modal open={isModalImage} onCancel={handleImageCancel}>
              <h2>Form sửa ảnh</h2>
              <div>* Id</div>
              <input />
              <div className="image-title">Hình ảnh</div>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                defaultFileList={[...fileList]}
                className="upload-list-inline"
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
            <Pagination defaultCurrent={1} total={50} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
