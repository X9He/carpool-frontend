import {UserActionTypes} from "./user.types";

const INITIAL_STATE = {
    current_user: {},
    token: "",
    user_type:""
};


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            return {
                ...state,
                token: action.payload
            };
        case 'REMOVE_TOKEN':
            return {
                ...state,
                token: ""
            };
        case UserActionTypes.SET_USER_TYPE:
            return {
                ...state,
                user_type: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
