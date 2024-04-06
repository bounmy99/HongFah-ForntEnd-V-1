export function ToggleSideBar(state=null,action){
    switch (action.type) {
        case "OPEN":
            return action.payload;
        case "CLOSE":
            return action.payload;
        default:
            return state
    }
}