import React, { Component } from 'react';
import midsems from '../ethereum/department';
import midmarks from '../ethereum/department';
import semesters from '../ethereum/department';
import { Spinner } from 'react-bootstrap';
import Notiflix, { Notify } from 'notiflix';

export default class Single_Mark extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        console.log('single marks', token)
        this.token = {
            token
        }
    }
    state = {
        loading: false,
        selectMid: 0,
        semSelect: 0,
        obtainedMark: 0,
        midsemData: [],
        semData: []
    }
    async componentDidMount() {
        const midsemLength = await midsems.methods.getMidSemsCount().call();
        const semLength = await semesters.methods.getSemestersCount().call();
        try {
            const midsemData = await Promise.all(
                Array(parseInt(midsemLength))
                    .fill()
                    .map((element, index) => {
                        return midsems.methods.midsems(index).call();
                    })
            );
            const semData = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            this.setState({ midsemData, semData });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    onSubmit = async () => {

        this.setState({ loading: true });
        let totalMarks = document.getElementById("totalMarks").value
        let subId = document.getElementById("subId").value
        try {
            await window.web3.eth.getAccounts();
            window.web3.currentProvider.enable();
            await midmarks.methods.assignMarksToStudent(this.state.selectMid, this.state.semSelect, this.props.studid, subId, this.props.fullname, totalMarks, this.state.obtainedMark)
                .send({
                    from: window.web3.currentProvider.selectedAddress
                });
            Notiflix.Notify.Success('Data Added Successfully!  ');
            this.setState({ loading: false, selectMid: 0, semSelect: 0, obtainedMark: 0 });
        } catch (err) {
            Notiflix.Notify.Failure('You Reject Data' + err.message);
            this.setState({ loading: false, selectMid: 0, semSelect: 0, obtainedMark: 0 });
        }
    }
    getSem = () => {
        return this.state.semData.map((data, i) => {
            if (data.batch_id == this.props.batchid.bID &&  data.department_id == this.props.batchid.dID)
                return (
                    <option value={i} key={i} onClick={e => this.setState({ semSelect: e.target.value })}>{data.semester}</option>
                )
        })
    }
    getMidSem = () => {
        return this.state.midsemData.map((data, i) => {
            if (data.department_id == this.props.batchid.dID && data.semester_id == this.state.semSelect) {
                return (
                    <option value={i} key={i}>{data.midsem_title}</option>
                )
            }
        })
    }
    getSub = () => {
        return this.state.midsemData.map((data, index) => {
            if (this.state.selectMid == index) {
                return (
                    <input type='text' key={index} value={data.subject_id} className="form-control w-50" id='subId' hidden />
                )
            }
        })
    }

    getMidTotalMarks = () => {
        return this.state.midsemData.map((data, i) => {
            if (this.state.selectMid == i) {
                return (
                    <input type='text' key={i} value={data.totalmarks} className="form-control w-50" id='totalMarks' disabled />
                )
            }
        })
    }

    render() {
        console.log(this.props)
        console.log(this.state.semData)
        let loading = this.state.loading;
        return (
            <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add MidSemMarks</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="form-group">
                                        <label>Semester : </label>
                                        <select className="form-control" value={this.state.semSelect} onChange={e => this.setState({ semSelect: e.target.value })}>
                                            {this.getSem()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-group ">
                                        <label>Student : </label>
                                        <input type="text" className="form-control" id='studentName' value={this.props.fullname} disabled />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        {this.getSub()}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-group ">
                                        <label>Select Mid : </label>
                                        <select className="form-control" value={this.state.selectMid} onChange={e => this.setState({ selectMid: e.target.value })}>
                                            {this.getMidSem()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group d-none">
                                    <div className="form-group ">
                                        <label>studKey : </label>
                                        <input type="text" className="form-control" id='studentId' value={this.props.studid} disabled />
                                    </div>
                                </div>
                                <div className="row ml-1">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Obtained Marks : </label>
                                            <input type="text" className="form-control" value={this.state.obtainedMark} onChange={e => this.setState({ obtainedMark: e.target.value })} placeholder="Obtained Marks" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Total Marks : </label>
                                            {this.getMidTotalMarks()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss='' onClick={this.onSubmit}>
                                    {(loading) ?
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : 'Add Marks'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}