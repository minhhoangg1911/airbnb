import React, { useEffect, useMemo, useState } from "react";
import "./SearchTab.css";
import { Calendar } from "antd";
import { DatePicker, Space, theme, Input } from "antd";
import dayjs from "dayjs";
import { Button, Divider, Popover, Segmented } from "antd";
import authentication from "../../api/authentication";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchTab(props) {
  const [isActive, setIsActive] = useState(false);
  const [Active, setActive] = useState("");

  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const [location, setLocation] = useState([]);
  const [roomRent, setRoomRent] = useState([]);
  const [filterRoom, setFilterRoom] = useState([]);
  const [id, setId] = useState("");
  let [ngayDen, setNgayDen] = useState("");
  let [ngayDi, setNgayDi] = useState("");
  const [soLuongKhach, setSoLuongKhach] = useState(0);
  const [count, setCount] = useState(0);
  const { token } = theme.useToken();

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const { Search } = Input;

  const dateFormat = "YYYY-MM-DD";

  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter)
      return {
        pointAtCenter: true,
      };
    return showArrow;
  }, [showArrow, arrowAtCenter]);

  const cellRender = React.useCallback((current, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }
    if (typeof current === "number") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  }, []);

  const handleClick = (event) => {
    setIsActive(!isActive);
  };

  const handleOnBlur = () => {
    setActive("");
    setIsActive("");
  };

  const handleClickActive = (id) => {
    setActive(id);
  };

  const handleIncrease = () => {
    if (soLuongKhach < 6) {
      setSoLuongKhach((count) => count + 1);
    }
  };
  const handleDecrease = () => {
    if (soLuongKhach > 0) {
      setSoLuongKhach((count) => count - 1);
    }
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const contents = (
    <div className="search-location">
      <h4>Tìm kiếm theo khu vực</h4>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="small"
        onSearch={onSearch}
      />

      <div className="row">
        {location.map((item, index) => {
          return (
            <div className="col" key={index}>
              <img src={item.hinhAnh} onClick={() => handleTakeId(item)} />
              <h4>
                {item.id} - {item.tenViTri}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );

  const onChangeCheckIn = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    // setNgayDen(dateString);
  };
  const onChangeCheckOut = (value, dateString) => {
    console.log("Selected Time: ", value.format());
    console.log("Formatted Selected Time: ", dateString);
    // setNgayDi(dateString);
  };

  const content = (
    <div>
      <div className="adult">
        <div>
          <h4>Người lớn</h4>
          <span>Từ 13 tuổi trở lên</span>
        </div>
        <div className="btn-button">
          <button onClick={handleDecrease}>-</button>
          <span>{soLuongKhach}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>
      <hr />
      <div className="children">
        <div>
          <h4>Trẻ em</h4>
          <span>Độ tuổi 2 – 12</span>
        </div>
        <div className="btn-button">
          <button>-</button>
          <span>0</span>
          <button>+</button>
        </div>
      </div>
      <hr />
      <div className="baby">
        <div>
          <h4>Em bé</h4>
          <span>Dưới 2 tuổi</span>
        </div>
        <div className="btn-button">
          <button>-</button>
          <span>0</span>
          <button>+</button>
        </div>
      </div>
      <hr />
      <div className="pet">
        <div>
          <h4>Thú cưng</h4>
          <span>Bạn sẽ mang theo động vật phục vụ?</span>
        </div>
        <div className="btn-button">
          <button>-</button>
          <span>0</span>
          <button>+</button>
        </div>
      </div>
      <hr />
    </div>
  );

  useEffect(() => {
    getLocationApi();
    getFilterRentRoom();
  }, []);

  const getLocationApi = async () => {
    let response = await authentication.fetchApiLocation();
    // console.log(response);
    setLocation(response.data.content);
  };

  const getApiRentRoom = async (id) => {
    let response = await authentication.fetchRoomLocationInfo(id);
    setRoomRent(response.data.content);
  };

  const getFilterRentRoom = async () => {
    let reponse = await authentication.fetchApiRoomRent(id);
    setFilterRoom(reponse.data.content);
  };

  const handleTakeId = (item) => {
    setId(item.id);
    getApiRentRoom(item.id);
  };

  const handleSearch = () => {
    let newNgayDen = ngayDen.slice(0, 19);
    let newNgayDi = ngayDi.slice(0, 19);
    let data = { id, newNgayDen, newNgayDi, soLuongKhach };
    console.log("checkData", data);
    console.log("roomRent", roomRent);
    console.log("filterRoom", filterRoom);
    const newRoomRent = roomRent.map((item) => {
      const newfilterId = filterRoom.filter((room) => room.maPhong == item.id);
      return { ...item, roomRents: newfilterId };
    });
    console.log("newRoomRent", newRoomRent);

    const newRoom = newRoomRent.filter((item) => {
      // console.log(item);
      return (
        item.khach == data.soLuongKhach &&
        item.roomRents.some(
          (item) =>
            item.ngayDen == data.newNgayDen && item.ngayDi == data.newNgayDi
        )
      );
    });
    console.log("newRoom", newRoom);
    const rooms = JSON.stringify(newRoom);
    localStorage.setItem("rooms", rooms);
    if (newRoom != "") {
      navigate("/searchlistroom");
    }
  };

  // console.log(roomRent);
  // console.log(id);

  return (
    <div
      className={isActive ? "search-hide" : ""}
      onBlur={handleOnBlur}
      onClick={handleClick}
    >
      <div className="content">
        <div
          className={`location ${Active == 1 ? "Active" : ""}`}
          onClick={() => handleClickActive("1")}
        >
          <div className="location-content">Địa điểm</div>

          <Popover
            placement="bottom"
            content={contents}
            arrow={mergedArrow}
            trigger="click"
          >
            <Button
              onClick={() => handleClickActive("1")}
              type="none"
              className="add-client"
            >
              Tìm kiếm điểm đến
            </Button>
          </Popover>
        </div>
        <span className="space"></span>
        <div className="date-service-reservation">
          {props.location ? (
            <div className="service-reservation">
              <div
                // className="service-client"
                className={`service-client ${Active == 2 ? "Active" : ""} `}
                onClick={() => handleClickActive("2")}
              >
                <div className="service">Nhận phòng</div>
                <div className="service-add-date">
                  <Space size={12} direction="vertical">
                    <DatePicker
                      onClick={() => handleClickActive("2")}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{
                        defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                      }}
                      // onChange={onChangeCheckIn}

                      onChange={(value) => setNgayDen(value.format())}
                      className="date-picker"
                      placeholder="Thêm ngày"
                      cellRender={cellRender}
                    />
                  </Space>
                </div>
              </div>
              <span className="space"></span>
              <div
                className={`reservation-client ${Active == 3 ? "Active" : ""} `}
                onClick={() => handleClickActive("3")}
              >
                <div className="reservation">Trả phòng</div>
                <div className="reservation-add-date">
                  <Space size={12} direction="vertical">
                    <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{
                        defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                      }}
                      // onChange={onChangeCheckOut}
                      onChange={(value) => setNgayDi(value.format())}
                      className="date-picker"
                      placeholder="Thêm ngày"
                      cellRender={cellRender}
                    />
                  </Space>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`date ${Active == 4 ? "Active" : ""}`}
              onClick={() => handleClickActive("4")}
            >
              <div className="date-serveice">Ngày</div>
              <Space size={12} direction="vertical">
                <DatePicker
                  className="date-picker"
                  placeholder="Thêm ngày"
                  cellRender={cellRender}
                />
              </Space>
            </div>
          )}
        </div>

        <div
          className={`search ${Active == 5 ? "Active" : ""}`}
          onClick={() => handleClickActive("5")}
        >
          <span className="space"></span>
          <div className="search-client">
            <div className="client">Khách</div>

            <Popover
              placement="bottom"
              content={content}
              arrow={mergedArrow}
              trigger="click"
            >
              <Button type="none">Thêm khách</Button>
            </Popover>
          </div>
          <div className="search-icon" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  );
}






