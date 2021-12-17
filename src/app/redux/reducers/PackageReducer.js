import { GET_ALL_PACKAGES } from '../actions/PackageActions'
const initialState = {
    packageList: [],
}

const PackageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PACKAGES:
            return {
                ...state,
                packageList: action.payload,
            }
        default:
            return state
    }
}

export default PackageReducer
