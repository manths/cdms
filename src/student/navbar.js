import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Navbar_student extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('student')
        token = JSON.parse(token)
        console.log('navbar marks', token)
        this.state = {
            token,
        }
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to='/'>CDMS</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarS" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarS">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a role='button' id='navbarDropdownMenuLink' className='nav-link dropdown-toggle' href='#' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                    Profile
                            </a>
                                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                                    <Link to='viewProfile' className="dropdown-item">View Profile</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a role='button' id='navbarDropdownMenuLink' className='nav-link dropdown-toggle' href='#' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                    Mid Exams
                            </a>
                                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                                    <Link to='viewMarks' className="dropdown-item">View Marks</Link>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown dropleft">
                                <a href='#' role='button' id='navbarDropdownMenuLink' className='nav-link dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                    Welcome
                            </a>
                                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                                    <a className="dropdown-item btn">{this.state.token.first_name}</a>
                                    <a className="dropdown-item btn" href='/logout'>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar_student;

