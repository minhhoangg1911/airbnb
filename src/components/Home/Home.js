import React from "react";
import { Layout, Menu, Space } from "antd";
import ListRoom from "../ListRoom/ListRoom";
import Menus from "../Menus/Menus";
import LoadMore from "../LoadMore/LoadMore";
import Footer from "../Footer/Footer";
import RoomDetail from "../RoomDetail/RoomDetail";
import Admin from "../Admin/Admin";
export default function Home() {
  
  return (
    <div>
      {/* <Menus /> */}
      {/* <ListRoom /> */}
      {/* <LoadMore /> */}
      {/* <Footer /> */}
      <RoomDetail />
    </div>
  );
}
