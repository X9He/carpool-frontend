const INITIAL_STATE = {
    current_user: {},
    token: null
};


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
