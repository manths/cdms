import React, { Component } from 'react';
import '../ethereum/web3';
import faculties from '../ethereum/department';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

class Add_faculty extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('admin')
        token = JSON.parse(token)
        console.log(token)
        this.token = {
            token
        }
    }
    state = {
        loading: false,
        firstName: '',
        lastName: '',
        email: '',
        contact: Number,
        password: '12345',
        designation: '',
        exprience: '',
        qualification: '',
        requests: [],
        facLength: 0,
        facData: [],
        formData: {
            firstName: {
                labelText: 'First Name:',
                config: {
                    name: 'firstName_input',
                    type: 'text',
                    placeholder: 'Enter FirstName',
                    className: 'form-control'
                }
            },
            lastName: {
                labelText: 'Last Name:',
                config: {
                    name: 'lastName_input',
                    type: 'text',
                    placeholder: 'Enter LastName',
                    className: 'form-control'
                }
            },
            email: {
                labelText: 'Email:',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter Email',
                    className: 'form-control'
                }
            },
            contactNo: {
                labelText: 'Contact No:',
                config: {
                    name: 'contactNo_input',
                    type: 'text',
                    placeholder: 'Enter ContactNo',
                    className: 'form-control'
                }
            },
            password: {
                labelText: 'Password:',
                config: {
                    name: 'password_input',
                    type: 'text',
                    placeholder: 'Enter Password',
                    className: 'form-control'
                }
            },
            designation: {
                labelText: 'Designation:',
                config: {
                    name: 'designation_input',
                    type: 'text',
                    placeholder: 'Enter Designation',
                    className: 'form-control'
                }
            },
            qualification: {
                labelText: 'Qualification:',
                config: {
                    name: 'qualification_input',
                    type: 'text',
                    placeholder: 'Enter Qualification',
                    className: 'form-control'
                }
            },
            exprience: {
                labelText: 'Exprience:',
                config: {
                    name: 'exprience_input',
                    type: 'text',
                    placeholder: 'Enter Exprience',
                    className: 'form-control'
                }
            },
            addFaculty: {
                value: 'Add Faculty',
                config: {
                    name: 'addFaculty_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    }

    async componentDidMount() {
        const facLength = await faculties.methods.getFacultiesCount().call();
        try {
            const facData = await Promise.all(
                Array(parseInt(facLength))
                    .fill()
                    .map((element, index) => {
                        return faculties.methods.faculties(index).call();
                    })
            );
            this.setState({ facData, facLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    onSubmit = async () => {
        if (this.state.password !== '') {
            let facObj = { qualification: this.state.qualification, exprience: this.state.exprience }
            facObj = JSON.stringify(facObj)

            let msg = 'Your Account has been Successfully Created , Your Email ' + this.state.email + ' and Default Password is ' + this.state.password + ' . Please Change Your Default Password To Access Your College Account'

            let facPassObj = { oldPass: this.state.password, newPass: '' }
            facPassObj = JSON.stringify(facPassObj)
            this.setState({ loading: true });
            try {
                await window.web3.eth.getAccounts();
                window.web3.currentProvider.enable();
                await faculties.methods.createFaculty(this.state.firstName, this.state.lastName, this.state.email, this.state.contact, facPassObj, this.state.designation, facObj)
                    .send({
                        from: window.web3.currentProvider.selectedAddress
                    });

                await axios.get('http://localhost:5000/sms/' + this.state.contact + '/' + msg)
                Notiflix.Notify.Success('Data Added Successfully!  ');
                this.setState({ loading: false, firstName: '', lastName: '', email: '', contact: Number, designation: '', exprience: '', qualification: '' });
            } catch (err) {
                Notiflix.Notify.Failure('You Reject Data' + err.message);
                this.setState({ loading: false, firstName: '', lastName: '', email: '', contact: Number, designation: '', exprience: '', qualification: '' });
            }
        } else {
            this.setState({ message: 'Enter Password' })
        }

    }

    chekEmail = () => {
        let emailChek = this.state.facData.filter((val, i) => {
            return val.email == this.state.email
        })
        console.log(emailChek.length)
        return emailChek.length
    }



    render() {
        let loading = this.state.loading;
        return (
            <div>
                <div className="form-group">
                    <label>{this.state.formData.firstName.labelText}</label>
                    <input
                        {...this.state.formData.firstName.config}
                        value={this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>{this.state.formData.lastName.labelText}</label>
                    <input
                        {...this.state.formData.lastName.config}
                        value={this.state.lastName}
                        onChange={e => this.setState({ lastName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>{this.state.formData.email.labelText}</label>
                    <input
                        {...this.state.formData.email.config}
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    {this.chekEmail() !== 0 ? 'Email Already Used' : ''}
                </div>
                <div className="form-group">
                    <label>{this.state.formData.contactNo.labelText}</label>
                    <input
                        {...this.state.formData.contactNo.config}
                        value={this.state.contact}
                        onChange={e => this.setState({ contact: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label >{this.state.formData.password.labelText}</label>
                    <input
                        {...this.state.formData.password.config}
                        value={this.state.password}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>{this.state.formData.designation.labelText}</label>
                    <input
                        {...this.state.formData.designation.config}
                        value={this.state.designation}
                        onChange={e => this.setState({ designation: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>{this.state.formData.qualification.labelText}</label>
                    <input
                        {...this.state.formData.qualification.config}
                        value={this.state.qualification}
                        onChange={e => this.setState({ qualification: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>{this.state.formData.exprience.labelText}</label>
                    <input
                        {...this.state.formData.exprience.config}
                        value={this.state.exprience}
                        onChange={e => this.setState({ exprience: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <button
                        {...this.state.formData.addFaculty.config}
                        onClick={this.onSubmit}>
                        {(loading) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : this.state.formData.addFaculty.value}
                    </button>
                </div>
            </div>
        )
    }
}
export default Add_faculty;
