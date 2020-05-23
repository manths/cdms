import React, { Component } from 'react'
import '../index.css';

export default class GradeHistory extends Component {

    render() {
        return (
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th className="bg-info text-white border border-black">Department</th>
                            <td className="bg-light text-dark bg-light text-dark" >Computer</td>
                            <th className="bg-info text-white border border-black">Batch</th>
                            <td className="bg-light text-dark border-bottom border-black">CE2020</td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th className="bg-dark text-white border border-black">Semester</th>
                            <td className="bg-light text-dark border border-black">1</td>
                        </tr>
                        <tr className="bg-dark text-white">
                            <th >Subject_Code</th>
                            <th >Subject_Name</th>
                            <th >Obtained_Marks</th>
                            <th >Total_Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>  
                            <td>Mark</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}