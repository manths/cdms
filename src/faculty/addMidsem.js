import React, { Component } from 'react';
import departments from '../ethereum/department';
import subjects from '../ethereum/department';
import batches from '../ethereum/department';
import semesters from '../ethereum/department';
import midsems from '../ethereum/department';
import faculties from '../ethereum/department';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Notiflix, { Notify } from 'notiflix';

export default class Add_midsem extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        console.log('add midsem', token)
        this.token = {
            token
        }
    }
    state = {
        loading: false,
        semId: 0,
        batchId: 0,
        departId: 0,
        subjectId: 0,
        facId: 0,
        midSemTitle: '',
        selName: '',
        totalMarks: 0,
        departData: [],
        batchData: [],
        semData: [],
        subjectData: [],
        facultyData: [],
        facName: '',
        formData: {
            midTitle: {
                config: {
                    name: 'midTitle_input',
                    type: 'text',
                    placeholder: 'Enter Mid_Title',
                    className: 'form-control'
                }
            },
            midTitleMarks: {
                config: {
                    name: 'midTitleMarks_input',
                    type: 'text',
                    placeholder: 'Enter Mid_Title_Marks',
                    className: 'form-control'
                }
            },
            addMidsem: {
                value: 'Add Midsem',
                config: {
                    name: 'addMidsem_button',
                    type: 'button',
                    className: 'btn btn-primary my-1'
                }
            }
        }
    }

    async componentDidMount() {
        const departLength = await departments.methods.getDepartmentsCount().call();
        const batchLength = await batches.methods.getBatchesCount().call();
        const semLength = await semesters.methods.getSemestersCount().call();
        const subLength = await subjects.methods.getSubjectsCount().call();
        const facLength = await faculties.methods.getFacultiesCount().call();
        try {
            const departData = await Promise.all(
                Array(parseInt(departLength))
                    .fill()
                    .map((element, index) => {
                        return departments.methods.departments(index).call();
                    })
            );
            const subjectData = await Promise.all(
                Array(parseInt(subLength))
                    .fill()
                    .map((element, index) => {
                        return subjects.methods.subjects(index).call();
                    })
            );
            const batchData = await Promise.all(
                Array(parseInt(batchLength))
                    .fill()
                    .map((element, index) => {
                        return batches.methods.batches(index).call();
                    })
            );
            const semData = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            const facultyData = await Promise.all(
                Array(parseInt(facLength))
                    .fill()
                    .map((element, index) => {
                        return faculties.methods.faculties(index).call();
                    })
            );
            this.setState({ facultyData, departData, batchData, semData, subjectData });
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
            await midsems.methods.assignMidsemToSubject(this.state.departId, this.state.batchId, this.state.facId, this.state.semId, this.state.subjectId, this.state.midSemTitle, this.state.totalMarks)
                .send({
                    from: window.web3.currentProvider.selectedAddress
                });
            Notiflix.Notify.Success('Data Added Successfully!  ');
            this.setState({ loading: false, semId: 0, batchId: 0, departId: 0, subjectId: 0, midSemTitle: '', totalMarks: 0, facName: '' });
        } catch (err) {
            Notiflix.Notify.Failure('You Reject Data' + err.message);
            this.setState({ loading: false, semId: 0, batchId: 0, departId: 0, subjectId: 0, midSemTitle: '', totalMarks: 0, facName: '' });
        }
    }

    getDepartment = () => {
        return this.state.departData.map((data, i) => {
            return (
                <option value={i} key={i}>{data[0]}</option>
            )
        })
    }
    getBatch = () => {
        return this.state.batchData.map((data, i) => {
            if (data.department_id == this.state.departId) {
                return (
                    <option value={i} key={i}>{data[1]}</option>
                )
            }
        })
    }
    getSem = () => {
        return this.state.semData.map((data, i) => {
            if (data.batch_id == this.state.batchId && data.department_id == this.state.departId) {
                return (
                    <option value={i} key={i}>{data[2]}</option>
                )
            }
        })
    }
    getSubject = () => {
        return this.state.subjectData.map((data, i) => {
            if (data.semester_id == this.state.semId && data.batch_id == this.state.batchId && data.department_id == this.state.departId) {
                return (
                    <option value={i} key={i}>{data[3]}</option>
                )
            }
        })
    }
    facFind = () => {

        let name = this.state.facultyData.filter((faculty, index) => {
            let nm = faculty.first_name.toLowerCase()
            let nn = faculty.last_name.toLowerCase()
            return nm == this.state.facName || nn == this.state.facName
        })
        return name.map((data, i) => {
            let pass = JSON.parse(data.password)
            if (pass.newPass !== '') {
                if (this.state.selName == '') {
                    return (
                        <p className="font-weight-bolder" role='button'>
                            <option onClick={e => this.setState({ selName: e.target.value, facId: i })} value={`${data.first_name} ${data.last_name}`} key={i}>{data.first_name} {data.last_name}</option>
                        </p>
                    )
                } else {
                    if (this.state.selName == `${data.first_name} ${data.last_name}`) {
                        return this.setState({ facName: this.state.selName, selName: '' })
                    }
                }
            }
        })
    }
    render() {
        console.log(this.state.subjectData)
        if (this.token.token == null) {
            return <Redirect to='/login' />
        }

        const loading = this.state.loading;
        return (
            <div>
                <div className="form-group">
                    <label>Department:</label>
                    <select className="form-control" value={this.state.departId} onChange={e => this.setState({ departId: e.target.value })}>
                        {this.getDepartment()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Batch:</label>
                    <select className="form-control" value={this.state.batchId} onChange={e => this.setState({ batchId: e.target.value })}>
                        {this.getBatch()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Semester : </label>
                    <select className="form-control" value={this.state.semId} onChange={e => this.setState({ semId: e.target.value })}>
                        {this.getSem()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Subject : </label>
                    <select className="form-control" value={this.state.subjectId} onChange={e => this.setState({ subjectId: e.target.value })}>
                        {this.getSubject()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Faculty : </label>
                    <input type='text' className='form-control' placeholder='Enter Your FirstName Or LastName' value={this.state.facName} onChange={e => this.setState({ facName: e.target.value })} />
                    {this.facFind()}
                </div>
                <div className="form-group">
                    <label>MidTitle : </label>
                    <input
                        value={this.state.midSemTitle}
                        onChange={e => this.setState({ midSemTitle: e.target.value })}
                        {...this.state.formData.midTitle.config}
                    />
                </div>
                <div className="form-group">
                    <label>MidTotalMarks : </label>
                    <input
                        value={this.state.totalMarks}
                        onChange={e => this.setState({ totalMarks: e.target.value })}
                        {...this.state.formData.midTitleMarks.config}
                    />
                </div>
                <button
                    {...this.state.formData.addMidsem.config}
                    onClick={this.onSubmit}>
                    {(loading) ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : this.state.formData.addMidsem.value}
                </button>
            </div>
        )
    }
}
