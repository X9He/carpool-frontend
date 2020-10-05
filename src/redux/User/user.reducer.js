const INITIAL_STATE = {
    current_user: {},
    token: ""
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
        default:
            return state;
    }
};

export default userReducer;
