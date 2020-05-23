import React, { Component } from 'react';
import subjects from '../ethereum/department';
import Notiflix, { Loading } from 'notiflix';

class View_subject extends Component {
    state = {
        loading:false,
        subLength: 0,
        requests: []
    };
    
    async componentDidMount() {
        const subLength = await subjects.methods.getSubjectsCount().call();
        try {
            const requests = await Promise.all(
                Array(parseInt(subLength))
                    .fill()
                    .map((element, index) => {
                        return subjects.methods.subjects(index).call();
                    })
            );
            this.setState({ requests, subLength });
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
                        <th scope="row">{index}</th>
                        <td>{request.subject_name}</td>
                        <td>{request.subject_code}</td>
                    </tr>
                )
            })
        } else if(this.state.loading == false) {
            Notiflix.Loading.Standard('Processing Data');
            this.setState({loading:true})
        }else{
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
                            <th scope="col">Subject ID</th>
                            <th scope="col">Subject Name</th>
                            <th scope="col">Subject Code</th>
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
export default View_subject;
