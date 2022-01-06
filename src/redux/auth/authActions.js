import apiService from "../../services/api-service";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_IS_AUTHENTICATED} from "./authTypes";
import {clearMessage, setMessage} from "./messages/messagesAction";

const api = new apiService();


export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export const registerFail = (payload) => ({
    type: REGISTER_FAIL,
    payload
})
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const loginFail = (bool) => ({
    type: LOGIN_FAIL,
    isFailed: bool
})


export const setIsAuthenticated = (bool) => ({
    type: SET_IS_AUTHENTICATED,
    isAuthenticated: bool
})

export function addLoginSuccessThunk(item, history) {
    return (dispatch) => {
        api.getUser(item)
            .then((response) => {
                dispatch(loginSuccess(response))
                dispatch(setIsAuthenticated(true))
                dispatch(clearMessage())
                history('/');
            })
            .catch((e) => {
                dispatch(loginFail(true))
                dispatch(setMessage(e.message))
            });
    };
}

export function addRegisterSuccessThunk(item) {
    return (dispatch) => {
        api.registerUser(item)
            .then((response) => dispatch(registerSuccess(response)));
    }
}


