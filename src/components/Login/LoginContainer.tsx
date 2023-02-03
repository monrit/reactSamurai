import { connect } from "react-redux";
import { login, logout } from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";
import Login from "./Login";

type MapStateType = {
    isAuth: boolean,
    captchaUrl: string | null
};
type DispathStateToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, setError: any, captcha?: string | null) => void,
    logout: () => void
};

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
};

export default connect<MapStateType, DispathStateToPropsType, null, AppStateType>(mapStateToProps, { login, logout })(Login);