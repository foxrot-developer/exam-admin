import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://examin-education.herokuapp.com/api/',
})

axiosInstance.interceptors.request.use((request) => {
    document.querySelector('.overlay').style.display = 'block'

    return request
})

axiosInstance.interceptors.response.use(
    (response) => {
        document.querySelector('.overlay').style.display = 'none'

        return response
    },
    (error) => {
        document.querySelector('.overlay').style.display = 'none'
        return error
    }
)

export default axiosInstance
