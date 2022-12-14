import { connect } from "react-redux";
import { compose } from "redux";
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Messages);