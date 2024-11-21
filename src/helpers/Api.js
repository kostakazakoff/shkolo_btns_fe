import axios from "axios";


const be = axios.create({
    baseURL: 'http://localhost:8000/api/buttons',
    headers: {
        'Accept': 'application/json',
    },
});

export default be;