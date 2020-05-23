import React, { Component } from 'react';
import department from '../ethereum/department';
import '../ethereum/web3';
import Notiflix, { Loading } from 'notiflix';

class View_department extends Component {

    state = {
        loading:false,
        departLength: 0,
        requests: []
    };

    async componentDidMount() {
        const departLength = await department.methods.getDepartmentsCount().call();
        try {
            const requests = await Promise.all(
                Array(parseInt(departLength))
                    .fill()
                    .map((element, index) => {
                        return department.methods.departments(index).call();
                    })
            );
            this.setState({ requests, departLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    renderRows() {
        if (this.state.requests.length !== 0) {
            Notiflix.Loading.Remove()
            return this.state.requests.map((request, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{request.department_name}</td>
                        <td>{request.department_hod}</td>
                    </tr>
                );
            });
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
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Dept Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">HOD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default View_department;
