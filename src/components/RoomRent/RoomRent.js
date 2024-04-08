import React, { useMemo, useState } from "react";
import "./RoomRent.css";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space, Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authentication from "../../api/authentication";
import { set } from "react-hook-form";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
export default function RoomRent(props) {
  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const [id, setId] = useState(0);
  const [maPhong, setMaPhong] = useState(0);
  const [ngayDen, setNgayDen] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [soLuongKhach, setSoLuongKhach] = useState(0);
  const [maNguoiDung, setMaNguoiDung] = useState("");

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter)
      return {
        pointAtCenter: true,
      };
    return showArrow;
  }, [showArrow, arrowAtCenter]);

  const navigate = useNavigate();


  const handleBookRoom = async () => {
    let data = {
      id: id,
      maPhong: props.params.id,
      ngayDen: ngayDen,
      ngayDi: ngayDi,
      soLuongKhach: soLuongKhach,
      // maNguoiDung: props.newUsername.user.id,
      maNguoiDung: props.newUsername?.id,
    };
    console.log(data);
    let response = await authentication.fetchBookRoom(data);
    if(response) {
      alert("Đặt phòng thành công")

    } else {
      alert("Bạn chưa đăng nhập")
      navigate(`/signIn`);
    }
    console.log(response);
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
      <span>
        Chỗ ở này cho phép tối đa 2 khách, không tính em bé. Không được phép
        mang theo thú cưng.
      </span>
    </div>
  );

  return (
    <div className="room-rent">
      <div className="room-left">
        <div className="room-owner">
          <h2>Phòng trong căn hộ chung cư cao cấp. Chủ nhà Carmela</h2>
          <img src="https://a0.muscache.com/im/pictures/user/acd97bc9-42f7-45cf-84d4-076add17e41a.jpg?im_w=240" />
        </div>
        <div className="room-detail">
          <div className="detail">
            <i className="fa-solid fa-bed"></i>
            <span>1 giường king</span>
          </div>
          <div className="detail">
            <i className="fa-solid fa-shower"></i>
            <span>Phòng vệ sinh chung</span>
          </div>
          <div className="detail">
            <i className="fa-solid fa-house-user"></i>
            <span>Gia đình Chủ nhà sống tại đây</span>
          </div>
        </div>
        <div className="room-content">
          <div className="room">
            <i className="fa-solid fa-address-card"></i>
            <div>
              <h3>Phòng trong căn hộ chung cư cao cấp</h3>
              <span>
                Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những
                khu vực chung.
              </span>
            </div>
          </div>
          <div className="room">
            <i className="fa-solid fa-computer"></i>
            <div>
              <h3>Không gian riêng để làm việc</h3>
              <span>Một căn phòng có Wi-fi, rất phù hợp để làm việc.</span>
            </div>
          </div>
          <div className="room">
            <i className="fa-solid fa-key"></i>
            <div>
              <h3>Trải nghiệm nhận phòng tuyệt vời</h3>
              <span>
                90% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.
              </span>
            </div>
          </div>
        </div>
        <div className="sleep-place">
          <h2 className="sleep-title">Nơi bạn sẽ ngủ nghỉ</h2>
          <div className="sleep-content">
            <i className="fa-solid fa-bed"></i>
            <h3>Phòng ngủ</h3>
            <span>1 giường king</span>
          </div>
        </div>
        <div className="introduce">
          <h2 className="introduce-title">Nơi này có những gì cho bạn</h2>
          <div className="introduce-content">
            <div>
              <i className="fa-regular fa-keyboard"></i>
              <span>Khóa ở cửa phòng ngủ</span>
            </div>
            <div>
              <i className="fa-solid fa-city"></i>
              <span>Hướng nhìn ra đường chân trời thành phố</span>
            </div>
          </div>
          <div className="introduce-content">
            <div>
              {props.listRoomDetail.wifi ? (
                <div>
                  {" "}
                  <i className="fa-solid fa-wifi"></i>
                  <span>Wi-fi</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <i className="fa-solid fa-computer"></i>
              <span>Không gian riêng để làm việc</span>
            </div>
          </div>
          <div className="introduce-content">
            <div>
              {props.listRoomDetail.tivi ? (
                <div>
                  <i className="fa-solid fa-tv"></i>
                  <span>TV</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <i className="fa-solid fa-elevator"></i>
              <span>Thang máy</span>
            </div>
          </div>
          <div className="introduce-content">
            <div>
              <i className="fa-solid fa-bath"></i>
              <span>Bồn tắm: {props.listRoomDetail.phongTam}</span>
            </div>
            <div>
              <i className="fa-regular fa-hard-drive"></i>
              <span>Máy sấy tóc</span>
            </div>
          </div>
          <div className="introduce-content">
            <div>
              <i className="fa-solid fa-bomb"></i>
              <span className="text-through">Máy phát hiện khí CO</span>
            </div>
            <div>
              <i className="fa-solid fa-smoking"></i>
              <span className="text-through">Máy báo khói</span>
            </div>
          </div>
          <button className="btn-introduce">
            Hiển thị tất cả 38 tiện nghi
          </button>
        </div>
      </div>
      <div className="room-right">
        <div className="room-card">
          <div className="room-title">
            <div className="room-price">
              $40 / <span>Đêm</span>
            </div>
            <div className="room-price room-2">
              <i className="fa-solid fa-star"></i>
              <span className="room-title-span">4,88</span>
              <span>-</span>
              <span>162 đánh giá</span>
            </div>
          </div>
          <div className="room-give">
            <div className="room-item">
              <div className="room-item-service">Nhận phòng</div>
              <div className="room-item-reservation">Trả phòng</div>
            </div>
            <div>
              <Space direction="vertical">
                <RangePicker
                  format={dateFormat}
                  onChange={(value) => {
                    console.log(value);
                    const newValue = value.map((item) => {
                      return item.format();
                      // console.log(item.format())
                      // return console.log(item.format());
                    });
                    // console.log(newValue);
                    setNgayDen(newValue[0]);
                    setNgayDi(newValue[1]);
                  }}
                  bordered={false}
                  placeholder={["THÊM NGÀY", "THÊM NGÀY"]}
                />
              </Space>
            </div>
          </div>
          <div className="room-client">
            <div className="room-client-item">Khách</div>
            <div style={{ textAlign: "right", padding: "0 40px" }}>
              {soLuongKhach}
            </div>
            <div className="room-client-popover">
              <Popover
                placement="bottom"
                content={content}
                arrow={mergedArrow}
                trigger="click"
              >
                <Button type="none">Thêm khách</Button>
              </Popover>
            </div>
          </div>

          <button onClick={handleBookRoom} className="btn-card">
            Đặt phòng
          </button>
          <div className="deducted">Bạn vẫn chưa bị trừ tiền</div>
          <div className="charge">
            <span className="charge-detail">$159 x 5 đêm</span>
            <span>$797</span>
          </div>
          <div className="charge">
            <span className="charge-detail">
              Giảm giá cho thời gian ở dài hạn
            </span>
            <span className="charged">-$80</span>
          </div>
          <div className="charge">
            <span className="charge-detail">Phí vệ sinh</span>
            <span>$84</span>
          </div>
          <hr />
          <div className="tax">
            <span className="tax-title">Tổng trước thuế</span>
            <span className="tax-price">$801</span>
          </div>
        </div>

        <div className="room-place">
          <div>
            <h2>
              Nơi này rất hiếm khi còn chỗ .{" "}
              <span>Chỗ ở của Alessandro trên Airbnb thường kín phòng.</span>
            </h2>
          </div>
          <i className="fa-regular fa-gem"></i>
        </div>

        <div className="room-report">
          <div>
            <i className="fa-solid fa-flag"></i>
            <a>Báo cáo nhà/phòng cho thuê này</a>
          </div>
        </div>
      </div>
    </div>
  );
}

