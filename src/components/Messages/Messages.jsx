import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import style from "./Messages.module.css";

function Messages(props) {

    let peopleElements = props.state.people.map(item => <DialogItem name={item.name} id={item.id} />);

    let messagesElements = props.state.messages.map(message => <Message message={message.text} />);

    let text = React.createRef();

    function updateMessage() {
        props.dispatch({
            type: "UPDATE-MESSAGE-INPUT",
            input: text.current.value
        });
    }

    function addMessage() {
        props.dispatch({
            type: "ADD-MESSAGE"
        });
    }
    return (
        <div className={style.dialogs}>
            <div className={style.messagesItems}>
                {peopleElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <div>
                    <textarea ref={text} value={props.state.userInputText} onChange={updateMessage}/>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Messages;