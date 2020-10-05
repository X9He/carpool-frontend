import * as Config from "../../config";

export const addedTrip = trip => ({
    type: 'ADDED_TRIP',
    payload: trip
});

function receivedTrips(json) {
    return {
        type: 'RECEIVED_TRIPS',
        trips: json.trips,
        receivedAt: Date.now()
    }
}

export const deletedTrip = id => ({
    type: 'DELETED_TRIP',
    payload: id
});

export const errorMessage = message => ({
    type: 'TRIP_ERROR',
    payload: message
});

export function fetchTrips(token) {
    return function (dispatch) {
        return fetch(Config.API_ROOT + '/trips', {
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
            .then(
                response => response.json()
            )
            .then(json => {
                    dispatch(receivedTrips(json))
                }
            )
    }
}

export function addTrip(token, trip) {
    return function (dispatch) {
        return fetch(Config.API_ROOT + '/trips', {
            method: 'POST',
            body: JSON.stringify(trip),
            headers: {
                'x-access-token': token,
            }
        })
            .then(
                response => {
                    if (!response.ok) { throw response }
                    dispatch(addedTrip(trip))
                }
            )
            .catch( err => {
                dispatch(errorMessage(err["message"]));
            })
    }
}

export function deleteTrip(token, id) {
    return function (dispatch) {
        return fetch(Config.API_ROOT + '/trips', {
            method: 'DELETE',
            body: JSON.stringify(id),
            headers: {
                'x-access-token': token,
            }
        })
            .then(
                response => {
                    if (!response.ok) { throw response }
                    dispatch(deletedTrip(id))
                }
            )
            .catch( err => {
                dispatch(errorMessage(err["message"]));
            })
    }
}
