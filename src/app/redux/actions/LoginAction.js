import axiosInstance from '../../../axios'

export const ADMIN_LOGIN = 'ADMIN_LOGIN'

export const login = (data, history, setMessage, setLoading) => (dispatch) => {
    axiosInstance
        .post('admin/login', data)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: ADMIN_LOGIN,
                payload: res.data,
            })
            history.push('/dashboard')
        })
        .catch((err) => {
            setMessage(err.message)
            setLoading(false)
            console.log(err)
        })
}

export const updatePassword =
    ({ data, id, setMessage, setchangePassOpen }) =>
    (dispatch) => {
        console.log(data, id)
        axiosInstance
            .patch(`admin/update-password/${id}`, data)
            .then((res) => {
                setchangePassOpen(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

export const updateProfile =
    ({ data, id, setOpen }) =>
    (dispatch) => {
        console.log(data, id)
        axiosInstance
            .patch(`admin/update-profile/${id}`, data)
            .then((res) => {
                setOpen(false)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
