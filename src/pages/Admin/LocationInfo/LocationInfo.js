import React, { useEffect, useState } from "react";
import "./LocationInfo.css";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Modal, Button, Pagination, Upload, Switch, Space } from "antd";
import authentication from "../../../api/authentication";

export default function LocationInfo(props) {
  const { Search } = Input;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalImage, setIsModalImage] = useState(false);

  const [addRoom, setAddRoom] = useState(false);
  const [roomLocationInfo, setRoomLocationInFo] = useState({});

  const [locationInfo, setLocationInfo] = useState({});
  const [idProvince, setIdProvince] = useState("");
  const [idLocation, setIdLocation] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [price, setPrice] = useState(0);
  const [elevator, setElevator] = useState("");
  const [hot, setHot] = useState("");
  const [pool, setPool] = useState("");
  const [heater, setHeater] = useState("");
  const [dryer, setDryer] = useState("");
  const [gym, setGym] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [wifiRoom, setWifiRoom] = useState(true);
  const [heatingSystem, setHeatingSystem] = useState("");
  const [cableTelevision, setCableTelevision] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [img, setImg] = useState({});
  const [imgEdit, setImgEdit] = useState("");
  const [idImgEdit, setIdImgEdit] = useState("");
  const [child, setChild] = useState(10);
  const [search, setSearch] = useState("");

  console.log("Location", locationInfo);
  console.log(child);
  useEffect(() => {
    if (isModalOpen) {
      console.log("locationInfo", locationInfo);
      setIdLocation(locationInfo.maViTri);
      setIdProvince(locationInfo.id);
      setName(locationInfo.tenPhong);
      setDescription(locationInfo.moTa);
      setClient(locationInfo.khach);
      setBathroom(locationInfo.phongTam);
      setBedroom(locationInfo.phongNgu);
      setPrice(locationInfo.giaTien);
    }
  }, [locationInfo]);

  useEffect(() => {
    if (isModalImage) {
      setIdImgEdit(img.id);
      setImgEdit(img.hinhAnh);
    }
  }, [img]);

  const handleEditInfo = (item) => {
    setIsModalOpen(true);
    setLocationInfo(item);
  };

  const showImage = (item) => {
    setIsModalImage(true);
    setImg(item);
    console.log(item);
  };
  const showRoom = () => {
    setAddRoom(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleImageCancel = () => {
    setIsModalImage(false);
  };

  const handleEditImage = async () => {
    setIsModalImage(false);
    console.log(selectedFile);

    const formData = new FormData();

    formData.append("formFile", selectedFile);

    let id = idImgEdit;

    console.log(id, formData, props.token);

    let response = await authentication.fetchPostImgRoomDetail(
      id,
      formData,
      props.token
    );
    props.parentCallbackImg(response.data.content);
    console.log(response.data.content);
  };

  const handleCancelRoom = () => {
    setAddRoom(false);
  };

  const onChange = (checked) => {
    console.log("ok", checked);
  };
  const handleAddRoom = async () => {
    setAddRoom(false);
    let id = idProvince;
    let tenPhong = name;
    let khach = client;
    let phongNgu = bedroom;
    let giuong = client;
    let phongTam = bathroom;
    let moTa = description;
    let giaTien = price;
    let mayGiat = true;
    let banLa = true;
    let tivi = true;
    let wifi = wifiRoom;
    let bep = true;
    let doXe = true;
    let hoBoi = true;
    let banUi = true;
    let maViTri = props.id;
    let hinhAnh = "";

    let data = {
      id,
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongNgu,
      phongTam,
      moTa,
      banLa,
      tivi,
      mayGiat,
      bep,
      doXe,
      hoBoi,
      banUi,
      maViTri,
      giaTien,
      wifi,
      hinhAnh,
    };
    console.log("data", data);
    const response = await authentication.fetchPostListRoom(data, props.token);
    props.parentCallbackList();
    console.log(response);
    alert("Thêm mới thành công");
    console.log(response);
  };

  const handleEdit = async () => {
    setIsModalOpen(false);
    let maViTri = idLocation;
    let id = idProvince;
    let tenPhong = name;
    let khach = client;
    let phongNgu = bedroom;
    let phongTam = bathroom;
    let moTa = description;
    let giaTien = price;
    let mayGiat = true;
    let giuong = 0;
    let banLa = true;
    let wifi = wifiRoom;
    let bep = true;
    let doXe = true;
    let hoBoi = true;
    let banUi = true;
    let hinhAnh = "";
    let data = {
      id,
      maViTri,
      tenPhong,
      khach,
      phongNgu,
      phongTam,
      moTa,
      giaTien,
      mayGiat,
      giuong,
      banLa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      hinhAnh,
    };

    let response = await authentication.fetchPutRoomDetail(
      data,
      id,
      props.token
    );
    props.parentCallbackEdit();
    console.log(response);
  };

  const handleDeleteRoom = async (item) => {
    console.log(item);
    let id = item.id;
    let response = await authentication.fetchDeleteListRoom(id, props.token);
    props.parentCallbackDelete();

    alert("Xóa thành công");
    console.log(id, props.token);
  };

  const handleDetailRoom = (item) => {
    console.log(item);
    let id = item.id;
    props.parentcallBackInfoDetail({ child, id });
    console.log(child);
  };

  const fileList = [];

  const handleAddFormLocationInfo = (e) => {
    console.log(e);
  };

  return (
    <div className="location-info">
      <h2>Danh sách Phòng của địa danh</h2>
      <div className="location-info-search">
        <Space direction="vertical" size="middle">
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button type="primary">
              <SearchOutlined />
            </Button>
          </Space.Compact>
        </Space>
        <button onClick={() => showRoom()}>Thêm phòng</button>
      </div>

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
            {props?.ListLocationDetail?.filter((item) => {
              return search.toLowerCase() == ""
                ? item
                : item.tenPhong.toLowerCase().includes(search);
            })?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.tenPhong}</td>

                  <td className="image-change">
                    <img className="location-image" src={item.hinhAnh} />
                    <div className="image-icon">
                      <button onClick={() => showImage(item)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </div>
                  </td>
                  <td>Long Xuyen 1</td>
                  <td>
                    <div className="location-judge">
                      <div>{item.khach}</div>
                      <i className="fa-solid fa-person"></i>
                    </div>
                  </td>
                  <td>
                    <Button
                      className="btn-edit"
                      type="none"
                      onClick={() => handleEditInfo(item)}
                    >
                      Sửa
                    </Button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteRoom(item)}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn-detail"
                      onClick={() => handleDetailRoom(item)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}

            <Modal open={addRoom} onCancel={handleCancelRoom}>
              <h2>Thêm phòng</h2>
              <div className="location-add-room">
                <div className="location-add-left">
                  <div className="location-add-room-title">* Id địa danh</div>
                  <input
                     onChange={(e) => setIdProvince(e.target.value)}
                    name="id"
                    // onChange={handleAddFormLocationInfo}
                  />
                  <div className="location-add-room-title">* Mô tả</div>
                  <input
                    className="input-range"
                    onChange={(e) => setDescription(e.target.value)}
                    name="moTa"
                    // onChange={handleAddFormLocationInfo}
                  />
                  <div className="location-add-room-title">
                    * Số lượng phòng ngủ
                  </div>
                  <input
                    className="input-range"
                    onChange={(e) => setBedroom(e.target.value)}
                    name="phongNgu"
                    // onChange={handleAddFormLocationInfo}
                  />
                  <div className="location-add-room-title">* Giá phòng</div>
                  <Space direction="vertical" size="middle">
                    <Space.Compact
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                       onChange={(e) => setPrice(e.target.value)}
                      name="giaTien"
                      // onChange={handleAddFormLocationInfo}
                       />
                      <Button
                        style={{ display: "flex", alignItems: "center" }}
                        type="primary"
                      >
                        VNĐ
                      </Button>
                    </Space.Compact>
                  </Space>
                  <div className="edit-room-title">Bồn nước nóng</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setHot(checked)}

                    />
                  </div>
                  <div className="edit-room-title">Lò sưởi trong nhà</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setHeater(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Phòng gym</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setGym(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Wifi</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setWifiRoom(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Truyền hình cáp</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setCableTelevision(checked)}
                    />
                  </div>
                </div>
                <div className="location-add-right">
                  <div className="location-add-room-title">* Tên phòng</div>
                  <input
                   onChange={(e) => setName(e.target.value)}
                  name="tenPhong"
                  // onChange={handleAddFormLocationInfo}
                  />
                  <div className="location-add-room-title">
                    * Số lượng khách
                  </div>
                  <input
                    className="input-range"
                    onChange={(e) => setClient(e.target.value)}
                    name="Khach"
                    // onChange={handleAddFormLocationInfo}
                  />
                  <div className="location-add-room-title">
                    * Số lượng phòng tắm
                  </div>
                  <input
                    className="input-range"
                    onChange={(e) => setBathroom(e.target.value)}
                    name="phongTam"
                    // onChange={handleAddFormLocationInfo}
                  />
                  <div className="edit-room-title">Thang máy</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setElevator(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Hồ bơi</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setPool(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Máy sấy</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setDryer(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Bếp</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setKitchen(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Hệ thống sưởi</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setHeatingSystem(checked)}
                    />
                  </div>
                </div>
              </div>
              <div className="handle">
                <button onClick={handleCancelRoom}>Hủy</button>
                <button className="btn-edit" onClick={handleAddRoom}>
                  Thêm
                </button>
              </div>
            </Modal>

            <Modal open={isModalOpen} onCancel={handleCancel}>
              <h2>Sửa phòng</h2>

              <div className="edit-room">
                <div className="edit-room-left">
                  <div className="edit-room-title">* Id địa danh</div>
                  <input
                    value={idProvince}
                    onChange={(e) => setIdProvince(e.target.value)}
                  />
                  <div className="edit-room-title">* Tên phòng</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="edit-room-title">* Số lượng khách</div>
                  <input
                    className="input-range"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                  <div className="edit-room-title">* Số lượng phòng tắm</div>
                  <input
                    className="input-range"
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
                  />
                  <div className="edit-room-title">Thang máy</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onchange} />
                  </div>
                  <div className="edit-room-title">Hồ bơi</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onchange} />
                  </div>
                  <div className="edit-room-title">Máy sấy</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                  <div className="edit-room-title">Bếp</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                  <div className="edit-room-title">Hệ thống sưởi</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                </div>

                <div className="edit-room-right">
                  <div className="edit-room-title">* Id phòng</div>
                  <input value={idLocation} disabled />
                  <div className="edit-room-title">* Mô tả</div>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="edit-room-title">* Số lượng phòng ngủ</div>
                  <input
                    className="input-range"
                    value={bedroom}
                    onChange={(e) => setBedroom(e.target.value)}
                  />
                  <div className="edit-room-title">* Giá phòng</div>
                  <input
                    className="input-range"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="edit-room-title">Bồn nước nóng</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                  <div className="edit-room-title">Lò sưởi trong nhà</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                  <div className="edit-room-title">Phòng gym</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                  <div className="edit-room-title">Wifi</div>
                  <div className="switch-change">
                    <Switch
                      defaultChecked
                      onChange={(checked) => setWifiRoom(checked)}
                    />
                  </div>
                  <div className="edit-room-title">Truyền hình cáp</div>
                  <div className="switch-change">
                    <Switch defaultChecked onChange={onChange} />
                  </div>
                </div>
              </div>

              <div className="handle">
                <button onClick={handleCancel}>Hủy</button>
                <button className="btn-edit" onClick={handleEdit}>
                  Sửa
                </button>
              </div>
            </Modal>
            <Modal open={isModalImage} onCancel={handleImageCancel}>
              <h2>Form sửa ảnh</h2>
              <div>* Id</div>
              <input value={idImgEdit} disabled />
              <div className="image-title">Hình ảnh</div>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                defaultFileList={[...fileList]}
                className="upload-list-inline"
                // onChange={(data) => setSelectedFile(data.file)}
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
            <Pagination defaultCurrent={1} total={50} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
