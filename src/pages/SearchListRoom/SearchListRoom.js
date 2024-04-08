import React from "react";

import "./SearchListRoom.css";
import Menus from "../../components/Menus/Menus";
import Footer from "../../components/Footer/Footer";
import ListRoomFound from "./ListRoomFound/ListRoomFound";
const SearchListRoom = () => {
  return (
    <div className="search-list-room">
      <Menus />
      <ListRoomFound />
      <Footer />
    </div>
  );
};

export default SearchListRoom;
