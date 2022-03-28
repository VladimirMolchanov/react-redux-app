import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/store'
import { completeTask, titleChanged, taskDeleted, getTasks } from "./store/task";
import { Provider } from "react-redux";

const store = createStore()

const App = () => {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.dispatch(getTasks())
        store.subscribe(() => {
            setState(store.getState())
        })
    }, []);

    const changeTitle = (id) => {
        store.dispatch(titleChanged(id))
    }
    const deleteTask = (id) => {
        store.dispatch(taskDeleted(id))
    }
    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map(el => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => store.dispatch(completeTask(el.id))}>Complete</button>
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
      <Provider store={store}>
          <App/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
