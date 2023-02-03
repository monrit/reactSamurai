import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";
import Header from "./Header";

type MapStateType = {
    isAuth: boolean,
    login: string | null
};
type DispathStateToPropsType = {
    logout: () => void
};
type PropsType = MapStateType & DispathStateToPropsType;

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login}
            logout={this.props.logout} />;
    }
}

function mstp(state: AppStateType): MapStateType {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect<MapStateType, DispathStateToPropsType, null, AppStateType>(mstp, { logout })(HeaderContainer);