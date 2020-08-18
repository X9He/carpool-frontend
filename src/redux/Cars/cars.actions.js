export const addCar = car => ({
    type: 'ADD_CAR',
    payload: car
});

export const updateCar = car => ({
    type: 'UPDATE_CAR',
    payload: car
});

export const fetchCars = car => ({ type: 'FETCH_POSTS' });

export const fetchCarsSuccess = car => ({ type: 'FETCH_POSTS', status: 'error', error: 'Oops' });

export const fetchCarsFail = car => ({ type: 'FETCH_POSTS', status: 'success', response: {} });
