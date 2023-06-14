import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageForm from "./MessageForm/MessageForm";
import style from "./Messages.module.css";
import { FC } from "react";
import { InitialStateType } from "../../redux/messagesReducer";

type PropsType = {
    messagesPage: InitialStateType,
    addMessage: (text: string) => void
};

const Messages: FC<PropsType> = ({ messagesPage: { people, messages }, addMessage }) => {

    const peopleElements = people.map(item => <DialogItem key={item.id} name={item.name} id={item.id} />);
    const messagesElements = messages.map(message => <Message key={message.id} message={message.text} />);

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
};

export default Messages;