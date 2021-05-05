import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './../components/FormInput.component';
import SubmitButton from './../components/SubmitButton.component';
import Prompt from './../components/Prompt.component';
import Error from './../components/Error.component';
import Header from '../components/Header.component';
import useForm from '../hooks/useForm.service';
import useAuth from '../hooks/useAuth.service';

export default function Login() {

    const { values, handleChange } = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    });

    const { loginUser, error } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(values);
    }

    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center">
                <div className="card m-5 p-1 w-25 border-success">
                    <div className="card-body">

                        <h3 className="card-title">Login</h3>
                        <div className="inlineForm__notif">
                            {error && <Error error={error} />}
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <FormInput type={"text"}
                                    placeholder={"Username"}
                                    name={"username"}
                                    value={values.username}
                                    handleChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <FormInput type={"password"}
                                    placeholder={"Password"}
                                    name={"password"}
                                    value={values.password}
                                    handleChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <Link to='/register'>
                                    No account? Create one
                                </Link>
                            </div>
                            <SubmitButton name={"login"} type={"submit"} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}