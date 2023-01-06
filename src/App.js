import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import React from "react";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initalized) {
            return <Preloader />;
        }
        return (
            <BrowserRouter>
                <div className="my-app-wrapper">
                    <HeaderContainer />
                    <Navbar state={this.props.state.sidebar} />
                    <div className="my-app-content">
                        <Routes>
                            <Route path="/profile/:userId" element={<ProfileContainer />} />
                            <Route path="/profile" element={<ProfileContainer />} />
                            <Route path="/messages/*" element={<MessagesContainer />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/music" element={<Music />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/users" element={<UsersContainer />} />
                            <Route path="/login" element={<LoginContainer />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        initalized: state.app.initialized,
        isAuth: state.auth.isAuth
    };
};

export default compose(
    connect(mapStateToProps, { initializeApp })
)(App);
