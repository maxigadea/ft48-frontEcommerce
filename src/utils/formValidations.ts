import { LoginErrorProps, LoginProps } from "@/types";


export function validateLoginForm(values: LoginProps): LoginErrorProps {
    let errors: LoginErrorProps = {};
    if(!values.email) {
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    } else if (!values.password) {
        errors.password = "Password is required"
    }

    return errors;
}