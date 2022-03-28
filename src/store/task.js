/* eslint-disable */
import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../service/todos.service";

const initialState = []

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
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
const { update, remove, recived } = actions

const taskRequested = createAction("task/requested")
const taskRequestFailed = createAction("task/requestFailed")

export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed(error.message))
        console.log(error.message)
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
