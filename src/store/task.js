/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import todosService from "../service/todos.service";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
}

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            }
        },
        remove(state, action) {
            state.entities = state.entities.filter((i) => i.id !== action.payload.id)
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            state.isLoading = false
            state.error = action.payload
        }
    }
})
const { actions, reducer } = slice
const { update, remove, recived, taskRequested, taskRequestFailed } = actions

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
