import {EMPLOYEES_FETCH_SUCCESS} from '../actions/types'

const initialSate = {}

export default (state = initialSate, action) => {
    switch (action.type) {
        case EMPLOYEES_FETCH_SUCCESS:
            return action.payload
        default:
            return state
    }
}
