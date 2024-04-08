import React from "react";
import "./RoomDetail.css";
import RoomImage from "../RoomImage/RoomImage";
import RoomRent from "../RoomRent/RoomRent";
import RoomComment from "../Comment/RoomComment";


export default function RoomDetail() {


  return (
    <div className="Room-detail">
      <hr />

      <RoomImage />
      <RoomRent />
      <RoomComment />
    </div>
  );
}
