const redux = require('redux');
const axios = require('axios');
const reduxThunk = require('redux-thunk').default;


const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''

            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

//async action creator. returns an action. 
const fetchUser = () => {
    return function (dispatch){

        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {

            // console.log('response:',response.data);
            //response.data is the array of the users
            const users = response.data.map(user => user.address
            );
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            //error.message is the error description
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(reduxThunk));
store.subscribe(() => { console.log(store.getState());
  

});
store.dispatch(fetchUser())