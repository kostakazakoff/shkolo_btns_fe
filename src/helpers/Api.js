import axios from "axios";

const origin = import.meta.env.VITE_API_BASE_URL
? import.meta.env.VITE_API_BASE_URL
: 'http://localhost:8000'

const be = axios.create({
    baseURL: `${origin}/api/buttons`,
    // withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Origin': origin,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export default be;