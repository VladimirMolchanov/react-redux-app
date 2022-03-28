import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import * as actions from "./store/task/actions";

const store = configureStore()

const App = () => {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState())
        })
    }, []);

    const completeTask = (id) => {
        store.dispatch(actions.taskCompleted(id))
    }
    const changeTitle = (id) => {
        store.dispatch(actions.titleChanged(id))
    }
    const deleteTask = (id) => {
        store.dispatch(actions.taskDeleted(id))
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
                        <button onClick={() => deleteTask(el.id)}>Delete</button>
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
