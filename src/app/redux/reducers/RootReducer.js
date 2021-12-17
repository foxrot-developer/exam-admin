import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import UserReducer from './UserReducer'
import PackageReducer from './PackageReducer'
import LoginReducer from './LoginReducer'
import ExamReducer from './ExamReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    user: UserReducer,
    package: PackageReducer,
    login: LoginReducer,
    exam: ExamReducer,
})

export default RootReducer
