import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { addMessage, addPost, updateMessageInput, updatePostInput } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
export let renderEntireTree = (state) => {
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
