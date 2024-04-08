import React, { useState } from "react";
import "./Admin.css";
import {
  UserOutlined,
  EnvironmentOutlined,
  ReconciliationOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Modal,
  Button,
  Pagination,
  Avatar,
} from "antd";
import ListUser from "./ListUser/ListUser";
import AddUser from "./AddUser/AddUser";
import UserInfo from "./UserInfo/UserInfo";
import LocationList from "./LocationList/LocationList";
import LocationInfo from "./LocationInfo/LocationInfo";
import AddLocation from "./AddLocation/AddLocation";
import LocationDetail from "./LocationDetail/LocationDetail";
import RoomList from "./RoomList/RoomList";
import { NavLink, useNavigate } from "react-router-dom";
import authentication from "../../api/authentication";
import { useEffect } from "react";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(2);
  const [id, setId] = useState(0);
  const [ListLocationDetail, setListLocationDetail] = useState([]);
  const [ListlocationInfo, setListLocationInfo] = useState({});

  const callbackFunction = async (childData) => {
    let response = await authentication.fetchRoomLocationInfo(childData.id);
    console.log("MaviTri", response);
    setListLocationDetail(response.data.content);
    let maViTriFound = childData.id;
    setId(maViTriFound);
    setCurrent(childData.child);
  };

  useEffect(() => {
    renderApiRoomLocationInfo();
  }, []);

  const renderApiRoomLocationInfo = async () => {
    let response = await authentication.fetchRoomLocationInfo(id);
    setListLocationDetail(response.data.content);
    console.log(response.data.content);
  };

  const callbackLocationList = async () => {
    renderApiRoomLocationInfo();
  };

  const callbackDeleteLocation = async () => {
    renderApiRoomLocationInfo();
  };

  const callbackImgLocation = async () => {
    renderApiRoomLocationInfo();
  };

  const callbackEditLocation = async () => {
    renderApiRoomLocationInfo();
  };

  const callbackInfoDetail = async (childData) => {
    setCurrent(childData.child);
    let response = await authentication.fetchRoomDetail(childData.id);
    setListLocationInfo(response.data.content);
    console.log(response);
  };

  // const getDataLocationInfo = (childData) => {
  //   setListLocationDetail(childData.data.content);
  // };

  const onClick = ({ key }) => {
    console.log("click ");
    console.log(key);
    setCurrent(key);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Content, Footer, Sider } = Layout;

  const items = [
    getItem("airbnb", "1", <i className="fa-brands fa-airbnb icon"></i>),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("UserList", "2"),
      getItem("AddUser", "3"),
    ]),
    getItem("Location", "sub2", <EnvironmentOutlined />, [
      getItem("LocationList", "4"),
      getItem("AddLocation", "5"),
    ]),
    getItem("Room", "sub3", <ReconciliationOutlined />, [
      getItem("RoomList", "6"),
    ]),
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User", user);
 

  let navigate = useNavigate();
  // if (!user) {
  //   navigate(`/`);
  // }

  const handleRemoveAccount = () => {
    localStorage.removeItem("user");
    navigate(`/`);
  };
  const Logout = () => {
    return <div onClick={handleRemoveAccount}>Logout</div>;
  };
  const Icon = () => {
    return user ? <img src={user?.avatar} /> : <UserOutlined />;
  };

  const menus = [
    {
      label: <Avatar size={30} icon={<Icon user={user} />} />,
      key: "SubMenu",
      icon: <MenuOutlined />,
      children: [
        {
          type: "group",
          children: [
            {
              label: <NavLink to="/user-info">Thông tin cá nhân</NavLink>,
              key: "setting:1",
            },
            {
              label: <Logout />,
              key: "setting:2",
            },
          ],
        },
      ],
    },
  ];
  const token = JSON.parse(localStorage.getItem("data"));
  console.log("token", token);

  return (
    <Layout
      className="Admin"
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="slider"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          className="Menu"
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <div className="menu-user">
          <MenuFoldOutlined />
          <Menu triggerSubMenuAction="click" mode="horizontal" items={menus} />
        </div>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <div className="Admin-user">
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
              </Breadcrumb>
              {current == "8" ? <UserInfo token={token} /> : ""}
              {current == "9" ? (
                <LocationInfo
                  ListLocationDetail={ListLocationDetail}
                  id={id}
                  token={token}
                  parentCallbackList={callbackLocationList}
                  parentCallbackDelete={callbackDeleteLocation}
                  parentCallbackImg={callbackImgLocation}
                  parentCallbackEdit={callbackEditLocation}
                  parentcallBackInfoDetail={callbackInfoDetail}
                />
              ) : (
                ""
              )}
              {current == 10 ? (
                <LocationDetail ListlocationInfo={ListlocationInfo} />
              ) : (
                ""
              )}
              {current == "2" ? <ListUser /> : ""}
              {current == "3" ? <AddUser /> : ""}
              {current == "4" ? (
                <LocationList
                  token={token}
                  // getDataLocationInfo={getDataLocationInfo}
                  parentCallback={callbackFunction}
                />
              ) : (
                ""
              )}
              {current == "5" ? <AddLocation token={token} /> : ""}
              {current == "6" ? <RoomList token={token} /> : ""}
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;
