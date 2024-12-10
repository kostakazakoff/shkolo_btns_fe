import axios from "axios";
import Path from "./paths";

const be = axios.create({
    baseURL: `${Path.ORIGIN}/api/buttons`,
    // withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Origin': origin,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export default be;