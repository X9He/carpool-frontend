import * as Config from "../../config";

export const addedCar = car => ({
    type: 'ADDED_CAR',
    payload: car
});

export const errorMessage = message => ({
    type: 'CAR_ERROR',
    payload: message
});

export const updateCar = car => ({
    type: 'UPDATE_CAR',
    payload: car
});

export const deletedCar = id => ({
    type: 'DELETED_CAR',
    payload: id
});

export const REQUEST_CARS = 'REQUEST_CARS'
function requestCars() {
    return {
        type: REQUEST_CARS
    }
}

export const RECEIVE_CARS = 'RECEIVE_CARS'
function receiveCars(json) {
    return {
        type: RECEIVE_CARS,
        cars: json.cars,
        receivedAt: Date.now()
    }
}

export const INVALIDATE_CARS= 'INVALIDATE_CARS'
export function invalidateCars(cars) {
    return {
        type: INVALIDATE_CARS,
        cars
    }
}

export function fetchCars(token) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestCars())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(Config.API_ROOT + '/cars', {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then(
                response => response.json()
            )
            .then(json =>
                dispatch(receiveCars(json))
            )
    }
}

export function addCar(token, car) {
    return function (dispatch) {

        return fetch(Config.API_ROOT + '/cars', {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'x-access-token': token,
            }
        })
            .then(
                response => {
                    if (!response.ok) { throw response }
                    dispatch(addedCar(car))
                }
            )
            .catch( err => {
                err.json().then(errJson => {
                    dispatch(errorMessage(errJson["message"]));
                })
            })
    }
}

export function deleteCar(token, id) {
    return function (dispatch) {
        return fetch(Config.API_ROOT + '/cars', {
            method: 'DELETE',
            body: JSON.stringify(id),
            headers: {
                'x-access-token': token,
            }
        })
            .then(
                response => {
                    if (!response.ok) { throw response }
                    dispatch(deletedCar(id))
                }
            )
            .catch( err => {
                dispatch(errorMessage(err["message"]));
            })
    }
}
