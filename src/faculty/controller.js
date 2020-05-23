import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Navbar_faculty from './navbar';
import Rout_faculty from './rout';
import Footer from './footer';

class Controller_faculty extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        let facPass = localStorage.getItem('facPass')
        token = JSON.parse(token)
        console.log('controller', token)
        console.log('facPass contoller', facPass)
        this.state = {
            token,
            facPass
        }
    }
    chekPass = () => {
        if (this.state.facPass == null) {
            return (
                <div>
                    <Navbar_faculty />
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
                    <Rout_faculty />
                </div>
                <div>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}
export default Controller_faculty;
