
let initialState = [];

if (localStorage.getItem("orders")) {
  initialState = JSON.parse(localStorage.getItem("orders"));
} else {
  initialState = [];
}

export function OrderItems(state=initialState,action){
    switch (action.type) {
        case "SAVE_ORDER":
            return action.payload;
        case "EMPTY_ORDER":
            localStorage.removeItem("orders")
            return action.payload;
        default:
            return state
    }
}