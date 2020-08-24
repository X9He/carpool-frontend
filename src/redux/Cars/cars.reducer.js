import {
    REQUEST_CARS,
    RECEIVE_CARS,
    INVALIDATE_CARS
} from './cars.actions.js'

const INITIAL_STATE = {
    isFetching: false,
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
        case RECEIVE_CARS:
            return {
                ...state,
                isFetching: false,
                cars: action.cars
            }
        case REQUEST_CARS:
            return {
                ...state,
                isFetching: true
            }
        default:
            return state;
    }
};

export default carsReducer;
