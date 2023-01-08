import axios from "axios"

const instance = axios.create({
    baseURL: 'https://trainwithme-flask.onrender.com',
});

export default instance;