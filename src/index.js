import React from 'react';
import ReactDOM from 'react-dom';

const App = (params) => {
    return (
        <h1>App</h1>
    );
};


ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
