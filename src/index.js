import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/store'
import { completeTask, titleChanged, taskDeleted, getTasks } from "./store/task";
import { Provider, useSelector } from "react-redux";

const store = createStore()

const App = () => {
    const state = useSelector((state) => state)
    useEffect(() => {
        store.dispatch(getTasks())
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
