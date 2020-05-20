import { combineReducers } from 'redux';
import tripsReducer from './Trips/trips.reducer'
import carsReducer from "./Cars/cars.reducer";
import userReducer from "./User/user.reducer";


export default combineReducers({
    trips: tripsReducer,
    cars: carsReducer,
    user: userReducer
});

