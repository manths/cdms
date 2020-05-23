import React, { Component } from 'react';
import batches from '../ethereum/department';
import department from '../ethereum/department';
import Notiflix, { Loading } from 'notiflix';

class View_batch extends Component {
    state = {
        loading:false,
        batchLength: 0,
        setDepartId: 0,
        requests: [],
        departData: []
    };

    async componentDidMount() {
        const batchLength = await batches.methods.getBatchesCount().call();
        const departLength = await department.methods.getDepartmentsCount().call();
        try {
            const requests = await Promise.all(
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
            this.setState({ requests, batchLength, departData });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    setDepartment = () => {
        return this.state.departData.map((val, i) => {
            return (
                <option key={i} value={i}>{val.department_name}</option>
            )
        })
    }

    getDepartment = (id) => {
        return this.state.departData.map((data, i) => {
            if (i == id) {
                return data.department_name
            }
        })
    }
    renderRow = () => {
        if (this.state.requests.length !== 0) {
            Notiflix.Loading.Remove()
            return this.state.requests.map((request, index) => {
                if (this.state.setDepartId == request.department_id) {
                    return (
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{request.batch_name}</td>
                            <td>{request.start_year}</td>
                            <td>{request.end_year}</td>
                            <td>{this.getDepartment(request.department_id)}</td>
                        </tr>
                    )
                }
            })
        } else if (this.state.loading == false) {
            Notiflix.Loading.Standard('Processing Data');
            this.setState({ loading: true })
        } else {
            Notiflix.Loading.Remove(6000);
        }
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Department:</label>
                    <select className="form-control" value={this.state.setDepartId} onChange={e => this.setState({ setDepartId: e.target.value })}>
                        {this.setDepartment()}
                    </select>
                </div>
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Batch Id</th>
                            <th scope="col">Batch Name</th>
                            <th scope="col">Start Year</th>
                            <th scope="col">End Year</th>
                            <th scope="col">Department</th>
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
export default View_batch;
