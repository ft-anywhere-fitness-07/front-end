import * as yup from 'yup';

const schema = yup.object().shape({
    username:
        yup.string().trim()
            .required("A username is required"),
    
    email:
        yup.string()
            .required("A valid email is required")
            .email("A valid email address is required"),
    
    password:
        yup.string()
            .required("A password is required"),

    role:
        yup.string()
            .required("Role is required")
})

export default schema;