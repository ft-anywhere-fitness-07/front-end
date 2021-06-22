import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: "https://anywhere-fitness-back-end.herokuapp.com"
    })
}

export default axiosWithAuth;