import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/UserContext.service';
import PrivateRoute from './pages/PrivateRoute.page';
import Register from './pages/Register.page';
import Login from './pages/Login.page';
import Landing from './pages/Landing.page';
import Home from './pages/Home.page';
import NotFound from './pages/NotFound.page';
import useFindUser from './hooks/useFindUser.service';
import './App.css';


function App() {

    const {
        user,
        setUser,
        isLoading } = useFindUser();

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser, isLoading }}>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/home" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
