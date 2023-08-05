import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/contacts'

const getContacts = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}

const getContact = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error)
    {
        console.log("Error fetching data: ", error);
    }
}

const create = contact => {

}

const update = (id, contact) => {

}

const remove = id => {

}

export {getContacts, getContact, create, update, remove}