import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addPost, userInput } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let renderEntireTree = (state) => {
    root.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} userInput={userInput}/>
    </React.StrictMode>
  );
}
