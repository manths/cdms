import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Navbar_admin extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('admin')
        token = JSON.parse(token)
        console.log(token)
        this.state = {
            token,
            dropdownMenu: {
                className: 'dropdown-menu',
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
            <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-light bg-light">
                <Link className="navbar-brand" to='/' >CDMS</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarA" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarA">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle='dropdown'>
                                Department
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='addDepartment' >Add Department</Link>
                                <Link className="dropdown-item" to='viewDepartment'>View Department</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Batch
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='addBatch' >Add Batch</Link>
                                <Link className="dropdown-item" to='viewBatch' >View Batch</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Semester
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='addSemester'>Add Semester</Link>
                                <Link className="dropdown-item" to='viewSemester'>View Semester</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Subjects
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='addSubject'>Add Subjects</Link>
                                <Link className="dropdown-item" to='viewSubject' >View Subjects</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Faculties
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='addFaculties' >Add Faculties</Link>
                                <Link className="dropdown-item" to='viewFaculties' >View Faculties</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Students
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='addStudent'>Add Students</Link>
                                <Link className="dropdown-item" to='viewStudent' >View Students</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Requests
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <Link className="dropdown-item" to='studreq'>Students Request</Link>
                                <Link className="dropdown-item" to='facreq' >Faculties Request</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown dropleft">
                            <a {...this.state.a} data-toggle="dropdown" aria-expanded='false' aria-haspopup='true'>
                                Welcome
                            </a>
                            <div {...this.state.dropdownMenu} aria-labelledby='navbarDropdownMenuLink'>
                                <a className="dropdown-item btn">{this.state.token.type}</a>
                                <a className="dropdown-item btn" href='/logout'>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar_admin;

