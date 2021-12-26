import {
    GET_USER_LIST,
    GET_ALL_PAYMENT,
    GET_WEB_PROFILE_EN,
    GET_WEB_PROFILE_AR,
    GET_WEB_PROFILE_NL,
} from '../actions/UserActions'
const initialState = {
    userList: [],
    paymentMethod: [],
    detail_en: {},
    detail_ar: {},
    detail_nl: {},
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload,
            }

        case GET_ALL_PAYMENT:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        case GET_WEB_PROFILE_EN:
            return {
                ...state,
                detail_en: action.payload,
            }
        case GET_WEB_PROFILE_AR:
            return {
                ...state,
                detail_ar: action.payload,
            }
        case GET_WEB_PROFILE_NL:
            return {
                ...state,
                detail_nl: action.payload,
            }
        default:
            return state
    }
}

export default UserReducer
