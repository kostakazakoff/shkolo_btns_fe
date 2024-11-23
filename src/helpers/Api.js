import axios from "axios";


const be = axios.create({
    baseURL: 'http://api.kazakoff.site/api/buttons',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
    },
});

export default be;