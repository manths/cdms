import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/login.css';
import { Redirect, useHistory } from 'react-router-dom';
import faculties from '../src/ethereum/department';
import students from '../src/ethereum/department';
import ForgotPass from './forgotPass';

class Login extends Component {
    constructor() {
        super()
        let token_stud = localStorage.getItem('student')
        token_stud = JSON.parse(token_stud)
        let token_admin = localStorage.getItem('admin')
        token_admin = JSON.parse(token_admin)
        let token_fac = localStorage.getItem('faculty')
        token_fac = JSON.parse(token_fac)

        this.token = {
            token_stud,
            token_admin,
            token_fac
        }
    }
    facEmail = []
    facPass = []
    studEnroll = []
    studPass = []
    state = {
        placeHolder: 'Enter Password',
        selectType: 'admin',
        logIn: false,
        link: '',
        email: '',
        enroll: '',
        password: '',
        studLength: 0,
        facLength: 0,
        studData: [],
        facData: [],
        formData: {
            email: {
                config: {
                    type: 'email',
                    placeholder: 'Enter Email',
                    className: 'form-control'
                }
            },
            enroll: {
                config: {
                    type: 'text',
                    placeholder: 'Enter EnrollmentNo',
                    className: 'form-control'
                }
            },
            password: {
                config: {
                    type: 'password',
                    className: 'form-control'
                }
            }
        }
    }
    async componentDidMount() {
        const facLength = await faculties.methods.getFacultiesCount().call();
        const studLength = await students.methods.getStudentsCount().call();
        try {
            const facData = await Promise.all(
                Array(parseInt(facLength))
                    .fill()
                    .map((element, index) => {
                        return faculties.methods.faculties(index).call();
                    })
            );
            const studData = await Promise.all(
                Array(parseInt(studLength))
                    .fill()
                    .map((element, index) => {
                        return students.methods.students(index).call();
                    })
            );
            this.setState({ facData, studData, facLength, studLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    onSet = (e) => {
        e.preventDefault();

        if ((this.state.email !== '' && this.state.password !== '') || (this.state.enroll !== '' && this.state.password !== '')) {
            switch (this.state.selectType) {
                case 'admin':
                    if (!('admin@gmail.com' === this.state.email && 'admin' === this.state.password)) {
                        return this.setState({ logIn: false, password: '', placeHolder: 'Wrong Password' });
                    } else {
                        let adminData = { type: 'admin', email: this.state.email }
                        localStorage.setItem('admin', JSON.stringify(adminData))
                        return this.setState({ logIn: true });
                    }
                case 'faculty':
                    let { faculData } = this.facDataFinder()
                    if (faculData.length > 0) {
                        if (faculData.length == 1) {
                            faculData.map((data, index) => {
                                let pass = JSON.parse(data.password)
                                if (pass.oldPass == this.state.password) {
                                    localStorage.setItem('faculty', JSON.stringify(data))
                                    localStorage.setItem('facPass', 'passwordNotChanged')
                                    this.setState({ logIn: true });
                                } else {
                                    this.setState({ logIn: false, password: '', placeHolder: 'Wrong Password' });
                                }
                            })
                        } else {
                            faculData.map((data, index) => {
                                let pass = JSON.parse(data.password)
                                if (pass.newPass == this.state.password) {
                                    localStorage.setItem('faculty', JSON.stringify(data))
                                    localStorage.removeItem('facPass')
                                    this.setState({ logIn: true });
                                }
                                else {
                                    this.setState({ logIn: false, password: '', placeHolder: 'Wrong Password' });
                                }
                            })
                        }
                    } else {
                        alert('Wrong Email or Password ')
                        this.setState({ logIn: false, password: '' });
                    }
                    return true;
                case 'student':
                    let { stdData } = this.studDataFinder()
                    if (stdData.length > 0) {
                        if (stdData.length == 1) {
                            stdData.map((data, index) => {
                                let pass = JSON.parse(data.password)
                                if (pass.oldPass == this.state.password) {
                                    localStorage.setItem('student', JSON.stringify(data))
                                    localStorage.setItem('studPass', 'passwordNotChanged')
                                    this.setState({ logIn: true });
                                } else {
                                    this.setState({ logIn: false, password: '', placeHolder: 'Wrong Password' });
                                }
                            })
                        } else {
                            stdData.map((data, index) => {
                                let pass = JSON.parse(data.password)
                                if (pass.newPass == this.state.password) {
                                    localStorage.setItem('student', JSON.stringify(data))
                                    localStorage.removeItem('studPass')
                                    this.setState({ logIn: true });
                                }
                                else {
                                    this.setState({ logIn: false, password: '', placeHolder: 'Wrong Password' });
                                }
                            })
                        }

                    } else {
                        alert('Wrong Email or Password ')
                        this.setState({ logIn: false, password: '' });
                    }
                    return true;
            }
        } else {
            alert('Enter Both Email and Password')
        }
    }

    facDataFinder = () => {
        let faculData = this.state.facData.filter((data, i) => {
            let pass = JSON.parse(data.password)
            return data.email == this.state.email && (pass.oldPass == this.state.password || pass.oldPass !== '') && (pass.newPass !== '' || pass.newPass == '' || pass.newPass == this.state.password)
        })
        return { faculData }
    }
    studDataFinder = () => {
        let stdData = this.state.studData.filter((data, i) => {
            let pass = JSON.parse(data.password)
            return data.enrollment_no == this.state.enroll && (pass.oldPass == this.state.password || pass.oldPass !== '') && (pass.newPass !== '' || pass.newPass == '' || pass.newPass == this.state.password)
        })
        return { stdData }
    }
    chekUser = () => {
        if (this.state.selectType == 'faculty' || this.state.selectType == 'admin') {
            return (
                <div className="form-group bg-white ">
                    <label className='bg-white'>Email address</label>
                    <input
                        {...this.state.formData.email.config}
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <small id="emailHelp" className="form-text bg-white  text-muted">We'll never share your email with anyone else.</small>
                </div>
            )
        } else {
            return (
                <div className="form-group bg-white">
                    <label className='bg-white'>EnrollmentNo</label>
                    <input
                        {...this.state.formData.enroll.config}
                        value={this.state.enroll}
                        onChange={e => this.setState({ enroll: e.target.value })}
                    />
                    <small className="form-text bg-white text-muted">We'll never share your Enroll with anyone else.</small>
                </div>
            )
        }
    }
    render() {
        console.log('fac', this.state.facData)
        console.log('stud', this.state.studData)

        if (this.facEmail == '' && this.facPass == '' && this.studEnroll == '' && this.studPass == '') {
            this.state.facData.map((data, i) => {
                this.facEmail.push(data.email)
                this.facPass.push(data.password)
            })
            this.state.studData.map((data, i) => {
                this.studEnroll.push(data.enrollment_no)
                this.studPass.push(data.password)
            })
        }
        //parmenent
        if (this.state.logIn) {
            return <Redirect to={`/${this.state.selectType}`} />
        } else if (this.token.token_admin !== null) {
            return <Redirect to='/admin' />
        } else if (this.token.token_stud !== null) {
            return <Redirect to='/student' />
        } else if (this.token.token_fac !== null) {
            return <Redirect to='/faculty' />
        }

        return (
            <div>
                <ForgotPass />
                <form method='post' onSubmit={e => this.onSet(e)}>
                    <div className='form shadow bg-white rounded'>
                        <select className="form-control mb-3" onChange={e => this.setState({ selectType: e.target.value })}>
                            <option value='admin'>Admin</option>
                            <option value='faculty'>Faculty</option>
                            <option value='student'>Student</option>
                        </select>
                        {this.chekUser()}
                        <div className="form-group bg-white">
                            <label className='bg-white'>Password</label>
                            <input
                                {...this.state.formData.password.config}
                                value={this.state.password}
                                placeholder={this.state.placeHolder}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" >Login</button>
                        <a className="ml-5" href='#' data-toggle="modal" data-target="#exampleModal">Forgot Password?</a>
                    </div>
                </form>
            </div >
        )
    }
}
export default Login;
