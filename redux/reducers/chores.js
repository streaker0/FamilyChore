import { DONECHORES_STATE_CHANGE, UNDONECHORES_STATE_CHANGE, CLEAR_DATA } from "../constants"
const initialState = {
    currentUndoneChores: [],
	currentDoneChores: []
}

export const chores = (state = initialState, action) => {
    switch (action.type) {
        case DONECHORES_STATE_CHANGE:
            return {
                ...state,
                currentDoneChores: action.donechores
            }
		case UNDONECHORES_STATE_CHANGE:
			return {
				...state,
				currentUndoneChores: action.undonechores
			}
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}