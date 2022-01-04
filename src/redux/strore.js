import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {peopleReducer} from "./people/peopleReducer";
import {starshipsReducer} from "./starships/starshipsReducer";
import {combineReducers} from "redux";
import {authReducer} from "./auth/authReducer";

const combinedReducers = combineReducers({
    people: peopleReducer,
    starships: starshipsReducer,
    auth: authReducer
});
    const store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;