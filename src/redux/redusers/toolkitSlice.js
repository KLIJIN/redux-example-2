import { createSlice } from '@reduxjs/toolkit'
import cartItems from "../../cart-items.js"; // redux stuff



export const initialState = {
  cart: cartItems,
  total: 0,
  amount: 0
}

// Slice
const slice = createSlice({
  name: 'SliceReducer',
  initialState,
  reducers: {
    increase(state, action) {
      console.log("INCREASE", action.payload)
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
    decrease(state, action) {
      console.log("DECREASE", action.payload)
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
    remove(state, action) {
      console.log("REMOVE", state.cart)
      console.log("REMOVE", action)
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id)
      }
    },
    clearCart(state) {
      console.log("clearCart", state)
      return { ...state, cart: [] }
    },
    getTotals(state) {
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
    }
  }

})

export const { increase, decrease, remove, clearCart, getTotals } = slice.actions;
export default slice.reducer


