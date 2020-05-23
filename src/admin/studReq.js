import React, { Component } from 'react';
import axios from 'axios';
import students from '../ethereum/department';
import Notiflix, { Notify } from 'notiflix';

export default class Studreq extends Component {
    state = {
        getId: 0,
        data: [],
    }

    componentDidMount = async () => {
        const studData = await axios.get('http://localhost:5000/student')
        this.setState({ data: studData.data })
    }

    getFacData = async (e) => {
        this.setState({ getId: e.target.id })
        if (this.state.getId !== 0) {
            const singelStudData = await axios.get('http://localhost:5000/find/student/' + this.state.getId)

            try {
                await window.web3.eth.getAccounts();
                window.web3.currentProvider.enable();
                await students.methods.createStudent(singelStudData.data.firstName, singelStudData.data.lastName, singelStudData.data.enrollmentNo, singelStudData.data.contact, singelStudData.data.password, singelStudData.data.batchId, singelStudData.data.departId)
                    .send({
                        from: window.web3.currentProvider.selectedAddress
                    });
                await axios.delete('http://localhost:5000/find/student/' + this.state.getId)
                Notiflix.Notify.Success('Data Added Successfully!  ');
            } catch (err) {
                Notiflix.Notify.Failure('You Reject Data' + err.message);
            }
        }
    }

    handleData = () => {
        if (this.state.data.length !== 0) {
            return this.state.data.map((val, i) => {
                let password = JSON.parse(val.password)
                return (
                    <tr key={i}>
                        <th scope="row">{i}</th>
                        <td>{`${val.firstName} ${val.lastName}`}</td>
                        <td>{val.enrollmentNo}</td>
                        <td>
                            <button type="button" className="btn btn-primary" id={val._id} onClick={this.getFacData} >
                                Add Req
                            </button>
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">EnrollmentNo</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.handleData()}
                    </tbody>
                </table>
            </div>
        )
    }
}