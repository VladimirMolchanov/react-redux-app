import * as actions from './actionTypes';

export function reducer(state, action) {
    switch (action.type) {
        case actions.taskUpdated: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(el => el.id === action.payload.id)
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload
            }
            return newArray
        }
        case actions.taskDeleted: {
            return state.filter((i) => i.id !== action.payload.id)
        }
        default:
            return state
    }
}
