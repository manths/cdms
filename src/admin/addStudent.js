import React, { Component } from 'react';
import '../ethereum/web3';
import students from '../ethereum/department';
import departments from '../ethereum/department';
import batches from '../ethereum/department';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

class Add_student extends Component {
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
        batchId: 0,
        departId: 0,
        firstName: '',
        lastName: '',
        enrollmentNo: Number,
        contact: Number,
        password: '12345',
        departData: [],
        batchData: [],
        studData: [],
        formData: {
            firstName: {
                elementName: 'input',
                value: '',
                label: true,
                labelText: 'First Name:',
                config: {
                    name: 'firstName_input',
                    type: 'text',
                    placeholder: 'Enter FirstName',
                    className: 'form-control'
                }
            },
            lastName: {
                elementName: 'input',
                value: '',
                label: true,
                labelText: 'Last Name:',
                config: {
                    name: 'lastName_input',
                    type: 'text',
                    placeholder: 'Enter LastName',
                    className: 'form-control'
                }
            },
            enrollmentNo: {
                elementName: 'input',
                value: '',
                label: true,
                labelText: 'Enrollment No:',
                config: {
                    name: 'enrollmentNo_input',
                    type: 'text',
                    placeholder: 'Enter EnrollmentNo',
                    className: 'form-control'
                }
            },
            contactNo: {
                elementName: 'input',
                value: '',
                label: true,
                labelText: 'Contact No:',
                config: {
                    name: 'contactNo_input',
                    type: 'text',
                    placeholder: 'Enter ContactNo',
                    className: 'form-control'
                }
            },
            password: {
                elementName: 'input',
                value: '',
                label: true,
                labelText: 'Password:',
                config: {
                    name: 'password_input',
                    type: 'text',
                    placeholder: 'Enter Password',
                    className: 'form-control'
                }
            },
            addStudent: {
                elementName: 'button',
                value: 'Add Student',
                config: {
                    name: 'addStudent_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    }
    async componentDidMount() {
        const departLength = await departments.methods.getDepartmentsCount().call();
        const studLength = await students.methods.getStudentsCount().call();
        const batchLength = await batches.methods.getBatchesCount().call();
        try {
            const departData = await Promise.all(
                Array(parseInt(departLength))
                    .fill()
                    .map((element, index) => {
                        return departments.methods.departments(index).call();
                    })
            );
            const batchData = await Promise.all(
                Array(parseInt(batchLength))
                    .fill()
                    .map((element, index) => {
                        return batches.methods.batches(index).call();
                    })
            );
            const studData = await Promise.all(
                Array(parseInt(studLength))
                    .fill()
                    .map((element, index) => {
                        return students.methods.students(index).call();
                    })
            );
            this.setState({ departData, batchData, studData });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    onSubmit = async () => {

        this.setState({ loading: true });
        let studObj = { oldPass: this.state.password, newPass: '' }
        studObj = JSON.stringify(studObj)

        let msg = 'Your Account has been Successfully Created , Your EnrollmentNo ' + this.state.enrollmentNo + ' and Default Password is ' + this.state.password + ' . Please Change Your Default Password To Access Your College Account'

        try {
            await window.web3.eth.getAccounts();
            window.web3.currentProvider.enable();
            await students.methods.createStudent(this.state.firstName, this.state.lastName, this.state.enrollmentNo, this.state.contact, studObj, this.state.batchId, this.state.departId)
                .send({
                    from: window.web3.currentProvider.selectedAddress
                });

            await axios.get('https://powerful-sea-39429.herokuapp.com/sms/' + this.state.contact + '/' + msg)
            Notiflix.Notify.Success('Data Added Successfully!  ');
            this.setState({ loading: false, firstName: '', lastName: '', enrollmentNo: Number, contact: Number, });
        } catch (err) {
            Notiflix.Notify.Failure('You Reject Data' + err.message);
            this.setState({ loading: false, firstName: '', lastName: '', enrollmentNo: Number, contact: Number, });
        }
    }

    chekEnrollment = () => {
        let enrollChek = this.state.studData.filter((val, i) => {
            return val.enrollment_no == this.state.enrollmentNo
        })
        return enrollChek.length
    }

    getDepartment = () => {
        return this.state.departData.map((data, i) => {
            return (
                <option value={i} key={i}>{data[0]}</option>
            )
        })
    }
    getBatch = () => {
        return this.state.batchData.map((data, i) => {
            if (data.department_id == this.state.departId) {
                return (
                    <option value={i} key={i}>{data[1]}</option>
                )
            }
        })
    }
    render() {
        let loading = this.state.loading;
        return (
            <div>
                <div className="form-group">
                    <label >Department:</label>
                    <select className="form-control" value={this.state.departId} onChange={e => this.setState({ departId: e.target.value })}>
                        {this.getDepartment()}
                    </select>
                </div>

                <div className="form-group">
                    <label>Batch:</label>
                    <select className="form-control" value={this.state.batchId} onChange={e => this.setState({ batchId: e.target.value })}>
                        {this.getBatch()}
                    </select>
                </div>
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
                    <label>{this.state.formData.enrollmentNo.labelText}</label>
                    <input
                        {...this.state.formData.enrollmentNo.config}
                        value={this.state.enrollmentNo}
                        onChange={e => this.setState({ enrollmentNo: e.target.value })}
                    />
                    {this.chekEnrollment() !== 0 ? 'EnrollmentNo Already Used' : ''}
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
                    <label>{this.state.formData.password.labelText}</label>
                    <input
                        {...this.state.formData.password.config}
                        value={this.state.password}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <button
                        {...this.state.formData.addStudent.config}
                        onClick={this.onSubmit}>
                        {(loading) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : this.state.formData.addStudent.value}
                    </button>
                </div>
            </div >
        )
    }
}
export default Add_student;
