import React, { Component } from 'react';
import department from '../ethereum/department';
import '../ethereum/web3';
import { Spinner } from 'react-bootstrap'
import Notiflix, { Notify } from 'notiflix';

class Add_department extends Component {
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
        departName: '',
        departHod: '',
        formData: {
            departmentName: {
                config: {
                    name: 'departmentName_input',
                    type: 'text',
                    placeholder: 'Enter Department Name',
                    className: 'form-control'
                }
            },
            departmentHod: {
                config: {
                    name: 'departmentHod_input',
                    type: 'text',
                    placeholder: 'Enter Department HOD',
                    className: 'form-control'
                }
            },
            addDepartment: {
                value: 'Add Department',
                config: {
                    name: 'addDepartment_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    };

    onSubmit = async () => {

        if (this.state.departHod !== '' && this.state.departName !== '') {
            this.setState({ loading: true });

            try {
                await window.web3.eth.getAccounts();
                window.web3.currentProvider.enable();
                await department.methods.createDepartment(this.state.departName, this.state.departHod)
                    .send({
                        from: window.web3.currentProvider.selectedAddress
                    });
                Notiflix.Notify.Success('Data Added Successfully!  ');
                this.setState({ loading: false, departHod: '', departName: '' });
            } catch (err) {
                Notiflix.Notify.Failure('You Reject Data' + err.message);
                this.setState({ departHod: '', loading: false });
            }
        } else {
            this.setState({ message: 'Enter All Field Value' })
        }

    };


    render() {
        const loading = this.state.loading;
        return (
            <div>
                <div className="form-group">
                    <label>Department Name:</label>
                    <input
                        {...this.state.formData.departmentName.config}
                        value={this.state.departName}
                        onChange={event =>
                            this.setState({ departName: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label >Department HOD:</label>
                    <input
                        {...this.state.formData.departmentHod.config}
                        value={this.state.departHod}
                        onChange={event =>
                            this.setState({ departHod: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <button
                        {...this.state.formData.addDepartment.config}
                        onClick={this.onSubmit}>
                        {(loading) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : this.state.formData.addDepartment.value}
                    </button>
                </div>
            </div>
        );
    }
}
export default Add_department;
