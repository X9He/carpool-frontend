import {UserActionTypes} from "./user.types";

export const loginSuccess = token => ({
    type: 'ADD_TOKEN',
    payload: token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
    payload: ""
});

export const setUserType = type => ({
    type: UserActionTypes.SET_USER_TYPE,
    payload: type
})
