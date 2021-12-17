import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://examin-education.herokuapp.com/api/',
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response.data) || 'Something went wrong!'
        )
)

export default axiosInstance
