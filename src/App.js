import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Messages from './components/Messages/Messages';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from "./components/Settings/Settings";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="my-app-wrapper">
        <Header />
        <Navbar state={props.store.getState().sidebar}/>
        <div className="my-app-content">
          <Routes>
            <Route path="/profile" element={<Profile store={props.store} state={props.state.profilePage}/>} />
            <Route path="/messages/*" element={<Messages store={props.store} state={props.state.messagesPage}/>} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
