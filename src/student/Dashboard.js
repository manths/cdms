import React, { Component } from 'react';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

export default class Dash extends Component {
    constructor(props) {
        super(props)

        let studPass = localStorage.getItem('studPass')
        let token = localStorage.getItem('student')
        token = JSON.parse(token)
        let pass = JSON.parse(token.password)
        console.log('studpass', studPass)

        this.state = {
            firstName: token.first_name,
            lastName: token.last_name,
            enrollmentNo: token.enrollment_no,
            contact: token.contact,
            password: pass.oldPass,
            getPass: '',
            batchId: token.batch_id,
            departId: token.department_id,
            studPass,
            getId: 0
        }

        console.log('dashbord', token)
    }

    style = {
        textDecoration: 'none',
        color: 'black',
    }

    componentDidMount = async () => {
        if (this.state.studPass == 'passwordNotChanged' && this.state.studPass !== null) {
            const data = await axios.get('https://powerful-sea-39429.herokuapp.com/student')
            let [enroll] = data.data.map((val, i) => {
                if (val.enrollmentNo == this.state.enrollmentNo) {
                    this.setState({ getId: val._id })
                    return val.enrollmentNo
                }
            })
            if (enroll !== this.state.enrollmentNo || enroll == undefined) {

                let studPassObj = { oldPass: this.state.password, newPass: this.state.getPass }
                studPassObj = JSON.stringify(studPassObj)
                try {
                    const res = await axios.post('https://powerful-sea-39429.herokuapp.com/student', {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        enrollmentNo: this.state.enrollmentNo,
                        contact: this.state.contact,
                        password: studPassObj,
                        batchId: this.state.batchId,
                        departId: this.state.departId,
                    })
                    this.setState({ getPass: '', getId: res.data._id })
                } catch (e) {
                    this.setState({ getPass: '' })
                }
            }
        }
    }

    changePass = async () => {

        Notiflix.Notify.Init({ width: "480px", timeout: 6000, position: "right-bottom" });
        if (this.state.getPass !== '') {

            let studPassObj = { oldPass: this.state.password, newPass: this.state.getPass }
            studPassObj = JSON.stringify(studPassObj)
            try {
                await axios.patch('https://powerful-sea-39429.herokuapp.com/find/student/' + this.state.getId, {
                    password: studPassObj,
                })
                Notiflix.Notify.Success('Password Has been Updated Please Wait untill admin not accept Your Request!  ');
                Notiflix.Notify.Success('Please Logout and Login After Sometimes!');
                Notiflix.Notify.Success('You can Change Your Password Untill you Want.  ');
                this.setState({ getPass: '' })
            } catch (e) {
                Notiflix.Notify.Failure('Failure message sending');
                this.setState({ getPass: '' })
            }

        } else {
            alert('Enter Password')
        }

    }

    render() {
        if (this.state.studPass == 'passwordNotChanged' && this.state.studPass !== null) {
            return (
                <div>
                    <div className='d-flex justify-content-center'>
                        <div className="input-group  w-50">
                            <input type="text" className="form-control" value={this.state.getPass} onChange={e => this.setState({ getPass: e.target.value })} placeholder="Change Password" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" onClick={this.changePass} type="button">
                                    Changed
                                </button>
                            </div>
                        </div>
                        <button className="btn btn-outline-secondary"><a style={this.style} href='/logout'>Logout</a></button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Hello student</h1>
                </div>
            )
        }

    }
}