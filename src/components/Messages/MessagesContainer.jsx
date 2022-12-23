import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
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

export default withAuthRedirect( connect(mapStateToProps, mapDispatchToProps)(Messages) );