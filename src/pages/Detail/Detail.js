import React, { useEffect, useState } from "react";
import "./Detail.css";
import Menus from "../../components/Menus/Menus";
import RoomImage from "../../components/RoomImage/RoomImage";
import RoomRent from "../../components/RoomRent/RoomRent";
import Comment from "../../components/Comment/RoomComment";
import Footer from "../../components/Footer/Footer";
import authentication from "../../api/authentication";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { signIn } from "../../redux/reducers/signInReducer";
import comment from "../../api/comment";

export default function Detail(props) {
  const [listRoomDetail, setListRoomDetail] = useState({});
  const [listComment, setListComment] = useState([]);
  const [listCommentById, setListCommentById] = useState([]);
  const [visible, setVisible] = useState(8);
  const params = useParams();

  const showLoadMoreComment = () => {
    setVisible((prev) => prev + 300);
    console.log(123);
  };

  useEffect(() => {
    getListRoomDetail();
    getListComment();
   
  }, []);

  useEffect(()=> {
    getListCommentById()
  },[])

  const getListRoomDetail = async () => {
    const response = await authentication.fetchRoomDetail(params.id);
    setListRoomDetail(response.data.content);
  };
  // console.log(listRoomDetail);

  const getListComment = async () => {
    const response = await comment.fetchApiGetComment();
    console.log("comments", response.data.content);
    setListComment(response.data.content);
  };

  const getListCommentById = async () => {
    const response = await comment.fetchApiGetCommentById(params.id)
    setListCommentById(response.data.content);
  }

  const token = JSON.parse(localStorage.getItem("data"));
  console.log("token", token);

  const username = useSelector(signIn);
  // const newUsername = username.payload.signInReducer.users;
  // console.log("username", newUsername);

  const newUsername = JSON.parse(localStorage.getItem('user'))
  console.log('username',newUsername)  

  return (
    <div className="details" style={{ padding: "0 40px" }}>
      <Menus />
      <RoomImage listRoomDetail={listRoomDetail} />
      <RoomRent
        listRoomDetail={listRoomDetail}
        params={params}
        // newUsername={newUsername}
        newUsername={newUsername}
      />
      <Comment
        // listComment={listComment}
        visible={visible}
        showLoadMoreComment={showLoadMoreComment}
        params={params}
        // newUsername={newUsername}
        newUsername={newUsername}
        token={token}
        // getListComment={getListComment}
        getListCommentById={getListCommentById}
        listCommentById={listCommentById}
      />
      <Footer />
    </div>
  );
}
