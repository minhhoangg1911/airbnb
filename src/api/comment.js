import axios from "axios";
import { tokenCybersoft } from "./utils";
import { domain } from "./utils";

const fetchApiGetComment = async () => {
  try {
    return await axios({
      url: `${domain}/binh-luan`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchApiGetCommentById = async (id) => {
  try {
    return await axios({
      url: `${domain}/binh-luan/lay-binh-luan-theo-phong/${id}`,
      method: "GET",
      headers: {
        TokenCybersoft: tokenCybersoft,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchApiPostComment = async (data, token) => {
  try {
    return await axios({
      url: `${domain}/binh-luan`,
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
const fetchApiPutComment = async (id,data, token) => {
  try {
    return await axios({
      url: `${domain}/binh-luan/${id}`,
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
const fetchApiDeleteComment = async (id, token) => {
  try {
    return await axios({
      url: `${domain}/binh-luan/${id}`,
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
  fetchApiGetComment,
  fetchApiGetCommentById,
  fetchApiPostComment,
  fetchApiPutComment,
  fetchApiDeleteComment,
};
