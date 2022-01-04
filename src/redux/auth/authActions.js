import apiService from "../../services/api-service";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL} from "./authTypes";
import {addStarship, dataAreLoading, dataHaveError} from "../starships/starshipsActions";

const api = new apiService();

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
})

export const registerFail = () => ({
    type: REGISTER_FAIL
})
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const loginFail = (bool) => ({
    type: LOGIN_FAIL,
    haveError: bool
})

export function addLoginSuccessThunk(item) {
    return (dispatch) => {
        api.getUser(item)
            .then((response) => dispatch(loginSuccess(response)));
    };
}

export function addRegisterSuccessThunk(item) {
    return (dispatch) => {
        api.registerUser(item)
            .then((response) => dispatch(registerSuccess(response)));
    }
}


