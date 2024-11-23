import axios from "axios";


const be = axios.create({
    baseURL: 'http://localhost:8000/api/buttons',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
    },
});

export default be;