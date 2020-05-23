import React from 'react';
import { Route , Switch }from'react-router-dom';
import Add_marks from './addMarks';
import View_profile from './viewProfile';
import  Add_midsem from './addMidsem';
import  View_midsem from './viewMidsem';
import Dash from './Dashboard';

const Rout_faculty =()=>{
    return(
        <Switch>
            <Route path='/addMarks'  exact component={Add_marks}></Route>
            <Route path='/viewProfile' exact component={View_profile}></Route>
            <Route path='/viewMidsem' exact component={View_midsem}></Route>
            <Route path='/addMidsem' exact component={Add_midsem}></Route>
            <Route path='/' component={Dash}></Route>
        </Switch>
    )
}
export default Rout_faculty;
