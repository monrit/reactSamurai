import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login}
            logout={this.props.logout} />;
    }
}

function mstp(state) {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mstp, { logout })(HeaderContainer);