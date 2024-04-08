import React, { useState } from "react";
import "./LoadMore.css";

export default function LoadMore(props) {
  let {showLoadMore} = props;
  return (
    <div className="load-more">
      <h3>Tiếp tục khám phá danh mục nhà nhỏ</h3>
      <button onClick={showLoadMore}>Hiển thị thêm</button>
    </div>
  );
}
