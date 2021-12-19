import axiosInstance from '../../../axios'

export const GET_USER_LIST = 'GET_USER_LIST'
export const GET_ALL_PAYMENT = 'GET_ALL_PAYMENT'
export const GET_WEB_PROFILE = 'GET_WEB_PROFILE'

export const getUserList = () => (dispatch) => {
    axiosInstance.get('admin/all-users').then((res) => {
        dispatch({
            type: GET_USER_LIST,
            payload: res.data.users,
        })
    })
}

export const deleteUser = (id) => (dispatch) => {
    axiosInstance.delete(`admin/delete-user/${id}`).then((res) => {
        dispatch(getUserList())
    })
}

export const updateUser = (id, data) => (dispatch) => {
    axiosInstance.patch(`admin/update-user/${id}`, data).then((res) => {
        dispatch(getUserList())
    })
}

export const createUser = (data, setOpen) => (dispatch) => {
    axiosInstance
        .post('admin/register-user', data)
        .then((res) => {
            dispatch(getUserList())
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const blockUser = (id, status) => (dispatch) => {
    axiosInstance
        .patch(`admin/block-user/${id}`, { block: status })
        .then((res) => {
            dispatch(getUserList())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const blockPayment = (id, status) => (dispatch) => {
    axiosInstance
        .patch(`admin/active-payment/${id}`, { active: status })
        .then((res) => {
            dispatch(getUserList())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getAllPayment = () => (dispatch) => {
    axiosInstance
        .get('admin/all-payments')
        .then((res) => {
            dispatch({
                type: GET_ALL_PAYMENT,
                payload: res.data.payment_methods,
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const disablePayment = (id, status) => (dispatch) => {
    axiosInstance
        .patch(`admin/active-payment/${id}`, { active: status })
        .then(() => {
            dispatch(getAllPayment())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getWebProfile = (lang) => (dispatch) => {
    axiosInstance

        .get('admin/web-profile/61b6f6e84cb6e87df531d81c', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            dispatch({
                type: GET_WEB_PROFILE,
                payload: res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateDetail = (id, data, lang, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/update-web-profile/${id}`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getWebProfile(lang))
        })
        .catch((err) => {
            console.log(err)
        })
}
