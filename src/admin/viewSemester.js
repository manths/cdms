import React, { Component } from 'react';
import semesters from '../ethereum/department';
import Notiflix, { Loading } from 'notiflix';

class View_semester extends Component {
    state = {
        loading:false,
        semLength: 0,
        requests: []
    };

    async componentDidMount() {
        const semLength = await semesters.methods.getSemestersCount().call();
        try {
            const requests = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            this.setState({ requests, semLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    renderRow = () => {
        if (this.state.requests.length !== 0) {
            Notiflix.Loading.Remove()
            return this.state.requests.map((request, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{request.semester}</th>
                        <td>{request.start_date}</td>
                        <td>{request.end_date}</td>
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
        console.log(this.state.requests)
        return (
            <div>
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Semester</th>
                            <th scope="col">Start_Date</th>
                            <th scope="col">End_Date</th>
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
export default View_semester;
