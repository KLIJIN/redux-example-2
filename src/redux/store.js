//old stuff
// import { createStore } from "redux";
// import reducer from "./redux/redusers/reducer.js"

//import ToolkitReducer from "./redux/redusers/toolkitReducer"

//new version reducer
import SliseReducer from "./redusers/toolkitSlice"
import {
  configureStore,
  //combineReducers
} from "@reduxjs/toolkit"
// import { combineReducers } from 'redux'

//const store777 = createStore(reducer);



// const rootReducer = combineReducers({
//   reducer777: SliseReducer
// })


// const store = configureStore({
//   reducer: rootReducer    //<-- при использовании комбайна
// })



export const store = configureStore({
  reducer: {
    reducer777: SliseReducer,    //<-- комбайним сразу внутри configureStore
    //second: secondReducer,
    //third: thirdReducer,
  },
})

console.log('STORE', store.getState());