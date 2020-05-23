import React, { Component } from 'react';
import department from '../ethereum/department';
import semesters from '../ethereum/department';
import batches from '../ethereum/department';
import '../ethereum/web3';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Notiflix, { Notify } from 'notiflix';

class Add_semester extends Component {
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
        departId: 0,
        batchId: 0,
        semester: 1,
        startDate: Number,
        endDate: Number,
        departData: [],
        batchData: [],

        formData: {
            startDate: {
                label: true,
                labelText: 'Start Date:',
                config: {
                    name: 'startDate_date',
                    type: 'date',
                    className: 'form-control'
                }
            },
            endDate: {
                label: true,
                labelText: 'End Date:',
                config: {
                    name: 'endDate_date',
                    type: 'date',
                    className: 'form-control'
                }
            },
            addSemester: {
                value: 'Add Semester',
                config: {
                    name: 'addSemester_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    }

    async componentDidMount() {
        const departLength = await department.methods.getDepartmentsCount().call();
        const batchLength = await batches.methods.getBatchesCount().call();
        try {
            const departData = await Promise.all(
                Array(parseInt(departLength))
                    .fill()
                    .map((element, index) => {
                        return department.methods.departments(index).call();
                    })
            );
            const batchData = await Promise.all(
                Array(parseInt(batchLength))
                    .fill()
                    .map((element, index) => {
                        return batches.methods.batches(index).call();
                    })
            );
            this.setState({ departData, batchData });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    onSubmit = async () => {

        this.setState({ loading: true });

        try {
            await window.web3.eth.getAccounts();
            window.web3.currentProvider.enable();
            await semesters.methods.createSemester(this.state.departId, this.state.batchId, this.state.semester, this.state.startDate, this.state.endDate)
                .send({
                    from: window.web3.currentProvider.selectedAddress
                });
            Notiflix.Notify.Success('Data Added Successfully!  ');
            this.setState({ loading: false, semester: 1, startDate: Number, endDate: Number });
        } catch (err) {
            Notiflix.Notify.Failure('You Reject Data' + err.message);
            this.setState({ loading: false, semester: 1, startDate: Number, endDate: Number });
        }
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
            } else {
                return true
            }
        })
    }
    render() {
        const loading = this.state.loading;
        return (
            <div>
                <div className="form-group">
                    <label>Department:</label>
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
                    <label>Semester:</label>
                    <select className="form-control" value={this.state.semester} onChange={e => this.setState({ semester: e.target.value })}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                    </select>
                </div>

                <div className="form-group" >
                    <label>{this.state.formData.startDate.labelText}</label>
                    <input
                        {...this.state.formData.startDate.config}
                        value={this.state.startDate}
                        onChange={e => this.setState({ startDate: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>{this.state.formData.endDate.labelText}</label>
                    <input
                        {...this.state.formData.endDate.config}
                        value={this.state.endDate}
                        onChange={e => this.setState({ endDate: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <button
                        {...this.state.formData.addSemester.config}
                        onClick={this.onSubmit}>
                        {(loading) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : this.state.formData.addSemester.value}
                    </button>
                </div>
            </div>
        )
    }
}
export default Add_semester;
