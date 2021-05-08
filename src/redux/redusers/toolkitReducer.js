import { createAction, createReducer } from "@reduxjs/toolkit";

import cartItems from "../../cart-items.js"; // redux stuff


//initialStore
export const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0
}

// console.log(initialStore)
//actions
export const increase = createAction('increase',
  function increase(id, amount) {
    return {
      payload: { id, amount }
    }
  }
);

export const decrease = createAction('decrease',
  (id, amount) => (
    {
      payload: { id, amount }
    }
  )
);

export const remove = createAction('remove', (id) => {
  return {
    payload: { id: id }
  }
});

export const clearCart = createAction('clearCart');
export const getTotals = createAction('getTotals');



export default createReducer(
  initialStore,
  {
    [increase]: function (state, action) {
      console.log("INCREASE", state)
      console.log("INCREASE", action)
      let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount + 1 }
        }
        return cartItem
      })
      return {
        ...state,
        cart: tempCart
      }
    },
    [decrease]: function (state, action) {
      console.log("DECREASE", state)
      console.log("DECREASE", action)
      let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 }
          //Проверка на положительное значение
          cartItem.amount < 1
            ? cartItem = { ...cartItem, amount: 1 }
            : cartItem = { ...cartItem }
        }
        return cartItem
      })

      return {
        ...state,
        cart: tempCart
      }
    },
    [remove]: function (state, action) {
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id)
      }
    },
    [clearCart]: (state) => {
      return { ...state, cart: [] }
    },

    [getTotals]: (state) => {
      console.log(state.cart)
      let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
        // console.log(cartItem)
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;

      }, { total: 0, amount: 0 }
      )
      total = parseFloat(total.toFixed(2))

      return { ...state, total, amount };
    },

  }
);





