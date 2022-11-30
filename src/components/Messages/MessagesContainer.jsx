import { connect } from "react-redux";
import { addMessageActionCreator, updateMessageInputActionCreator } from "../../redux/messagesReducer";
import Messages from "./Messages";

const mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch( addMessageActionCreator() );
        },
        updateMessage: (text) => {
            dispatch( updateMessageInputActionCreator(text) );
        }
    };
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;