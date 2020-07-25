//we use require since we are using Vanilla js. If react, we'd use import statement
const redux = require('redux');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware

// initialize createStore Function
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

//defining our BUY_CAKE action
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';


//action creator function. Returs the type and info.
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    }
}
function buyIceCream(){
    return{
        type: BUY_ICECREAM,
        info:'buy cold Icecream'
    }
}





//Creating the initial state.
// const initialState = {
//     numOfCakes: 10,
//     numOfIcecreams: 20
// }

const initialCakeState = {
    numOfCakes: 15
}
const InitialIceCreamState = {
    numOfIcecreams: 18
}

//reducer = incharge of how the state changes.
// takes (previousState, action) => newState

/*
const reducer = (state = initialState,action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state, // Spread initial state then update numOfCakes
            numOfCakes: state.numOfCakes - 1
        }
        break;
        case BUY_ICECREAM: return{
            ...state,
            numOfIcecreams: state.numOfIcecreams - 2
        }
        default: return state
    }
} */


/**
 * Working with multiple reducers
 */
const cakeReducer = (state = initialCakeState,action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state, // Spread initial state then update numOfCakes
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}
const iceCreamReducer = (state = InitialIceCreamState,action) => {
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state, // Spread initial state then update numOfCakes
            numOfIcecreams: state.numOfIcecreams - 2.5
        }
        default: return state
    }
}
//combining reducers

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer
})
// Create the Redux store
const store = createStore(rootReducer,applyMiddleware(logger));


const unsubscribe = store.subscribe(()=> {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
unsubscribe();
