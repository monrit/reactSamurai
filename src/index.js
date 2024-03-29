import './index.css';
import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
//React.StrictMode забрав бо два рази рендерить і два запити на сервак шле, а вони обмежені.
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);


// If you want to start measuring performance in your app, pass a functionІ
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
