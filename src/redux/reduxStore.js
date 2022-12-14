import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import ThunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer
})
let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

window.store = store;
export default store;