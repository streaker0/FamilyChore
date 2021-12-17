import { MEMBERS_STATE_CHANGE, CLEAR_DATA } from "../constants"
const initialState = {
    currentMembers: [],
}

export const members = (state = initialState, action) => {
    switch (action.type) {
        case MEMBERS_STATE_CHANGE:
            return {
                ...state,
                currentMembers: action.members
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}