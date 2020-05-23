import React, { Component } from 'react';
import midsems from '../ethereum/department';
import departments from '../ethereum/department';
import subjects from '../ethereum/department';
import semesters from '../ethereum/department';

class View_midsem extends Component {

    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        console.log('view midsem', token)
        this.token = {
            token
        }
    }

    state = {
        midSemData: [],
        semData: [],
        subjectData: [],
        departData: []
    }

    async componentDidMount() {
        const midSemsLength = await midsems.methods.getMidSemsCount().call();
        const departLength = await departments.methods.getDepartmentsCount().call();
        const semLength = await semesters.methods.getSemestersCount().call();
        const subLength = await subjects.methods.getSubjectsCount().call();

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
            const semData = await Promise.all(
                Array(parseInt(semLength))
                    .fill()
                    .map((element, index) => {
                        return semesters.methods.semesters(index).call();
                    })
            );
            const midSemData = await Promise.all(
                Array(parseInt(midSemsLength))
                    .fill()
                    .map((element, index) => {
                        return midsems.methods.midsems(index).call();
                    })
            );

            this.setState({ midSemData, semData, subjectData, departData });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    getDepartment = (id) => {
        return this.state.departData.map((val, index) => {
            if (id == index) {
                return val.department_name
            }
        })
    }
    getSubject = (id) => {
        return this.state.subjectData.map((val, index) => {
            if (id == index) {
                return val.subject_name
            }
        })
    }
    getSemester = (id) => {
        return this.state.semData.map((val, index) => {
            if (id == index) {
                return val.semester
            }
        })
    }

    setMidSemData = () => {
        return this.state.midSemData.map((val, index) => {
            return (
                <tr>
                    <td>{this.getDepartment(val.department_id)}</td>
                    <td>{this.getSemester(val.semester_id)}</td>
                    <td>{this.getSubject(val.subject_id)}</td>
                    <td>{val.midsem_title}</td>
                </tr>
            )
        })
    }

    render() {
        console.log(this.state.midSemData)
        return (
            <div>
                <table className="table shadow-sm bg-white rounded">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Department</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Midsem Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.setMidSemData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default View_midsem;
