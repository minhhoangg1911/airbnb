import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <hr />
      <div className="support">
        <div>
          <h3>Hổ trợ</h3>
          <ul>
            <li>
              <a>Trung tâm trợ giúp</a>
            </li>
            <li>
              <a>AirCover</a>
            </li>
            <li>
              <a>Chống phân biệt đối sử</a>
            </li>
            <li>
              <a>Hổ trợ khuyết tật</a>
            </li>
            <li>
              <a>Các tùy chọn hủy</a>
            </li>
            <li>
              <a>Báo cáo lo ngại của khu dân cư</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Đón tiếp khách</h3>
          <ul>
            <li>
              <a>Cho thuê nhà trên Airbnb</a>
            </li>
            <li>
              <a>AirCover cho Chủ nhà</a>
            </li>
            <li>
              <a>Tài nguyên về đón tiếp khách</a>
            </li>
            <li>
              <a>Diễn đàn cộng đồng</a>
            </li>
            <li>
              <a>Đón tiếp khách có trách nhiệm</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Airbnb</h3>
          <ul>
            <li>
              <a>Trang tin tức</a>
            </li>
            <li>
              <a>Tính năng mới</a>
            </li>
            <li>
              <a>Cơ hội nghề nghiệp</a>
            </li>
            <li>
              <a>Nhà đầu tư</a>
            </li>
            <li>
              <a>Chỗ ở khẩn cấp Airbnb.org</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="contact">
        <div className="left">
          <div>
            <span>© 2023 Airbnb, Inc.</span>
            <span>.</span>
            <span>Quyền riêng tư</span>
            <span>.</span>
            <span>Điều khoản</span>
            <span>.</span>
            <span>Sơ đồ trang web</span>
          </div>
        </div>
        <div className="right">
          <div>
            <i className="fa-solid fa-globe"></i>
            <span>Tiếng Việt (VN)</span>
            <span>$</span>
            <span>USD</span>
            <i className="fa-brands fa-facebook icon"></i>
            <i className="fa-brands fa-square-twitter icon"></i>
            <i className="fa-brands fa-instagram icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
