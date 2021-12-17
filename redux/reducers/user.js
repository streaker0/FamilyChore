import { USER_STATE_CHANGE,SET_LOADING, CLEAR_DATA, USER_CHORE_STATE_CHANGE, USER_POINTS_STATE_CHANGE } from "../constants"

const initialState = {
    currentUser: null,
	id:0,
	chores: [],
	points: 0,
	loading: false,
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            const data = {
                ...state,
                currentUser: action.currentUser,
				id:action.currentUser.id,
				loading: false,
            }
			return data;
		case USER_CHORE_STATE_CHANGE:
			return {
				...state,
				chores: action.chores,
				loading: false,
			}
		case USER_POINTS_STATE_CHANGE:
			return {
				...state,
				points: action.points,
				loading: false,
			}
        case CLEAR_DATA:
            return initialState
		case SET_LOADING:
			return{
				...state,
				loading: true,
			}
        default:
            return state;
    }
}