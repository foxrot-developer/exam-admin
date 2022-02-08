import Toast from 'Toast'
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
            dispatch({
                type: GET_ALL_PACKAGES,
                payload: res.data.packages,
            })
        })
}

export const deletePackage = (id, lang) => (dispatch) => {
    axiosInstance.delete(`admin/delete-package/${id}`).then((res) => {
        Toast.success('Package deleted successfully')
        dispatch(getPackageList(lang))
    })
}

export const createPackage = (data, setOpen, lang) => (dispatch) => {
    axiosInstance
        .post('admin/create-package', data)
        .then((res) => {
            setOpen(false)
            Toast.success('Package created successfully')
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
            Toast.success('Package updated successfully')
            dispatch(getPackageList(lang))
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const packageStatus = (id, status, lang) => (dispatch) => {
    axiosInstance
        .patch(`admin/active-package/${id}`, { active: status })
        .then(() => {
            dispatch(getPackageList(lang))
        })
        .catch((err) => {
            console.log(err)
        })
}
