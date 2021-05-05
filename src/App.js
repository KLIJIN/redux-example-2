import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
//redux
import { createStore } from "redux";
import reducer from "./reducer.js"
import { Provider } from "react-redux"


const store777 = createStore(reducer);

let currentState = store777.getState();
console.log("App_currentState", currentState);

function App() {
  return (
    <Provider store={store777}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
