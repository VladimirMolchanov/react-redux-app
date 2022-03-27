import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as actions from './store/actionTypes';
import { initiateStore } from "./store/store";

const store = initiateStore()

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
