import axios from "axios";
const baseUrl = "/api/contacts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getContacts = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getContact = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

const create = async (contact) => {
  try {
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const response = await axios.post(`${baseUrl}`, contact, config);
    return response.data;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

const update = async (id, contact) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, contact, config);
    return response.data;
  } catch (error) {
    console.log("Error updating data: ", error);
  }
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.log("Error Removing contact: ", error);
  }
};

export { getContacts, getContact, create, update, remove, setToken };
