import { combineReducers } from 'redux'
import { user } from './user'
import { household } from './household'
import { members } from './members'
import {chores} from './chores'

const Reducers = combineReducers({
    userState: user,
    houseState: household,
	membersState: members,
	choresState: chores,
})

export default Reducers