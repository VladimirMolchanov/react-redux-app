import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false }
]

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        update(state, action) {
            const elementIndex = state.findIndex(el => el.id === action.payload.id)
            state[elementIndex] = {
                ...state[elementIndex],
                ...action.payload
            }
        },
        remove(state, action) {
            return state.filter((i) => i.id !== action.payload.id)
        }
    }
})
const { actions, reducer } = slice
const { update, remove } = actions

export function taskCompleted(id) {
    return update({ id, completed: true })
}
export function titleChanged(id) {
    return update({ id, title: `new title for ${id}` })
}
export function taskDeleted(id) {
    return remove({ id })
}

export default reducer
