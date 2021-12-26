import axiosInstance from '../../../axios'
export const GET_ALL_PACKAGES = 'GET_ALL_PACKAGES'

export const getPackageList = (lang) => (dispatch) => {
    axiosInstance
        .get('users/all-packages', {
            headers: {
                lang: lang,
            },
        })
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: GET_ALL_PACKAGES,
                payload: res.data.packages,
            })
        })
}

export const deletePackage = (id, lang) => (dispatch) => {
    axiosInstance.delete(`admin/delete-package/${id}`).then((res) => {
        dispatch(getPackageList(lang))
    })
}

export const createPackage = (data, setOpen, lang) => (dispatch) => {
    axiosInstance
        .post('admin/create-package', data)
        .then((res) => {
            console.log(res)
            setOpen(false)
            dispatch(getPackageList(lang))
        })
        .catch((err) => {
            console.log(err)
        })
}
export const updatePackage = (id, data, setOpen, lang) => (dispatch) => {
    axiosInstance
        .patch(`admin/edit-package/${id}`, data)
        .then((res) => {
            dispatch(getPackageList(lang))
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const packageStatus = (id, status, lang) => (dispatch) => {
    console.log(id, status)
    axiosInstance
        .patch(`admin/active-package/${id}`, { active: status })
        .then(() => {
            dispatch(getPackageList(lang))
        })
        .catch((err) => {
            console.log(err)
        })
}
