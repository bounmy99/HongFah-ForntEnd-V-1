export function ResetPassword(state=null,action){
    switch (action.type) {
        case "ACCESS_TOKEN":
            return action.payload;
        case "CLEAS_TOKEN":
            return action.payload;
        default:
            return state
    }
}