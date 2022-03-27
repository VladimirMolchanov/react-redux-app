import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "./store/createStore";
import { taskReducer } from "./store/taskReducer";
import * as actions from './store/actionTypes';

const initialState = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false }
]

const store = createStore(taskReducer, initialState)

const App = () => {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    }, []);

    const completeTask = (id) => {
        store.dispatch({ type: actions.taskUpdated, payload: { id, completed: true} })
    }
    const changeTitle = (taskId) => {
        store.dispatch({ type: actions.taskUpdated, payload: { id: taskId, title: `new title for ${taskId}` } })
    }
    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map(el => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>Complete</button>
                        <button onClick={() => changeTitle(el.id)}>Change title</button>
                        <hr/>
                    </li>
                ))}
            </ul>
        </>

    );
};

ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
