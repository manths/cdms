import React, { Component } from 'react';
import departments from '../ethereum/department';
import subjects from '../ethereum/department';
import batches from '../ethereum/department';
import semesters from '../ethereum/department';
import '../ethereum/web3';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Notiflix, { Notify } from 'notiflix';

class Add_subject extends Component {
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
        semId: 0,
        batchId: 0,
        departId: 0,
        subjectName: '',
        subjectCode: '',
        departData: [],
        batchData: [],
        semData: [],
        formData: {
            subjectName: {
                labelText: 'Subject Name:',
                config: {
                    name: 'subjectName_input',
                    type: 'text',
                    placeholder: 'Enter SubjectName',
                    className: 'form-control'
                }
            },
            subjectCode: {
                labelText: 'Subject Code:',
                config: {
                    name: 'subjectCode_input',
                    type: 'text',
                    placeholder: 'Enter SubjectCode',
                    className: 'form-control'
                }
            },
            addSubject: {
                elementName: 'button',
                value: 'Add Subject',
                config: {
                    name: 'addSubject_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    }

    async componentDidMount() {
        const departLength = await departments.methods.getDepartmentsCount().call();
        const batchLength = await batches.methods.getBatchesCount().call();
        const semLength = await semesters.methods.getSemestersCount().call();
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
            const semData = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            this.setState({ departData, batchData, semData });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    onSubmit = async () => {
        if (this.state.subjectCode !== '' && this.state.subjectName !== '') {
            this.setState({ loading: true });

            try {
                await window.web3.eth.getAccounts();
                window.web3.currentProvider.enable();
                await subjects.methods.createSubject(this.state.departId, this.state.batchId, this.state.semId, this.state.subjectName, this.state.subjectCode)
                    .send({
                        from: window.web3.currentProvider.selectedAddress
                    });
                Notiflix.Notify.Success('Data Added Successfully!  ');
                this.setState({ loading: false, semId: 0, batchId: 0, departId: 0, subjectName: '', subjectCode: '' });
            } catch (err) {
                Notiflix.Notify.Failure('You Reject Data' + err.message);
                this.setState({ loading: false, semId: 0, batchId: 0, departId: 0, subjectName: '', subjectCode: '' });
            }
        } else {
            Notiflix.Notify.Failure('Enter value');
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
    getSem = () => {
        return this.state.semData.map((data, i) => {
            if (data.batch_id == this.state.batchId) {
                return (
                    <option value={i} key={i}>{data.semester}</option>
                )
            }
        })
    }
    render() {
        const loading = this.state.loading;
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
                    <label>Semester:</label>
                    <select className="form-control" value={this.state.semId} onChange={e => this.setState({ semId: e.target.value })}>
                        {this.getSem()}
                    </select>
                </div>

                <div className="form-group">
                    <label>{this.state.formData.subjectName.labelText}</label>
                    <input
                        {...this.state.formData.subjectName.config}
                        value={this.state.subjectName}
                        onChange={e => this.setState({ subjectName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>{this.state.formData.subjectCode.labelText}</label>
                    <input
                        {...this.state.formData.subjectCode.config}
                        value={this.state.subjectCode}
                        onChange={e => this.setState({ subjectCode: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <button
                        {...this.state.formData.addSubject.config}
                        onClick={this.onSubmit}>
                        {(loading) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : this.state.formData.addSubject.value}
                    </button>
                </div>
            </div>
        )
    }
}
export default Add_subject;
