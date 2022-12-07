import { connect } from "react-redux";
import { addMessage, updateMessageInput } from "../../redux/messagesReducer";
import Messages from "./Messages";

const mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    };
};

const mapDispatchToProps = {
    addMessage, 
    updateMessageInput
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);