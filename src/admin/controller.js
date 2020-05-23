import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Navbar_admin from './navbar';
import Rout_admin from './rout';
import Footer from './footer';

class Controller_admin extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('admin')
        token = JSON.parse(token)
        console.log(token)
        this.state = {
            token
        }
    }

    style = {
        marginLeft: '10%',
        marginRight: '10%',
        color: 'gray'
    }
    render() {
        if (this.state.token == null) {
            return <Redirect to='/' />
        }
        return (
            <BrowserRouter>
                <div>
                    <Navbar_admin />
                </div>
                <div className='container mt-3 mb-5'>
                    <Rout_admin />
                </div>
                <div>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}
export default Controller_admin;
