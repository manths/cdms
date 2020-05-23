import React, { Component } from 'react';
import semesters from '../ethereum/department';
import midmarks from '../ethereum/department';
import subjects from '../ethereum/department';
import midsems from '../ethereum/department';
import students from '../ethereum/department';
import Notiflix, { Loading } from 'notiflix';

class View_marks extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('student')
        token = JSON.parse(token)
        console.log('view marks', token)
        this.token = {
            token
        }
    }
    subId = []
    dataTotalMarks = []
    dataObtainMarks = []
    marksData = []
    state = {
        loading: false,
        message: '',
        semSelect: 0,
        midMarksData: [],
        semData: [],
        studData: [],
        subData: [],
        midSemData: []
    }
    async componentDidMount() {
        const midMarksLength = await midmarks.methods.getMidMarksCount().call();
        const semLength = await semesters.methods.getSemestersCount().call();
        const subLength = await subjects.methods.getSubjectsCount().call();
        const studLength = await students.methods.getStudentsCount().call();
        const midSemLength = await midsems.methods.getMidSemsCount().call();
        try {
            const midMarksData = await Promise.all(
                Array(parseInt(midMarksLength))
                    .fill()
                    .map((element, index) => {
                        return midmarks.methods.midmarks(index).call();
                    })
            );
            const semData = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            const midSemData = await Promise.all(
                Array(parseInt(midSemLength))
                    .fill()
                    .map((element, index) => {
                        return midsems.methods.midsems(index).call();
                    })
            );
            const subData = await Promise.all(
                Array(parseInt(subLength))
                    .fill()
                    .map((element, index) => {
                        return subjects.methods.subjects(index).call();
                    })
            );
            const studData = await Promise.all(
                Array(parseInt(studLength))
                    .fill()
                    .map((element, index) => {
                        return students.methods.students(index).call();
                    })
            );
            this.setState({ midMarksData, semData, subData, studData, midSemData });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getSem = () => {
        return this.state.semData.map((data, index) => {
            if (data.department_id == this.token.token.department_id && this.token.token.batch_id == data.batch_id) {
                return (
                    <option value={index} key={index} onClick={e => this.setState({ semSelect: e.target.value })}>{data.semester}</option>
                )
            }
        })
    }

    getSub = () => {
        if (this.state.subData.length !== 0) {
            Notiflix.Loading.Remove()
            return this.state.subData.map((data, index) => {
                for (let i in this.subId) {
                    if (this.subId[i] == index) {
                        if (data.department_id == this.token.token.department_id && this.token.token.batch_id == data.batch_id && data.semester_id == this.state.semSelect) {
                            return (
                                <tr key={index}>
                                    <th scope='col'>{index}</th>
                                    <td scope='col'>{data.subject_name}</td>
                                    <td scope='col'>{data.subject_code}</td>
                                    <td scope='col'>{this.dataObtainMarks[i]}</td>
                                    <td scope='col'>{this.dataTotalMarks[i]}</td>
                                </tr>
                            )
                        }
                    }
                }
            })
        } else if (this.state.loading == false) {
            Notiflix.Loading.Standard('Processing Data');
            this.setState({ loading: true })
        } else {
            Notiflix.Loading.Remove(8000);
        }
    }

    getSubId = () => {
        this.state.midMarksData.map((data, index) => {
            if (data.student_name == `${this.token.token.first_name} ${this.token.token.last_name}`) {
                this.subId.push(data.subject_id)
                const sortAsc = (a, b) => a - b;
                this.subId = this.subId.sort(sortAsc)
            }
        })
    }

    componentDidUpdate = () => {
        this.subId = []
        this.marksData = []
    }

    getMarks = () => {

        for (let i in this.state.midMarksData) {
            let subid = this.subId[i]
            for (let j in this.state.midMarksData) {
                if (subid == this.state.midMarksData[j].subject_id && this.state.midMarksData[j].student_name == `${this.token.token.first_name} ${this.token.token.last_name}`) {
                    this.marksData.push(this.state.midMarksData[j])
                    this.dataTotalMarks.push(this.state.midMarksData[j].total_marks)
                    this.dataObtainMarks.push(this.state.midMarksData[j].obtained_marks)
                }
            }
        }
    }

    render() {
        this.getSubId()
        this.getMarks()
        // console.log(this.state.subData)
        // console.log(this.marksData)
        // console.log(this.state.midMarksData)
        // console.log(this.subId)
        return (
            <div>
                <div className="form-group">
                    <label>Semester:</label>
                    <select className="form-control" value={this.state.semSelect} onChange={e => this.setState({ semSelect: e.target.value })}>
                        {this.getSem()}
                    </select>
                </div>

                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Subject Name</th>
                            <th scope="col">Subject Code</th>
                            <th scope="col">Obtained Marks</th>
                            <th scope="col">Total Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getSub()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default View_marks;
