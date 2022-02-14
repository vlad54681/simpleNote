import { applyMiddleware, combineReducers, createStore } from "redux";
import appReducer from './app-reducer';
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
	appPage: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;