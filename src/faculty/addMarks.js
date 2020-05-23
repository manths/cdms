import React, { Component } from 'react';
import Single_Marks from './singleMark';
import batches from '../ethereum/department';
import semesters from '../ethereum/department';
import students from '../ethereum/department';
import department from '../ethereum/department';
import { Redirect } from 'react-router-dom';
import Notiflix, { Loading } from 'notiflix';

export default class Add_marks extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        console.log('add marks', token)
        this.token = {
            token
        }
    }

    state = {
        loading: false,
        fullName: '',
        batchid: {},
        studId: 0,
        departId: 0,
        batchId: 0,
        studLength: 0,
        batchLength: 0,
        semLength: 0,
        departLength: 0,
        batchData: [],
        departData: [],
        semData: [],
        studData: [],
    }

    async componentDidMount() {
        const departLength = await department.methods.getDepartmentsCount().call();
        const semLength = await semesters.methods.getSemestersCount().call();
        const studLength = await students.methods.getStudentsCount().call();
        const batchLength = await department.methods.getBatchesCount().call();
        try {
            const departData = await Promise.all(
                Array(parseInt(departLength))
                    .fill()
                    .map((element, index) => {
                        return department.methods.departments(index).call();
                    })
            );
            const studData = await Promise.all(
                Array(parseInt(studLength))
                    .fill()
                    .map((element, index) => {
                        return students.methods.students(index).call();
                    })
            );
            const semData = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            const batchData = await Promise.all(
                Array(parseInt(batchLength))
                    .fill()
                    .map((element, index) => {
                        return batches.methods.batches(index).call();
                    })
            );
            this.setState({ studData, batchData, semData, departData, batchLength, semLength, studLength, departLength });
        }
        catch (err) {
            console.log(err.message);
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
            }
        })
    }
    chek = (e) => {
        this.setState({ fullName: e.target.name, studId: e.target.value, batchid: JSON.parse(e.target.id) })
    }
    renderRow = () => {
        if (this.state.departData.length !== 0 && this.state.batchData.length !== 0) {
            Notiflix.Loading.Remove()
            if (this.state.batchId !== -1 && this.state.departId !== -1) {
                return this.state.studData.map((request, studIndex) => {
                    let pass = JSON.parse(request.password)
                    if (request.department_id == this.state.departId && request.batch_id == this.state.batchId) {
                        if (pass.oldPass !== '' && pass.newPass !== '') {
                            return (
                                <tr key={studIndex}>
                                    <td>{`${request.first_name} ${request.last_name}`}</td>
                                    <td>{request.enrollment_no}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                                            onClick={(e) => this.chek(e)}
                                            value={studIndex}
                                            name={`${request.first_name} ${request.last_name}`}
                                            id={JSON.stringify({ bID: request.batch_id, dID: request.department_id })}
                                        >
                                            Add Marks
                                            </button>
                                    </td>
                                </tr>
                            )
                        }
                    }
                })
            }
        } else if (this.state.loading == false) {
            Notiflix.Loading.Standard('Processing Data');
            this.setState({ loading: true })
        } else {
            Notiflix.Loading.Remove(6000);
        }
    }
    render() {
        console.log(this.state.studData)
        if (this.token.token == null) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Single_Marks fullname={this.state.fullName} studid={this.state.studId} batchid={this.state.batchid} />
                <div className="form-group m-2">
                    <label>Department : </label>
                    <select className="form-control" value={this.state.departId} onChange={e => this.setState({ departId: e.target.value })}>
                        {this.getDepartment()}
                    </select>
                </div>
                <div className="form-group m-2">
                    <label>Batch : </label>
                    <select className="form-control" value={this.state.batchId} onChange={e => this.setState({ batchId: e.target.value })}>
                        {this.getBatch()}
                    </select>
                </div>
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Student Name</th>
                            <th scope="col">EnrollmentNo</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
            </div>

        )
    }
}
