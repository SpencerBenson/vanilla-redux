
const redux = require('redux');


const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';


//action creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    }
}

//reducer = inncharge of how the state changes

//(previousState, action) => newState
const initialState = {
    numOfCakes: 10
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
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
