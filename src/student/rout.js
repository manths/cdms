import React from 'react';
import { Route , Switch }from'react-router-dom';
import View_marks from './viewMarks';
import View_profile from './viewProfile';
import Dash from './Dashboard';

const Rout_student =()=>{
    return(
        <Switch>
            <Route path='/viewMarks'  exact component={View_marks}></Route>
            <Route path='/viewProfile' exact component={View_profile}></Route>
            <Route path='/' component={Dash}></Route>
        </Switch>
    )
}
export default Rout_student;
