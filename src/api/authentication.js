import axios from "axios";
import { tokenCybersoft } from "./utils";
import { domain } from "./utils";

const signUp = async (data) => {
  try {
    return await axios({
      url: `${domain}/auth/signup`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const signIn = async (data) => {
  try {
    return await axios({
      url: `${domain}/auth/signin`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchListRoom = async () => {
  try {
    return await axios({
      url: `${domain}/phong-thue`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPostListRoom = async (data, token) => {
  try {
    return await axios({
      url: `${domain}/phong-thue`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchDeleteListRoom = async (id, token) => {
  try {
    return await axios({
      url: `${domain}/phong-thue/${id}`,
      method: "DELETE",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
    
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchRoomDetail = async (id) => {
  try {
    return await axios({
      url: `${domain}/phong-thue/${id}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPutRoomDetail = async (data, id, token) => {
  try {
    return await axios({
      url: `${domain}/phong-thue/${id}`,
      method: "PUT",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPostImgRoomDetail = async (id, data, token) => {
  try {
    return await axios({
      url: `${domain}/phong-thue/upload-hinh-phong?maPhong=${id}`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchRoomLocationInfo = async (id) => {
  try {
    return await axios({
      url: `${domain}/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchApiRoomRent = async () => {
  try {
    return await axios({
      url: `${domain}/dat-phong`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

const fetchBookRoom = async (data) => {
  console.log("data", data);
  try {
    return await axios({
      url: `${domain}/dat-phong`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchApiUser = async () => {
  try {
    return await axios({
      url: `${domain}/users`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchApiUserId = async (id) => {
  try {
    return await axios({
      url: `${domain}/users/${id}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchPostApiUser = async (data) => {
  try {
    return await axios({
      url: `${domain}/users`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPostApiUserUpload = async (data,token) => {
  try {
    return await axios({
      url: `${domain}/users/upload-avatar`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,

      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPutApiUser = async (data) => {
  try {
    return await axios({
      url: `${domain}/users/${data.id}`,
      method: "PUT",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchDeleteApiUser = async (id) => {
  try {
    return await axios({
      url: `${domain}/users?id=${id}`,
      method: "DELETE",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchApiLocation = async (data) => {
  try {
    return await axios({
      url: `${domain}/vi-tri`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchAddApiLocation = async (data, token) => {
  try {
    return await axios({
      url: `${domain}/vi-tri`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPostImgApiLocation = async (id, data, token) => {
  try {
    return await axios({
      url: `${domain}/vi-tri/upload-hinh-vitri?maViTri=${id}`,
      method: "POST",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchEditApiLocation = async (data, token) => {
  try {
    return await axios({
      url: `${domain}/vi-tri/${data.id}`,
      method: "PUT",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchDeleteApiLocation = async (id, token) => {
  try {
    return await axios({
      url: `${domain}/vi-tri/${id}`,
      method: "DELETE",
      headers: {
        TokenCybersoft: tokenCybersoft,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  signUp,
  signIn,
  fetchListRoom,
  fetchPostListRoom,
  fetchDeleteListRoom,
  fetchRoomDetail,
  fetchPutRoomDetail,
  fetchPostImgRoomDetail,
  fetchRoomLocationInfo,
  fetchApiRoomRent,
  fetchBookRoom,
  fetchApiUser,
  fetchApiUserId,
  fetchApiLocation,
  fetchPostApiUser,
  fetchPostApiUserUpload,
  fetchPutApiUser,
  fetchDeleteApiUser,
  fetchAddApiLocation,
  fetchPostImgApiLocation,
  fetchEditApiLocation,
  fetchDeleteApiLocation,
};
