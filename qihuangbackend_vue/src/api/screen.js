import request from "./request";
import axios from "axios";

export const paramType = `/data_screen`;

export function currentGET(key, data = {}) {
  return request.get(`${paramType}/${key}`, data);
}

export const GETNOBASE = async (url, params) => {
  try {
    const data = await axios.get(url, {
      params: params
    });
    return data;
  } catch (error) {
    return error;
  }
};
