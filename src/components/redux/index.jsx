import { combineReducers} from 'redux'
import { UserReducer } from './Reducer';
import { CartReducer } from './CartReducer';
import { OrderItems } from './OrderItems';
import { ToggleSideBar } from './ToggleSideBar';
import { Notification } from './Notification';
import { ResetPassword } from './ResetPassword';
import { ShowBtnExportOrders } from './ShowBtnExportOrders';


const rootReducer = combineReducers({
    users : UserReducer,
    carts : CartReducer,
    orderItems : OrderItems,
    ToggleSideBar,
    Notification,
    ResetPassword,
    ShowBtnExportOrders
})

export default rootReducer