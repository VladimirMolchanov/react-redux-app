/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import todosService from "../service/todos.service";

const initialState = []

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        set(state, action) {
            return action.payload
        },
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
const { update, remove, set } = actions

export const getTasks = () => async (dispatch) => {
    try {
        const data = await todosService.fetch()
        dispatch(set(data))
    } catch (error) {
        console.error(error)
    }
}

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }))
}
export function titleChanged(id) {
    return update({ id, title: `new title for ${id}` })
}
export function taskDeleted(id) {
    return remove({ id })
}

export default reducer
