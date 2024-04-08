import React, { useState } from "react";
import "./RoomComment.css";
import comment from "../../api/comment";
export default function RoomComment(props) {
  let [text, setText] = useState("");
  let [id, setId] = useState("");
  let [change, setChange] = useState(true);
  const today = Date.now();

  const handleAddComment = async () => {
    let maPhong = props.params.id;
    // let maNguoiBinhLuan = props.newUsername.user.id;
    let maNguoiBinhLuan = props.newUsername?.id;
    let ngayBinhLuan = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(today);
    let noiDung = text;
    let saoBinhLuan = 0;
    let data = { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan };

    let response = await comment.fetchApiPostComment(data, props.token);
    console.log("data", data);
    console.log("data", response);
    // props.getListComment();
    props.getListCommentById();
  };
  const handleEditComment = (item) => {
    setText(item.noiDung);
    setId(item.id);
    setChange(false);
  };

  const handleSaveEditComment = async () => {
    console.log("user", id);
    let noiDung = text;
    let maPhong = props.params.id;
    // let maNguoiBinhLuan = props.newUsername.user.id;
    let maNguoiBinhLuan = props.newUsername?.id;
    let ngayBinhLuan = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(today);
    let saoBinhLuan = 0;
    let data = { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan };
    console.log("save", data);
    setText("");
    setChange(true);
    let response = await comment.fetchApiPutComment(id, data, props.token);
    console.log(response);
    // props.getListComment();
    props.getListCommentById();
  };

  const handleDeleteComment = async (item) => {
    let id = item.id;
    console.log(item);
    console.log(id);

    let response = await comment.fetchApiDeleteComment(id, props.token);
    console.log(response);
    // props.getListComment();
    props.getListCommentById();
  };
  // console.log("userComment", props.newUsername.user.id);

  return (
    <div className="room-comment">
      <div className="room-title">
        <i className="fa-solid fa-star"></i>
        <span>4,88 · 162 đánh giá</span>
      </div>
      <div className="room-judge">
        <div className="row">
          <div className="col">
            <div>Mức độ sạch sẽ</div>
            <div>
              <span className="width"></span>
              <span className="point">4,9</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>Độ chính xác</div>
            <div>
              <span className="width"></span>
              <span className="point">4,9</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>Giao tiếp</div>
            <div>
              <span className="width"></span>
              <span className="point">4,9</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>Vị trí</div>
            <div>
              <span className="width"></span>
              <span className="point">4,9</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>Nhận phòng</div>
            <div>
              <span className="width"></span>
              <span className="point">4,9</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>Giá trị</div>
            <div>
              <span className="width"></span>
              <span className="point">4,9</span>
            </div>
          </div>
        </div>
      </div>
      <div className="room-user">
        {props.listCommentById.slice(0, props.visible).map((item, index) => {
          return (
            <div className="row">
              <div className="item">
                {/* <img src="https://picsum.photos/200/300" /> */}
                <img src={item.avatar} />

                <div>
                  <h1>{item.tenNguoiBinhLuan}</h1>
                  <span>{item.ngayBinhLuan}</span>
                </div>
              </div>
              <div className="text">
                <span>{item.noiDung}</span>
                <div className="btn">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditComment(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteComment(item)}
                  >
                    Delete
                  </button>
                </div>
                <div className="text-load">
                  <a href="#">Hiển thị thêm</a>
                  <i class="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          );
        })}

        <button className="btn-user" onClick={props.showLoadMoreComment}>
          Hiển thị tất cả 162 đánh giá
        </button>
        <div className="add-comment">
          <input
            className="add-text"
            placeholder="Thêm bình luận"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {change ? (
            <button onClick={handleAddComment} className="btn-add">
              Add
            </button>
          ) : (
            <button className="btn-add" onClick={handleSaveEditComment}>
              save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
