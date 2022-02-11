import axios from 'axios'
import Toast from 'Toast'

const axiosInstance = axios.create({
    baseURL: 'https://admin-alshahbarijschool.nl/api/',
})
// https://examin-education.herokuapp.com/
// https://admin-alshahbarijschool.nl/api/
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
        Toast.error(error)
        return error
    }
)

export default axiosInstance
