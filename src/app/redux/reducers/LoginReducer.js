import { ADMIN_LOGIN } from '../actions/LoginAction'
const initialState = {
    admin: {},
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN:
            return {
                ...state,
                admin: action.payload,
            }
        default:
            return state
    }
}

export default LoginReducer
