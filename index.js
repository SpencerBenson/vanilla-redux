//we use require since we are using Vanilla js. If react, we'd use import statement
const redux = require('redux');

// initialize createStore Function
const createStore = redux.createStore;

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
const initialState = {
    numOfCakes: 10,
    numOfIcecreams: 20
}

//reducer = incharge of how the state changes.
// takes (previousState, action) => newState
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
}


// Create the Redux store
const store = createStore(reducer);

console.log('initialState: ', store.getState());

const unsubscribe = store.subscribe(()=> {
    console.log('Updated State', store.getState());
}
    );
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
unsubscribe();
