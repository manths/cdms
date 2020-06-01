import React, { Component } from 'react';
import axios from 'axios';
import faculties from '../ethereum/department';
import Notiflix, { Notify } from 'notiflix';

export default class Facreq extends Component {

    state = {
        getId: 0,
        data: [],
    }
    componentDidMount = async () => {
        const facData = await axios.get('https://powerful-sea-39429.herokuapp.com/faculty')
        this.setState({ data: facData.data })
    }

    getFacData = async (e) => {
        this.setState({ getId: e.target.id })
        if (this.state.getId !== 0) {
            const singelFacData = await axios.get('https://powerful-sea-39429.herokuapp.com/find/faculty/' + this.state.getId)

            try {
                await window.web3.eth.getAccounts();
                window.web3.currentProvider.enable();
                await faculties.methods.createFaculty(singelFacData.data.firstName, singelFacData.data.lastName, singelFacData.data.email, singelFacData.data.contact, singelFacData.data.password, singelFacData.data.designation, singelFacData.data.expQl)
                    .send({
                        from: window.web3.currentProvider.selectedAddress
                    });
                await axios.delete('https://powerful-sea-39429.herokuapp.com/find/faculty/' + this.state.getId)
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
                        <td>{val.email}</td>
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
                            <th scope="col">Faculty Name</th>
                            <th scope="col">Email</th>
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