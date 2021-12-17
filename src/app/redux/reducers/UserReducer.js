import {
    GET_USER_LIST,
    GET_ALL_PAYMENT,
    GET_WEB_PROFILE,
} from '../actions/UserActions'
const initialState = {
    userList: [],
    paymentMethod: [],
    detail: {},
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
        case GET_WEB_PROFILE:
            return {
                ...state,
                detail: action.payload,
            }
        default:
            return state
    }
}

export default UserReducer
