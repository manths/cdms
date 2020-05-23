import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Navbar_student from './navbar';
import Rout_student from './rout';
import Footer from './footer';

class Controller_student extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('student')
        let studPass = localStorage.getItem('studPass')
        token = JSON.parse(token)
        console.log('controller', token)
        this.state = {
            token,
            studPass
        }
    }
    chekPass = () => {
        if (this.state.studPass == null) {
            return (
                <div>
                    <Navbar_student />
                </div>
            )
        } else {
            return (
                <div>
                    <p className='text  text-center font-weight-bolder text-warning'>
                        Please Change Your Password Before Access This Page
                    </p>
                </div>
            )
        }
    }
    render() {
        if (this.state.token == null) {
            return <Redirect to='/' />
        }
        return (
            <BrowserRouter>
                {this.chekPass()}
                <div className='container mt-3 mb-5'>
                    <Rout_student />
                </div>
                <div>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}
export default Controller_student;
