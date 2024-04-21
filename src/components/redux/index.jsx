import { combineReducers} from 'redux'
import { UserReducer } from './Reducer';
import { CartReducer } from './CartReducer';
import { OrderItems } from './OrderItems';
import { ToggleSideBar } from './ToggleSideBar';
import { Notification } from './Notification';


const rootReducer = combineReducers({
    users : UserReducer,
    carts : CartReducer,
    orderItems : OrderItems,
    ToggleSideBar,
    Notification

})

export default rootReducer