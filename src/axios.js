import axios from "axios";

 axios.defaults.baseURL = ""
// axios.defaults.baseURL="http://192.168.0.188:8087/wzcs/"
const request = axios.create({
    timeout: 15000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

export default request