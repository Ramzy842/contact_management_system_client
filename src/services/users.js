import axios from "axios";
const baseUrl = process.env.REACT_APP_USERS_ENDPOINT;

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export {register, getUser};
