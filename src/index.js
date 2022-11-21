import './index.css';
import reportWebVitals from './reportWebVitals';
import state, { subscribe } from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addMessage, addPost, updateMessageInput, updatePostInput } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderEntireTree = (state) => {
    root.render(
    <React.StrictMode>
      <App state={state} 
      addPost={addPost} 
      addMessage={addMessage} 
      updatePostInput={updatePostInput} 
      updateMessageInput={updateMessageInput}/>
    </React.StrictMode>
  );
}

renderEntireTree(state);
subscribe(renderEntireTree);

// If you want to start measuring performance in your app, pass a functionІ
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
