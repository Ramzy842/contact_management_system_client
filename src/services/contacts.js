import axios from "axios";
const baseUrl = process.env.REACT_APP_CONTACTS_ENDPOINT;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getContacts = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    //console.error("Error fetching data:", error);
    return error.response.data
  }
};

const getContact = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    //console.log("Error fetching data: ", error);
    return error.response.data
  }
};

const generateConfig = () => ({
  headers: {
    Authorization: token,
  },
});

const create = async (contact) => {
  try {
    const response = await axios.post(`${baseUrl}`, contact, generateConfig());
    return response.data;
  } catch (error) {
    //console.log("Error fetching data: ", error);
    return error.response.data
  }
};

const update = async (id, contact) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, contact, generateConfig());
    return response.data;
  } catch (error) {
    //console.log("Error updating data: ", error);
    return error.response.data
  }
};

const remove = async (id) => {

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, generateConfig());
    return response.data;
  } catch (error) {
    //console.log("Error Removing contact: ", error);
    return error.response.data
  }
};

export { getContacts, getContact, create, update, remove, setToken };
