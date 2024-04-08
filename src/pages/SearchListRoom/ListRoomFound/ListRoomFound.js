import React from "react";
import "./ListRoomFound.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { rooms } from "../../../redux/reducers/signInReducer";
const ListRoomFound = () => {
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <i
        className="fa-solid fa-chevron-right slick-right"
        onClick={onClick}
      ></i>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <i className="fa-solid fa-chevron-left slick-left" onClick={onClick}></i>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const rooms = JSON.parse(localStorage.getItem("rooms"));
  console.log(rooms);

  return (
    <div className="list-room-found">
      <div className="list-room-row">
        <div className="list-room-left">
          <div className="list-room-title">
            <div>
              <h3>hơn 1000 chổ ở</h3>
            </div>
            <div className="list-room-filter">
              <i class="fa-solid fa-sliders"></i>
              <span>Bộ lọc</span>
            </div>
          </div>
        
          <div className="list-carousel-page">
            <div className="list-carousel-content">
              {rooms.map((item, index) => {
                return (
                  <Link className="list-carousel-link" key={index} to={`/detail/${item.id}`} >
                    <div className="list-carousel">
                      <Slider {...settings}>
                        <div>
                          <img src={item.hinhAnh} />
                        </div>
                        <div>
                          <img src={item.hinhAnh} />
                        </div>
                        <div>
                          <img src={item.hinhAnh} />
                        </div>
                      </Slider>
                      <div className="list-sale">
                        <div className="list-favourite">
                          <h3 className="list-title">{item.tenPhong}</h3>
                          <div className="list-carousel-judge">
                            <i className="fa-solid fa-star"></i>
                            <span>4,87</span>
                          </div>
                        </div>
                        <div className="list-distance">Cách 2.603 km</div>
                        <div className="list-carousel-date">
                          Ngày 25 - Ngày 30 tháng 11
                        </div>
                        <div className="list-price">
                          ${item.giaTien} / &nbsp; <span>Đêm</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Link className="list-carousel-link">
                <div className="list-carousel">
                  <Slider {...settings}>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                  </Slider>
                  <div className="list-sale">
                    <div className="list-favourite">
                      <h3 className="list-title">Phong 1</h3>
                      <div className="list-carousel-judge">
                        <i className="fa-solid fa-star"></i>
                        <span>4,87</span>
                      </div>
                    </div>
                    <div className="list-distance">Cách 2.603 km</div>
                    <div className="list-carousel-date">
                      Ngày 25 - Ngày 30 tháng 11
                    </div>
                    <div className="list-price">
                      $10 / &nbsp; <span>Đêm</span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link className="list-carousel-link">
                <div className="list-carousel">
                  <Slider {...settings}>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                  </Slider>
                  <div className="list-sale">
                    <div className="list-favourite">
                      <h3 className="list-title">Phong 1</h3>
                      <div className="list-carousel-judge">
                        <i className="fa-solid fa-star"></i>
                        <span>4,87</span>
                      </div>
                    </div>
                    <div className="list-distance">Cách 2.603 km</div>
                    <div className="list-carousel-date">
                      Ngày 25 - Ngày 30 tháng 11
                    </div>
                    <div className="list-price">
                      $10 / &nbsp; <span>Đêm</span>
                    </div>
                  </div>
                </div>
              </Link>
              <Link className="list-carousel-link">
                <div className="list-carousel">
                  <Slider {...settings}>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                    <div>
                      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-931433141813173131/original/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.jpeg?im_w=720" />
                    </div>
                  </Slider>
                  <div className="list-sale">
                    <div className="list-favourite">
                      <h3 className="list-title">Phong 1</h3>
                      <div className="list-carousel-judge">
                        <i className="fa-solid fa-star"></i>
                        <span>4,87</span>
                      </div>
                    </div>
                    <div className="list-distance">Cách 2.603 km</div>
                    <div className="list-carousel-date">
                      Ngày 25 - Ngày 30 tháng 11
                    </div>
                    <div className="list-price">
                      $10 / &nbsp; <span>Đêm</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="list-room-right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15808439.544472018!2d108.99840736026093!3d14.685295476592888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1700967443145!5m2!1svi!2s"
            width="100%"
            height="100%"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ListRoomFound;
