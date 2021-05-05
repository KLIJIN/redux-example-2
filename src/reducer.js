import { DECREASE, INCREASE, REMOVE, CLEAR_CART, GET_TOTALS } from './actions.js'

import cartItems from "./cart-items.js"; // redux stuff

const initialStore = {
    cart: cartItems,
    total: 0,
    amount: 0
}

const reducer = (state = initialStore, action) => {
    let tempCart = [];
    // console.log(state)
    switch (action.type) {
        case DECREASE:
            // console.log("YOU PUSH DECREASE", action.payload)
            tempCart = state.cart.map(cartItem => {
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
        case INCREASE:
            // console.log("YOU PUSH INCREASE", action.payload.id, action.payload.amount)
            //тут перебираем массив карт, и там где cartItem.id возвращаем cartItem но его пропс amount будет мутирован
            tempCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    cartItem = { ...cartItem, amount: cartItem.amount + 1 }
                }
                return cartItem
            })
            return {
                ...state,
                cart: tempCart
            }
        case REMOVE:
            console.log("YOU PUSH REMOVE", action.payload)
            //ФИЛЬТРУЕМ МАССИВ В СТЕЙТЕ ПО ВХОДЯЩЕМУ payloady
            return {
                ...state,
                cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id)
            }
        case CLEAR_CART:
            return { ...state, cart: [] }


        case GET_TOTALS:
            console.log("CONSOLE TOTALS", state.cart)
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

        default:
            return state;
    }
}

export default reducer;