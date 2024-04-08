import React, { useState } from "react";
import { AlignCenterOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Avatar } from "antd";

import { Tabs } from "antd";
import SearchTab from "../Header/SearchTab";
import "./style.css";
import { NavLink } from "react-router-dom";
import { signIn } from "../../redux/reducers/signInReducer";
import { useSelector } from "react-redux";

export default function Menus(props) {
  // const username = useSelector(signIn);
  // let user = username.payload.signInReducer.users?.user;
  // console.log("user", user);

  let users = JSON.parse(localStorage.getItem("user"));
  console.log("users", users?.avatar);
  const [Islocation, setIslocation] = useState(true);
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const onChangeTab = (key) => {
    console.log(key);
  };

  const handleClickLocation = () => {
    setIslocation(true);
  };
  const handleClickExperience = () => {
    setIslocation(false);
  };
  const handleRemoveUser = () => {
    localStorage.removeItem("user");
  };

  const Icon = () => {
    return users ? <img src={users?.avatar} /> : <UserOutlined />;
  };

  const LogAccept = () => {
    return users ? <span onClick={handleRemoveUser}>Logout</span> : "";
  };

  const UserInfo = () => {
    return users ? <NavLink to="/user-info">Thông tin chi tiết</NavLink> : "";
  };

  const items = [
    {
      label: <Avatar size={30} icon={<Icon user={users} />} />,
      key: "SubMenu",
      icon: <AlignCenterOutlined />,
      children: [
        {
          type: "group",

          children: [
            {
              label: <UserInfo />,
              key: "setting:6",
            },
            {
              label: <NavLink to="/SignUp">Đăng Ký</NavLink>,
              key: "setting:1",
            },
            {
              label: <NavLink to="/SignIn">Đăng Nhập</NavLink>,
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",

          children: [
            {
              label: "Cho thuê chỗ ở qua Airbnb ",
              key: "setting:3",
            },
            {
              label: "Trung tâm trợ giúp",
              key: "setting:4",
            },
            {
              label: <LogAccept onClick={handleRemoveUser} />,
              key: "setting:5",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="header">
        <div className="icon-home">
          <i
            className="fa-brands fa-airbnb"
            style={{ margin: "0 5px", fontSize: 30, fontWeight: "bold" }}
          ></i>

          <span className="home-text">airbnb</span>
        </div>
        <div className="Tab">
          <div className="tab-header">
            <div className="place" onClick={handleClickLocation}>
              Chỗ ở
            </div>
            <div className="experience" onClick={handleClickExperience}>
              Trải Nghiệm
            </div>
            <div className="experience-online">Trải nghiệm trực tuyến</div>
          </div>
          <SearchTab location={Islocation} />
        </div>
        <div className="user">
          <button className="user-home">Cho thuê chổ ở qua Airbnb</button>
          <i
            className="fa-solid fa-globe"
            style={{ margin: "0 10px", fontSize: 25 }}
          ></i>
          <Menu
            triggerSubMenuAction="click"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ border: "1px solid", borderRadius: 50 }}
          />
        </div>
      </div>
    </>
  );
}
