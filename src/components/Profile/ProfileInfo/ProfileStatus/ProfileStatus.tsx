import React, { ChangeEvent, FC, useState } from "react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./ProfileStatus.module.css";

type ClassPropsType = {
    status: string,
    updateUserStatus: (status: string) => void
};
type ClassStateType = {
    editMode: boolean,
    status: string 
};

export class ProfileStatusC extends React.Component<ClassPropsType, ClassStateType> {

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

    onInput(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ClassPropsType, prevState: ClassStateType) {
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

type PropsType = {
    statusProps: string,
    canEditStatus: boolean,
    updateUserStatus: (status: string) => void
};
type InputTypes = {
    status: string
};

const ProfileStatus: FC<PropsType> = ({ statusProps, canEditStatus, updateUserStatus }) => {
    //THIS REACT HOOK FORM FAILS TESTS IDK HOW TO TEST REACT HOOK FORM AND HOOKS
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(statusProps);
    const {
        register,
        handleSubmit,
    } = useForm<InputTypes>({
        mode: "onBlur",
        defaultValues: {
            status: status
        }
    })

    useEffect(() => {
        setStatus(statusProps);
    }, [statusProps]);

    function activateEditMode() {
        if (canEditStatus) {
            setEditMode(true);
        }
    }

    const deactivateEditMode: SubmitHandler<InputTypes> = (data) => {
        setEditMode(false);
        if (data.status !== status) {
            updateUserStatus(data.status);
        }
    };

    return (
        <div>
            {editMode
                ?
                <form onBlur={handleSubmit(deactivateEditMode)} onSubmit={handleSubmit(deactivateEditMode)}>
                    <input {...register("status", {
                        required: true,
                    })} autoFocus className={style.status}/>
                </form>
                :
                <div>
                    <span onDoubleClick={activateEditMode}><b>Status:</b> {status}</span>
                </div>}
        </div>
    );
};

export const ProfileStatusWithoutHookForm: FC<PropsType> = ({ statusProps, canEditStatus, updateUserStatus }) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(statusProps);

    useEffect(() => {
        setStatus(statusProps);
    }, [statusProps]);

    function activateEditMode() {
        if (canEditStatus) {
            setEditMode(true);
        }
    }

    function deactivateEditMode() {
        setEditMode(false);
        if (status !== statusProps) {
            updateUserStatus(status);
        }
    }

    function changeStatus(e: ChangeEvent<HTMLInputElement>) {
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
                <div>
                    <span onDoubleClick={activateEditMode}>{statusProps}</span>
                </div>}
        </div>
    );
};

export default ProfileStatus;