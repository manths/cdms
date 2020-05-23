import React, { Component } from 'react';

class View_profile extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem('faculty')
        token = JSON.parse(token)
        let facQulEx = JSON.parse(token.qualificationexperience)
        console.log('view profile', token)
        this.state = {
            token,
            facQulEx
        }
    }

    render() {
        return (
            <div className='table table-bordered shadow-sm bg-white rounded'>
                <div className="form-group mt-3">
                    <label className="col">Faculty Name : <span className="col">{`${this.state.token.first_name} ${this.state.token.last_name}`}</span></label>
                </div>

                <div className="form-group">
                    <label className="col">Faculty Email : <span className="col">{this.state.token.email}</span></label>
                </div>

                <div className="form-group">
                    <label className="col">Faculty Qualification : <span className="col">{this.state.facQulEx.qualification}</span></label>
                </div>

                <div className="form-group">
                    <label className="col">Faculty Experience : <span className="col">{this.state.facQulEx.exprience}</span></label>
                </div>

                <div className="form-group" >
                    <label className="col">Faculty Designation : <span className="col">{this.state.token.designation}</span></label>
                </div>

            </div>
        )
    }
}
export default View_profile;
