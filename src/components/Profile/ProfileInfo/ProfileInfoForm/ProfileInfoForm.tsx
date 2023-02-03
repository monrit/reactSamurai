import style from "../ProfileInfo.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { ContactsType, ProfileType } from "../../../../types/types";
import { FC } from "react";

type PropsType = {
    profile: ProfileType,
    updateProfilePicture: (img: File) => void,
    updateProfileInfo: (profileInfo: InputsType, setError: any, setEditModeFalse: () => void) => void,
    setEditMode: (mode: boolean) => void
};
export type InputsType = {
    image: Array<File>,
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    server: null,
    contacts: ContactsType
};

const ProfileInfoForm: FC<PropsType> = ({ profile, updateProfilePicture, updateProfileInfo, setEditMode }) => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            defaultValues
        },
        setError,
        clearErrors
    } = useForm<InputsType>({
        defaultValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: {
                facebook: profile.contacts.facebook,
                website: profile.contacts.website,
                vk: profile.contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink
            }
        }
    });

    const saveChanges: SubmitHandler<InputsType> = (formData) => {
        if (formData.image.length) {
            updateProfilePicture(formData.image[0]);
        }
        updateProfileInfo(formData, setError, () => setEditMode(false));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(saveChanges)} onChange={() => clearErrors("server")}>
                <input {...register("image")} type="file" accept="image/*" />
                <div>
                    <b>Full name: </b><input {...register("fullName", {
                        required: "This field is required",
                        minLength: 2
                    })} />
                </div>
                <div>
                    <b>Job search: </b><input {...register("lookingForAJob")} type="checkbox" />
                </div>
                {defaultValues?.lookingForAJob && <div><b>Job search description:</b> <textarea {...register("lookingForAJobDescription")} /></div>}
                <div>
                    <b>Bio: </b><textarea {...register("aboutMe")} />
                </div>
                <div>
                    <b>Contacts: </b>
                    <div className={style.contact}><b>Facebook:</b>
                            <input {...register(`contacts.facebook`)} />
                    </div>
                    <div className={style.contact}><b>Website:</b>
                            <input {...register(`contacts.website`)} />
                    </div>
                    <div className={style.contact}><b>Vk:</b>
                            <input {...register(`contacts.vk`)} />
                    </div>
                    <div className={style.contact}><b>Twitter:</b>
                            <input {...register(`contacts.twitter`)} />
                    </div>
                    <div className={style.contact}><b>Instagram:</b>
                            <input {...register(`contacts.instagram`)} />
                    </div>
                    <div className={style.contact}><b>YouTube:</b>
                            <input {...register(`contacts.youtube`)} />
                    </div>
                    <div className={style.contact}><b>GitHub:</b>
                            <input {...register(`contacts.github`)} />
                    </div>
                    <div className={style.contact}><b>MainLink:</b>
                            <input {...register(`contacts.mainLink`)} />
                    </div>
                </div>
                <ErrorMessage errors={errors} name="server" render={({ message }) => <div className={style.error}>{message}</div>} />
                <button>Save changes</button>
                <button onClick={e => {
                    e.preventDefault();
                    setEditMode(false);
                }}>Cancel</button>
            </form>
        </div>
    );
}

export default ProfileInfoForm;