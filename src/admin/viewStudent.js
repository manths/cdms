import React, { Component } from 'react';
import students from '../ethereum/department';
import department from '../ethereum/department';
import batches from '../ethereum/department';
import Notiflix, { Loading } from 'notiflix';

class View_student extends Component {
    state = {
        loading:false,
        selectStud: 0,
        studLength: 0,
        batchLength: 0,
        departLength: 0,
        studData: [],
        batchData: [],
        departData: [],
        selectBatch: 0,
        selectDepart: 0
    }

    async componentDidMount() {
        const studLength = await students.methods.getStudentsCount().call();
        const batchLength = await batches.methods.getBatchesCount().call();
        const departLength = await department.methods.getDepartmentsCount().call();
        try {
            const studData = await Promise.all(
                Array(parseInt(studLength))
                    .fill()
                    .map((element, index) => {
                        return students.methods.students(index).call();
                    })
            );
            const batchData = await Promise.all(
                Array(parseInt(batchLength))
                    .fill()
                    .map((element, index) => {
                        return batches.methods.batches(index).call();
                    })
            );
            const departData = await Promise.all(
                Array(parseInt(departLength))
                    .fill()
                    .map((element, index) => {
                        return department.methods.departments(index).call();
                    })
            );
            this.setState({ studData, batchData, departData, studLength, departLength, batchLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getDepartment = (id) => {
        return this.state.departData.map((data, i) => {
            if (i == id) {
                return data.department_name
            }
        })
    }
    getBatch = (id) => {
        return this.state.batchData.map((data, i) => {
            if (i == id) {
                return data.batch_name
            }
        })
    }
    renderRow = () => {
        if (this.state.studData.length !== 0) {
            Notiflix.Loading.Remove()
            return this.state.studData.map((request, index) => {
                let pass = JSON.parse(request.password)
                if (pass.oldPass !== '' && pass.newPass !== '') {
                    if (request.department_id == this.state.selectDepart && request.batch_id == this.state.selectBatch) {
                        return (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{`${request.first_name} ${request.last_name}`}</td>
                                <td>{this.getDepartment(request.department_id)}</td>
                                <td>{this.getBatch(request.batch_id)}</td>
                                <td>{request.contact}</td>
                            </tr>
                        )
                    }
                }
            })
        } else if (this.state.loading == false) {
            Notiflix.Loading.Standard('Processing Data');
            this.setState({ loading: true })
        } else {
            Notiflix.Loading.Remove(6000);
        }

    }
    getBatches = () => {
        return this.state.batchData.map((data, i) => {
            if (data.department_id == this.state.selectDepart) {
                return (
                    <option value={i} key={i}>{data.batch_name}</option>
                )
            }
        })
    }
    getDepartments = () => {
        return this.state.departData.map((data, i) => {
            return (
                <option value={i} key={i} >{data.department_name}</option>
            )
        })
    }
    render() {
        return (
            <div>
                <div className="form-group" >
                    <label>Department:</label>
                    <select className="form-control" value={this.state.selectDepart} onChange={(e) => this.setState({ selectDepart: e.target.value })}>
                        {this.getDepartments()}
                    </select>
                </div>
                <div className="form-group" >
                    <label>Batch:</label>
                    <select className="form-control" value={this.state.selectBatch} onChange={(e) => this.setState({ selectBatch: e.target.value })}>
                        {this.getBatches()}
                    </select>
                </div>
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Student Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Batch</th>
                            <th scope="col">Contact</th>
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
export default View_student;
