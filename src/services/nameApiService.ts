import axios from 'axios';

const apiUrl = "https://fantasyname.lukewh.com/";

export const getRandomName = async () => {
    const response = await axios.get<string>(apiUrl);
    return response.data;
}
