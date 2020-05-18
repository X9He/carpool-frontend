const INITIAL_STATE = {
    allTrips: []
};


const tripsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TRIP':
            return {
                ...state,
                allTrips: [...state.allTrips, action.payload]
            };
        default:
            return state;
    }
};

export default tripsReducer;
