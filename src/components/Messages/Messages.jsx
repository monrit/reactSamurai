import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import style from "./Messages.module.css";

function Messages(props) {

    const state = props.messagesPage;

    const peopleElements = state.people.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />);
    const messagesElements = state.messages.map(message => <Message key={message.id} message={message.text} />);

    function updateMessage(event) {
        const input = event.target.value;
        props.updateMessageInput(input);
    }

    function addMessage() {
        props.addMessage();
    }
    return (
        <div className={style.dialogs}>
            <div className={style.messagesItems}>
                {peopleElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <div>
                    <textarea value={state.userInputText} onChange={updateMessage}/>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Messages;