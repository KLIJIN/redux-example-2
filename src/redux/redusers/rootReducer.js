
//combineReducers() позволяет объединить несколько редьюсеров в один.
import { combineReducers } from 'redux'
import ToolkitReducer from "./toolkitReducer.js"


export const rootReducer = combineReducers({
  ToolkitReducer
})

