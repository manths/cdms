import React, { Component } from 'react';
import batches from '../ethereum/department';

class View_profile extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('student')
        token = JSON.parse(token)
        console.log('view profile', token)
        this.token = {
            token
        }
    }
    state = {
        batchLength: 0,
        batchData: []
    }
    async componentDidMount() {
        const batchLength = await batches.methods.getBatchesCount().call();
        try {
            const batchData = await Promise.all(
                Array(parseInt(batchLength))
                    .fill()
                    .map((element, index) => {
                        return batches.methods.batches(index).call();
                    })
            );
            this.setState({ batchData, batchLength });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    getBatch = () => {
        return this.state.batchData.map((data, i) => {
            if (i == this.token.token.batch_id) {
                return data.batch_name
            }
        })
    }
    render() {
        return (
            <div className='table table-bordered shadow-sm bg-white rounded mt-2'>
                <div className="form-group mt-2">
                    <label className="col">Student Name : <span>{`${this.token.token.first_name} ${this.token.token.last_name}`}</span></label>
                </div>

                <div className="form-group">
                    <label className="col">Enrollment Number : <span>{this.token.token.enrollment_no}</span></label>
                </div>

                <div className="form-group">
                    <label className="col">Contact : <span>{this.token.token.contact}</span></label>
                </div>

                <div className="form-group" >
                    <label className="col">Batch : <span>{this.getBatch()}</span> </label>
                </div>

            </div>
        )
    }
}
export default View_profile;
