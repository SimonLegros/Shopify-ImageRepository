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

    return(
        <div className='page' style={{justifyContent:'center'}}>
            <Header/>
             <div className="inlineForm">
                <h3>Login</h3>
             <div className="inlineForm__notif">
                 {error && <Error error={error}/>}
             </div>
                <form onSubmit={handleLogin}>
                    <FormInput type={"text"} 
                                placeholder={"Username"} 
                                name={"username"} 
                                value={values.username} 
                                handleChange={handleChange} />
                    <FormInput type={"password"} 
                                placeholder={"Password"} 
                                name={"password"} 
                                value={values.password} 
                                handleChange={handleChange} />
                    <div className="inlineForm__submit">
                        <Link to='/register'>
                            <Prompt prompt={"No account? Create one."}/>
                        </Link>
                        <SubmitButton name={"login"} type={"submit"} /> 
                    </div>
                </form>
            </div>
        </div>
    )
}