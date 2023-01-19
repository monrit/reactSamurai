import style from "../ProfileInfo.module.css";
import { useForm } from "react-hook-form";

function ProfileInfoForm(props) {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            defaultValues
        },
        setError,
        clearErrors
    } = useForm({
        defaultValues: {
            fullName: props.profile.fullName,
            lookingForAJob: props.profile.lookingForAJob,
            lookingForAJobDescription: props.profile.lookingForAJobDescription,
            aboutMe: props.profile.aboutMe,
            contacts: {
                facebook: props.profile.contacts.facebook,
                website: props.profile.contacts.website,
                vk: props.profile.contacts.vk,
                twitter: props.profile.contacts.twitter,
                instagram: props.profile.contacts.instagram,
                youtube: props.profile.contacts.youtube,
                github: props.profile.contacts.github,
                mainLink: props.profile.contacts.mainLink
            }
        }
    });

    function saveChanges(formData) {
        if (formData.image.length !== 0) {
            props.updateProfilePicture(formData.image[0]);
        }
        delete formData.image;
        props.updateProfileInfo(formData, setError, () => props.setEditMode(false));
    }

    return (
        <div>
            <form onSubmit={handleSubmit(saveChanges)} onFocus={() => clearErrors("server")}>
                <input {...register("image")} type="file" accept="image/*" />
                <div>
                    <b>Full name:</b> <input {...register("fullName", {
                        required: "This field is required",
                        minLength: 2
                    })} />
                </div>
                <div>
                    <b>Job search:</b> <input {...register("lookingForAJob")} type="checkbox" />
                </div>
                {defaultValues.lookingForAJob && <div><b>Job search description:</b> <textarea {...register("lookingForAJobDescription")} /></div>}
                <div>
                    <b>Bio:</b> <textarea {...register("aboutMe")} />
                </div>
                <div>
                    <b>Contacts:</b> {Object.keys(props.profile.contacts).map(contact =>
                        <div key={contact} className={style.contact}><b>{contact}:</b>
                            <input {...register("contacts." + contact)} />
                        </div>)}
                </div>
                {errors.server && <div className={style.error}>{errors.server.message}</div>}
                <button>Save changes</button>
            </form>
        </div>
    );
}

export default ProfileInfoForm;