import React, { Component } from 'react';
import department from '../ethereum/department';
import '../ethereum/web3';
import batches from '../ethereum/department';
import { Spinner } from 'react-bootstrap';
import Notiflix, { Notify } from 'notiflix';

class Add_batch extends Component {
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
        departId: 0,
        bName: '',
        startYr: Number,
        endYr: Number,
        requests: [],

        formData: {
            batchName: {
                config: {
                    name: 'batchName_input',
                    type: 'text',
                    placeholder: 'Enter Batch Name',
                    className: 'form-control'
                }
            },
            startYear: {
                config: {
                    name: 'startYear_date',
                    type: 'date',
                    className: 'form-control',
                }
            },
            endYear: {
                config: {
                    name: 'endYear_date',
                    type: 'date',
                    className: 'form-control',
                }
            },
            addBatch: {
                value: 'Add Batch',
                config: {
                    name: 'addBatch_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    }

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
            this.setState({ requests });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    onSubmit = async () => {

        this.setState({ loading: true });

        try {
            await window.web3.eth.getAccounts();
            window.web3.currentProvider.enable();
            await batches.methods.createBatch(this.state.departId, this.state.bName, this.state.startYr, this.state.endYr)
                .send({
                    from: window.web3.currentProvider.selectedAddress
                });
            Notiflix.Notify.Success('Data Added Successfully!  ');
            this.setState({ loading: false, departId: 0, bName: '', startYr: Number, endYr: Number });
        } catch (err) {
            Notiflix.Notify.Failure('You Reject Data'+err.message);
            this.setState({ loading: false, departId: 0, bName: '', startYr: Number, endYr: Number });
        }
    }

    getDepartment = () => {
        return this.state.requests.map((data, i) => {
            return (
                <option value={i} key={i}>{data[0]}</option>
            )
        })
    }
    render() {
        const loading = this.state.loading;
        return (
            <div>
                <div className="form-group">
                    <label>Department:</label>
                    <select className="form-control" value={this.state.departId} onChange={(e) => this.setState({ departId: e.target.value })}>
                        {this.getDepartment()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Batch Name:</label>
                    <input
                        {...this.state.formData.batchName.config}
                        value={this.state.bName}
                        onChange={e => this.setState({ bName: e.target.value })}
                    />
                </div>

                <div className="form-group" >
                    <label>Start Year</label>
                    <input
                        {...this.state.formData.startYear.config}
                        value={this.state.startYr}
                        onChange={e => this.setState({ startYr: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>End Year</label>
                    <input
                        {...this.state.formData.endYear.config}
                        value={this.state.endYr}
                        onChange={e => this.setState({ endYr: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <button
                        {...this.state.formData.addBatch.config}
                        onClick={this.onSubmit} >
                        {(loading) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : this.state.formData.addBatch.value}
                    </button>
                </div>
            </div >
        )
    }
}
export default Add_batch;
