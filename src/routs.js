import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Controller_admin from './admin/controller';
import Controller_faculty from './faculty/controller';
import Controller_student from './student/controller';
import Login from './login';
import Logout from './logout';

export default class Home_Rout extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Controller_admin}></Route>
                    <Route path='/faculty' component={Controller_faculty}></Route>
                    <Route path='/student' component={Controller_student}></Route>
                    <Route path='/logout' component={Logout}></Route>
                    <Route path='/' exact component={Login}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
