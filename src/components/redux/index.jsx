import { combineReducers} from 'redux'
import { UserReducer } from './Reducer';

const rootReducer = combineReducers({
    users : UserReducer,
})

export default rootReducer