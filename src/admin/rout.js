import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Add_department from './addDepartment';
import View_department from './viewDepartment';
import Add_subject from './addSubject';
import View_subject from './viewSubject';
import Add_student from './addStudent';
import View_student from './viewStudent';
import Add_faculties from './addFaculty';
import View_faculties from './viewFaculty';
import Add_batch from './addBatch';
import View_batch from './viewBatch';
import Add_semester from './addSemester';
import View_semester from './viewSemester';
import Facreq from './facReq';
import Studreq from './studReq';
import Dash from './Dashboard';

const Rout_admin = () => {
    return (
        <Switch>
            <Route path='/addDepartment' exact component={Add_department}></Route>
            <Route path='/viewDepartment' exact component={View_department}></Route>
            <Route path='/addSubject' exact component={Add_subject}></Route>
            <Route path='/viewSubject' exact component={View_subject}></Route>
            <Route path='/addStudent' exact component={Add_student}></Route>
            <Route path='/viewStudent' exact component={View_student}></Route>
            <Route path='/addFaculties' exact component={Add_faculties}></Route>
            <Route path='/viewFaculties' exact component={View_faculties}></Route>
            <Route path='/addBatch' exact component={Add_batch}></Route>
            <Route path='/viewBatch' exact component={View_batch}></Route>
            <Route path='/addSemester' exact component={Add_semester}></Route>
            <Route path='/viewSemester' exact component={View_semester}></Route>
            <Route path='/studreq' exact component={Studreq}></Route>
            <Route path='/facreq' exact component={Facreq}></Route>
            <Route path='/' component={Dash}></Route>
        </Switch>
    )
}
export default Rout_admin;
