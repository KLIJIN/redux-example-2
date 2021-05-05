import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux"
import { decreaseAction, increaseAction, removeAction, clearCartAction, getTotalsAction } from "../actions"



const CartContainer = () => {

  // console.log("CartContainer", cartArray)

  //---------selectors ------------------------------------------
  const total = useSelector(state => state.total);
  const cartArray = useSelector(state => state.cart)
  //---------selectors ------------------------------------------


  const dispatch = useDispatch();
  //--------dispatching actions-----------------------
  const removeFunc = (id) => (
    dispatch(removeAction(id))
  )

  const increaseFunc = (id, amount) => {
    dispatch(increaseAction(id, amount))
  }

  const decreaseFunc = (id, amount) => (
    dispatch(decreaseAction(id, amount))
  )
  //--------dispatching actions-----------------------

  //каждый раз, когда меняется cartArray мы обновляем в стейте значения total и amount
  useEffect(() => {
    dispatch(getTotalsAction())
  }, [cartArray, dispatch])


  if (cartArray.length === 0) {
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
        {cartArray.map(item => {
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
        <button className="btn clear-btn" onClick={() => { dispatch(clearCartAction()) }} >   Clear Cart   </button>
      </footer>
    </section>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cartArray: state.cart,
//     total: state.total
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   clearCart: () => {
//     dispatch(clearCartAction())
//   },
//   decrease: (id, amount) => {
//     dispatch(
//       decreaseAction(id, amount)
//     )
//   },
//   increase: (id, amount) => {
//     dispatch(
//       increaseAction(id, amount)
//     )
//   },


// })

export default CartContainer;