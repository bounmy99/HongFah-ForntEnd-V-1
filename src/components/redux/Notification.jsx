export function Notification(state=null,action){
    switch (action.type) {
        case "NEW_USER":
            return action.payload;
        case "READ_USER":
            return action.payload;
        default:
            return state
    }
} 