import React from 'react';
import { Link } from 'react-router-dom';
import Error from './../components/Error.component';
import Header from '../components/Header.component';
import FormInput from '../components/FormInput.component';
import SubmitButton from './../components/SubmitButton.component';
import useForm from './../hooks/useForm.service';
import useAuth from './../hooks/useAuth.service';

export default function Register() {
    const { values, handleChange } = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }
    });

    const { registerUser, error } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        await registerUser(values);
    }

    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center">
                <div className="card m-5 p-1 w-25 border-success">
                    <div className="card-body">
                        <h3 className="card-title">Register</h3>
                        <div className="inlineForm__notif">
                            {error && <Error error={error} />}
                        </div>
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <FormInput type={"text"}
                                    placeholder={"Username"}
                                    name={"username"}
                                    value={values.username}
                                    handleChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <FormInput type={"password"}
                                    placeholder={"Enter Password"}
                                    name={"password"}
                                    handleChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <FormInput type={"password"}
                                    placeholder={"Confirm Password"}
                                    name={"passwordConfirm"}
                                    handleChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <Link to='/login'>
                                    Existing account? Log in
                                </Link>
                            </div>
                            <SubmitButton name={"Register"} type={"submit"} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}