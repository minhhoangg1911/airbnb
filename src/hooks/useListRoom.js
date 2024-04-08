import React, { useEffect, useState } from "react";
import authentication from "../api/authentication";

export const useListRoom = () => {
  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    getListRoom();
  }, []);

  const getListRoom = async () => {
    const response = await authentication.fetchListRoom();
    setListRoom(response.data.content);
  };
  return listRoom;
};
