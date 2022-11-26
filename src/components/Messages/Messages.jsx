import React from "react";
import { addMessageActionCreator, updateMessageInputActionCreator } from "../../redux/messagesReducer";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import style from "./Messages.module.css";

function Messages(props) {

    let peopleElements = props.state.people.map(item => <DialogItem name={item.name} id={item.id} />);

    let messagesElements = props.state.messages.map(message => <Message message={message.text} />);

    function updateMessage(event) {
        const input = event.target.value;
        props.dispatch( updateMessageInputActionCreator(input) );
    }

    function addMessage() {
        props.dispatch( addMessageActionCreator() );
    }
    return (
        <div className={style.dialogs}>
            <div className={style.messagesItems}>
                {peopleElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <div>
                    <textarea value={props.state.userInputText} onChange={updateMessage}/>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Messages;