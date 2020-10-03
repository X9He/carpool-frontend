import {
    REQUEST_CARS,
    RECEIVE_CARS,
    INVALIDATE_CARS
} from './cars.actions.js'

const INITIAL_STATE = {
    isFetching: false,
    errorMessage: "",
    cars: []
};

const carsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADDED_CAR':
            return {
                ...state,
                cars: [...state.cars, action.payload]
            };
        case 'UPDATE_CAR':
            return {
                ...state,
                cars: [...state.cars, action.payload]
            };
        case 'DELETED_CAR':
            return {
                ...state,
                cars: [...state.cars.filter(car => car._id !== action.payload)]
            }
        case RECEIVE_CARS:
            return {
                ...state,
                isFetching: false,
                cars: action.cars == null ? [] : JSON.parse(action.cars)
            }
        case REQUEST_CARS:
            return {
                ...state,
                isFetching: true
            }
        case "CAR_ERROR":
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
};

export default carsReducer;
