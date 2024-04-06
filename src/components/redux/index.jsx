import { combineReducers} from 'redux'
import { UserReducer } from './Reducer';
import { CartReducer } from './CartReducer';
import { OrderItems } from './OrderItems';
import { ToggleSideBar } from './ToggleSideBar';

const rootReducer = combineReducers({
    users : UserReducer,
    carts : CartReducer,
    orderItems : OrderItems,
    ToggleSideBar
})

export default rootReducer