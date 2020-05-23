import React, { Component } from 'react';
import faculties from '../ethereum/department';
import Notiflix, { Loading } from 'notiflix';

class View_faculty extends Component {
    state = {
        loading:false,
        facLength: 0,
        requests: []
    };

    async componentDidMount() {
        const facLength = await faculties.methods.getFacultiesCount().call();
        try {
            const requests = await Promise.all(
                Array(parseInt(facLength))
                    .fill()
                    .map((element, index) => {
                        return faculties.methods.faculties(index).call();
                    })
            );
            this.setState({ requests, facLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    renderRow = () => {
        if (this.state.requests.length !== 0) {
            Notiflix.Loading.Remove()
            return this.state.requests.map((request, index) => {
                console.log(request)
                return (
                    <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{`${request.first_name} ${request.last_name}`}</td>
                        <td>{request.designation}</td>
                        <td>{request.email}</td>
                    </tr>
                )
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
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Faculty ID</th>
                            <th scope="col">Faculty Name</th>
                            <th scope="col">Faculty Designation</th>
                            <th scope="col">Faculty Email</th>
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
export default View_faculty;
