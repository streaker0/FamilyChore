import { HOUSE_STATE_CHANGE, CLEAR_DATA } from "../constants"
const initialState = {
    currentHouse: '',
}

export const household = (state = initialState, action) => {
    switch (action.type) {
        case HOUSE_STATE_CHANGE:
            return {
                ...state,
                currentHouse: action.currentHouse,
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}