import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux"
//import { decreaseAction, increaseAction, removeAction, clearCartAction, getTotalsAction } from "../redux/actions"
// import { increase, decrease, remove, clearCart, getTotals } from "../redux/redusers/toolkitReducer"
import { increase, decrease, remove, clearCart, getTotals } from "../redux/redusers/toolkitSlice"


const CartContainer = () => {

  // console.log("CartContainer", cartArray)

  //---------selectors ------------------------------------------
  // const cartArray = useSelector(state => state.cart)                   //<-- было при одном редьюсере

  const ToolkitReducer = useSelector(state => state.reducer777);      //<-- стало при использовании комбайна configureStore
  const { cart: cartArray, total } = ToolkitReducer                   //<-- стало при использовании комбайна configureStore

  //---------selectors ------------------------------------------


  const dispatch = useDispatch();
  //--------dispatching actions-----------------------
  const removeFunc = ({ id }) => (
    dispatch(remove({ id: id }))
  )

  const increaseFunc = (id, amount) => {

    dispatch(increase(id, amount));
    // increase(id, amount);
  }

  const decreaseFunc = (id, amount) => (
    dispatch(decrease(id, amount))
  )
  //--------dispatching actions-----------------------

  //каждый раз, когда меняется cartArray мы обновляем в стейте значения total и amount
  useEffect(() => {
    dispatch(getTotals())
  }, [cartArray, dispatch])


  if (cartArray?.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }


  return (
    <section className="cart">
      {/* cart section header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <article>
        {cartArray?.map(item => {
          return <CartItem key={item.id} {...item} decrease={decreaseFunc} increase={increaseFunc} remove={removeFunc} />;
        })}
      </article>
      {/* cart section footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => { dispatch(clearCart()) }} >   Clear Cart   </button>
      </footer>
    </section>
  );
};

export default CartContainer;