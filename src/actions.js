//actions
export const DECREASE = "DECREASE";
export const INCREASE = "INCREASE";
export const REMOVE = "REMOVE";

export const CLEAR_CART = "CLEAR_CART";
export const GET_TOTALS = "GET_TOTALS";
export const GET_AMOUNT = "GET_AMOUNT";
export const TOGGLE_AMOUNT = "TOGGLE_AMOUNT"

//actionCreators
export const clearCartAction = () => {
    return { type: CLEAR_CART }
}

export const getTotalsAction = () => {
    return { type: GET_TOTALS }
}

export const removeAction = (id) => {
    return {
        type: REMOVE,
        payload: { id }
    }
}

export const increaseAction = (id, amount) => {
    // console.log("increaseAction")
    return {
        type: INCREASE,
        payload: { id, amount }
    }
}

export const decreaseAction = (id, amount) => {
    // console.log("decreaseAction")
    return {
        type: DECREASE,
        payload: { id, amount }
    }
}

