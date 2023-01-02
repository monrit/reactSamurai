import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageForm from "./MessageForm/MessageForm";
import style from "./Messages.module.css";

function Messages(props) {

    const state = props.messagesPage;

    const peopleElements = state.people.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />);
    const messagesElements = state.messages.map(message => <Message key={message.id} message={message.text} />);

    function addMessage(text) {
        props.addMessage(text);
    }
    return (
        <div className={style.dialogs}>
            <div className={style.messagesItems}>
                {peopleElements}
            </div>
            <div className={style.messages}>
                {messagesElements}
                <MessageForm addMessage={addMessage}/>
            </div>
        </div>
    );
}

export default Messages;