export function appReducer(state = {name: 'Oleg'}, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload}
        default:
            return state
    }
}