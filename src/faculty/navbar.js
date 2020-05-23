import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Navbar_faculty extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        console.log('view midsem', token)
        this.state = {
            token,
            dropdownMenu: {
                className: 'dropdown-menu'
            },
            a: {
                className: 'nav-link dropdown-toggle',
                href: '#',
                id: 'navbarDropdownMenuLink',
                role: 'button',
            }
        }
    }
    

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>CDMS</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarF" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarF">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                Profile
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link to='viewProfile' className="dropdown-item">View Profile</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                Mid Exams
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link to='addMarks' className="dropdown-item">Add Marks</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                MidSem
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link to='addMidsem' className="dropdown-item">Add MidSem</Link>
                                <Link to='viewMidsem' className="dropdown-item">View MidSem</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown dropleft">
                            <a {...this.state.a} data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                Welcome
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <a className="dropdown-item btn" >{this.state.token.first_name}</a>
                                <a className="dropdown-item btn" href='/logout'>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar_faculty;

