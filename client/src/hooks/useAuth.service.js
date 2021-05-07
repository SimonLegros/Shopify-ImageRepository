import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext.service';  

export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext = async () => {
        return await axios.get('auth/user').then(res => {       
            setUser(res.data.currentUser);  
            history.push('/home');                     
            }).catch((err) => {
            setError(err.response.data);
        })
    }

    //register user  
    const registerUser = async (data) => {
        const { username, password, passwordConfirm } = data;
        return axios.post(`auth/register`, {
            username,
            password,
            passwordConfirm
        }).then(async (res) => {
            localStorage.setItem('token', res.data.token);
            await setUserContext();
        }).catch((err) => {
            return setError(err.response.data);
        })
    };
    
    //login user 
    const loginUser = async (data) => {
        const { username, password } = data;
        return axios.post('auth/login', {
            username,
            password,
        })
        .then(async (res) =>{
            localStorage.setItem('token', res.data.token);
            await setUserContext() 
        })
        .catch((err) => {
            setError(err.response.data);
            // console.error(err.response.data)
        })
    };

    return {
        registerUser,
        loginUser,
        error
    }
}