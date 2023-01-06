import React, { useState } from "react";
import { useEffect } from "react";

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
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    function activateEditMode() {
        setEditMode(true);
    }

    function deactivateEditMode() {
        setEditMode(false);
        if (status !== props.status) {
            props.updateUserStatus(status);
        }
    }

    function changeStatus(e) {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {editMode
                ?
                <div>
                    <input autoFocus value={status} onChange={changeStatus} onBlur={deactivateEditMode} />
                </div>
                :
                <div onDoubleClick={activateEditMode}>
                    <span>{props.status}</span>
                </div>}
        </div>
    );
}

export default ProfileStatus;