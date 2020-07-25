//we use require since we are using Vanilla js. If react, we'd use import statement
const redux = require('redux');

//Create the Redux store
const createStore = redux.createStore;

//defining our BUY_CAKE action
const BUY_CAKE = 'BUY_CAKE';


//action creator function. Returs the type and info.
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    }
}




//Creating the initial state.
const initialState = {
    numOfCakes: 10
}

//reducer = incharge of how the state changes.
// takes (previousState, action) => newState
const reducer = (state = initialState,action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state, // Spread initial state then update numOfCakes
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}



const store = createStore(reducer);
console.log('initialState: ', store.getState());
const unsubscribe = store.subscribe(()=> {
    console.log('Updated State', store.getState());
}
    );
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
