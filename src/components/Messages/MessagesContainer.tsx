import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { addMessage, InitialStateType } from "../../redux/messagesReducer";
import { AppStateType } from "../../redux/reduxStore";
import Messages from "./Messages";

type MapStateType = {
    messagesPage: InitialStateType
};
type DispathStateToPropsType = {
    addMessage: (text: string) => void
};

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        messagesPage: state.messagesPage
    };
};

export default compose(
    connect<MapStateType, DispathStateToPropsType, null, AppStateType>(mapStateToProps, { addMessage }),
    withAuthRedirect
)(Messages);