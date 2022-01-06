import { REGISTER_SUCCESS, LOGIN_SUCCESS, SET_IS_AUTHENTICATED, LOGIN_FAIL } from "./authTypes";

let initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: false,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.isFailed
            }
        case SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case REGISTER_SUCCESS:
            return {
                initialState
            }
        default:
            return state
    }
}