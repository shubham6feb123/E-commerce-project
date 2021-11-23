let initialState = [];
if (typeof window !== undefined) {
  if (window.localStorage.getItem("cart")) {
    initialState = JSON.parse(window.localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
}
