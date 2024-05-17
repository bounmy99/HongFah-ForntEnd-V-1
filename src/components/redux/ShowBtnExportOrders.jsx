export function ShowBtnExportOrders(state=false,action){
    switch (action.type) {
        case "SHOW_BTN_EXPORT":
            return action.payload;
        case "HIDE_BTN_EXPORT":
            return action.payload;
        default:
            return state
    }
}