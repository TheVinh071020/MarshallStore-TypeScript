import { legacy_createStore as createStore } from "redux";

interface CartItem {
  product_id: number;
  clickNumber: number;
}

interface RootState {
  cart: CartItem[];
}

let initialState: RootState = {
  cart: JSON.parse(localStorage.getItem("cart") as string) || [],
};

const store = createStore((state: RootState = initialState, action: any) => {
  if (action.type === "ADD_TO_CART") {
    // Logic add sản phẩm vào trong state cart
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e) => e.product_id === payload.product_id);
    if (findIndex > -1) {
      cart[findIndex].clickNumber =
        cart[findIndex].clickNumber + payload.clickNumber;
    } else {
      cart.push(payload);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "INCREASE_CART_PRODUCT") {
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e) => e.product_id === payload);
    cart[findIndex].clickNumber = cart[findIndex].clickNumber + 1;
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "DECREASE_CART_PRODUCT") {
    let cart = [...state.cart];
    let { payload } = action;
    let findIndex = cart.findIndex((e) => e.product_id === payload);
    cart[findIndex].clickNumber = cart[findIndex].clickNumber - 1;
    return {
      ...state,
      cart: [...cart],
    };
  }

  if (action.type === "ORDER_TO_CART") {
    let { payload } = action;
    return {
      ...state,
      cart: [...payload],
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "DELETE_CART") {
    let { payload } = action;
    return {
      ...state,
      cart: [...payload],
    };
  }

  return state;
});

export default store;
