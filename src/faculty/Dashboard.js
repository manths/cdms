import React, { Component } from 'react';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

export default class Dash extends Component {
    constructor(props) {
        super(props)

        let facPass = localStorage.getItem('facPass')
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        let pass = JSON.parse(token.password)
        console.log(facPass)

        this.state = {
            loading: false,
            firstName: token.first_name,
            lastName: token.last_name,
            email: token.email,
            contact: token.contact,
            password: pass.oldPass,
            getPass: '',
            designation: token.designation,
            expQl: token.qualificationexperience,
            facPass,
            getId: 0
        }

        console.log('dashbord', token)
    }
    style = {
        textDecoration: 'none',
        color: 'black',
    }

    componentDidMount = async () => {
        if (this.state.facPass == 'passwordNotChanged' && this.state.facPass !== null) {

            const data = await axios.get('http://localhost:5000/faculty')
            let [email] = data.data.map((val, i) => {
                if (val.email == this.state.email) {
                    this.setState({ getId: val._id })
                    return val.email
                }
            })
            if (email !== this.state.email || email == undefined) {

                let facPassObj = { oldPass: this.state.password, newPass: this.state.getPass }
                facPassObj = JSON.stringify(facPassObj)

                try {
                    const res = await axios.post('http://localhost:5000/faculty', {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        contact: this.state.contact,
                        password: facPassObj,
                        designation: this.state.designation,
                        expQl: this.state.expQl,
                    })
                    this.setState({ getPass: '', getId: res.data._id })
                }
                catch (e) {
                    this.setState({ getPass: '' })
                }
            }
        }
    }

    changePass = async () => {

        Notiflix.Notify.Init({ width: "480px", timeout: 6000, position: "right-bottom", });
        if (this.state.getPass !== '') {

            let facPassObj = { oldPass: this.state.password, newPass: this.state.getPass }
            facPassObj = JSON.stringify(facPassObj)

            try {
                await axios.patch('http://localhost:5000/find/faculty/' + this.state.getId, {
                    password: facPassObj,
                })
                Notiflix.Notify.Success('Password Has been Updated Please Wait untill admin not accept Your Request!  ');
                Notiflix.Notify.Success('Please Logout and Login After Sometimes!');
                Notiflix.Notify.Success('You can Change Your Password Untill you Want.  ');
                this.setState({ getPass: '' })
            }
            catch (e) {
                Notiflix.Notify.Failure('Server Error');
                this.setState({ getPass: '' })
            }
        } else {
            alert('Enter Password')
        }

    }
    render() {
        if (this.state.facPass == 'passwordNotChanged' && this.state.facPass !== null) {
            return (
                <div>
                    <div className='d-flex justify-content-center'>
                        <div className="input-group  w-50">
                            <input type="text" className="form-control" value={this.state.getPass} onChange={e => this.setState({ getPass: e.target.value })} placeholder="Change Password" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" onClick={this.changePass} type="button">
                                    Change
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
                    <h1>Hello faculty</h1>
                </div>
            )
        }

    }
}