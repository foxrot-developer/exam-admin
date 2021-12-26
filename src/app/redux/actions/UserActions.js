import axiosInstance from '../../../axios'

export const GET_USER_LIST = 'GET_USER_LIST'
export const GET_ALL_PAYMENT = 'GET_ALL_PAYMENT'
export const GET_WEB_PROFILE_EN = 'GET_WEB_PROFILE_EN'
export const GET_WEB_PROFILE_AR = 'GET_WEB_PROFILE_AR'
export const GET_WEB_PROFILE_NL = 'GET_WEB_PROFILE_NL'
export const GET_EMAIL_TEMPLATE = 'GET_EMAIL_TEMPLATE'

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

export const updateDetail = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/update-web-profile/61b6f6e84cb6e87df531d81c`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const resetUserPassword = (id, data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/reset-user-password/${id}`, data)
        .then((res) => {
            dispatch(getUserList())
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getContentEn = () => (dispatch) => {
    axiosInstance
        .get('admin/all-sections', {
            headers: {
                lang: 'en',
            },
        })
        .then((res) => {
            dispatch({
                type: GET_WEB_PROFILE_EN,
                payload: res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
export const getContentAr = () => (dispatch) => {
    axiosInstance
        .get('admin/all-sections', {
            headers: {
                lang: 'ar',
            },
        })
        .then((res) => {
            dispatch({
                type: GET_WEB_PROFILE_AR,
                payload: res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
export const getContentNl = () => (dispatch) => {
    axiosInstance
        .get('admin/all-sections', {
            headers: {
                lang: 'nl',
            },
        })
        .then((res) => {
            dispatch({
                type: GET_WEB_PROFILE_NL,
                payload: res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateHeroSection = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/hero-update/61c5d4f9dbe9259cdf13b541`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}
export const updateAboutSection = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/about-update/61c5d4f9dbe9259cdf13b541`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateFooter = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/footer-update/61c5d4f9dbe9259cdf13b541`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateContactSection = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/contact-update/61c5d4f9dbe9259cdf13b541`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateLanguage = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/language-update/61c5d4f9dbe9259cdf13b541`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updatePackageSection = (data, setOpen) => (dispatch) => {
    axiosInstance
        .patch(`admin/package-update/61c5d4f9dbe9259cdf13b541`, data)
        .then((res) => {
            setOpen(false)
            dispatch(getContentEn())
            dispatch(getContentAr())
            dispatch(getContentNl())
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getEmailTemplate = () => (dispatch) => {
    axiosInstance
        .get('admin/get-email-template')
        .then((res) => {
            dispatch({
                type: GET_EMAIL_TEMPLATE,
                payload: res.data.email_template,
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateEmailTemplate = (data) => (dispatch) => {
    axiosInstance
        .patch(`admin/email-template`, data)
        .then((res) => {
            dispatch(getEmailTemplate())
        })
        .catch((err) => {
            console.log(err)
        })
}
