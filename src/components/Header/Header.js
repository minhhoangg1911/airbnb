import "./style.css";
import React, { useState } from "react";
import { AlignCenterOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Avatar, Col, Divider, Row } from "antd";
import Slider from "react-slick";

import { Tabs } from "antd";

import Menus from "../Menus/Menus";
import ListRoom from "../ListRoom/ListRoom";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const onChangeTab = (key) => {
    console.log(key);
  };

  return (
    <div className="container">
      <Menus />
      <ListRoom />
    </div>
  );
};
export default Header;
