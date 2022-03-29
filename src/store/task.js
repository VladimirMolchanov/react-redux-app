/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import todosService from "../service/todos.service";
import { setError } from "./errors";

const initialState = {
    entities: [],
    isLoading: true
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
        add(state, action) {
            state.entities.unshift(action.payload)
        },
        remove(state, action) {
            state.entities = state.entities.filter((i) => i.id !== action.payload.id)
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestedSuccess(state) {
            state.isLoading = false
        },
        taskRequestFailed(state) {
            state.isLoading = false
        }
    }
})
const { actions, reducer: tasksReducer } = slice
const { update, remove, add, recived, taskRequested, taskRequestedSuccess, taskRequestFailed } = actions

export const createTask = (payload) => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.create(payload)
        dispatch(taskRequestedSuccess())
        dispatch(add(data))
    } catch (error) {
        dispatch(taskRequestFailed(error.message))
        dispatch(setError(error.message))
    }
}
export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed(error.message))
        dispatch(setError(error.message))
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

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default tasksReducer
