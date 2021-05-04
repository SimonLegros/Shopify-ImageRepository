import React from 'react';
import { Link } from 'react-router-dom';
import Error from './../components/Error.component';
import Header from '../components/Header.component';
import FormInput from '../components/FormInput.component';
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
        <div className="page" style={{ justifyContent: 'center' }}>
            <Header/>
            <div className="inlineForm">
                <h3>Register</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages} />}
                </div>
                <form onSubmit={handleRegister}>
                    <FormInput type={"text"} 
                                    placeholder={"Username"} 
                                    name={"username"} 
                                    value={values.username} 
                                    handleChange={handleChange} />
                    <div className="flex column">
                        <input type="password"
                            className="input"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        <input type="password"
                            className="input"
                            placeholder="Confirm Password"
                            name="passwordConfirm"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inlineForm__submit">
                        <Link to='/login'>
                            Existing account? Log in
                        </Link>
                        <button className="btn" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}