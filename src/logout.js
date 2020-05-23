import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    constructor() {
        super()
        let token_stud = localStorage.getItem('student')
        token_stud = JSON.parse(token_stud)
        let token_admin = localStorage.getItem('admin')
        token_admin = JSON.parse(token_admin)
        let token_fac = localStorage.getItem('faculty')
        token_fac = JSON.parse(token_fac)
        
        this.state = {
            token_stud,
            token_admin,
            token_fac,
            
        }
    }
    render() {
        localStorage.removeItem('admin')
        localStorage.removeItem('faculty')
        localStorage.removeItem('student')
        return (
            <div>
                <Redirect to='/'></Redirect>
            </div>
        )
    }
}