const INITIAL_STATE = {
    cars: []
};


const carsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_CAR':
            return {
                ...state,
                cars: [...state.cars, action.payload]
            };
        case 'UPDATE_CAR':
            return {
                ...state,
                cars: [...state.cars, action.payload]
            };
        default:
            return state;
    }
};

export default carsReducer;
