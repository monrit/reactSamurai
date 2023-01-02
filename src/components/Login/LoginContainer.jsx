import { connect } from "react-redux";
import { login, logout } from "../../redux/authReducer";
import Login from "./Login";

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, { login, logout })(Login);