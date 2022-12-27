import React, { useState } from "react";

class ProfileStatusC extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode() {
        this.setState({
            editMode: true
        });
    }

    deactivateUserStatus() {
        this.setState({
            editMode: false
        });
        if (this.state.status !== this.props.status) {
            this.props.updateUserStatus(this.state.status);
        }
    }

    onInput(e) {
        this.setState({
            status: e.currentTarget.value
        })
    } 

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ?
                    <div>
                        <input onChange={this.onInput.bind(this)} autoFocus value={this.state.status} onBlur={this.deactivateUserStatus.bind(this)} />
                    </div>
                    :
                    <div onDoubleClick={this.activateEditMode.bind(this)}>
                        <span>{this.props.status}</span>
                    </div>}
            </div>
        );
    }
}

function ProfileStatus(props) {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status ? props.status : "set status");

    function editClick() {
        setEditMode(!editMode);
    }

    function changeStatus(e) {
        setStatus(e.target.value);
    }

    return (
        <div>
            {editMode
                ?
                <div>
                    <input autoFocus value={status} onChange={changeStatus} onBlur={editClick} />
                </div>
                :
                <div onClick={editClick}>
                    <span>{status}</span>
                </div>}
        </div>
    );
}

export default ProfileStatusC;