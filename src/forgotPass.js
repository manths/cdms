import React, { Component } from 'react';
import faculties from '../src/ethereum/department';
import students from '../src/ethereum/department';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

export default class ForgotPass extends Component {
    constructor(props) {
        super(props);
    }

    contactTrue = []
    passwordTrue = []
    state = {
        forPass: '',
        studData: [],
        facData: []
    }

    async componentDidMount() {
        const facLength = await faculties.methods.getFacultiesCount().call();
        const studLength = await students.methods.getStudentsCount().call();
        try {
            const facData = await Promise.all(
                Array(parseInt(facLength))
                    .fill()
                    .map((element, index) => {
                        return faculties.methods.faculties(index).call();
                    })
            );
            const studData = await Promise.all(
                Array(parseInt(studLength))
                    .fill()
                    .map((element, index) => {
                        return students.methods.students(index).call();
                    })
            );
            this.setState({ facData, studData });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    studData = () => {
        return this.state.studData.map((val, index) => {
            let pass = JSON.parse(val.password)
            if (pass.oldPass !== '' & pass.newPass !== '') {
                let stdContact = { password: pass.newPass, contact: val.contact }
                stdContact = JSON.stringify(stdContact)
                return stdContact
            }
        })
    }
    facData = () => {
        return this.state.facData.map((val, index) => {
            let pass = JSON.parse(val.password)
            if (pass.oldPass !== '' & pass.newPass !== '') {
                let fctContact = { password: pass.newPass, contact: val.contact }
                fctContact = JSON.stringify(fctContact)
                return fctContact
            }
        })
    }
    chekContact = () => {
        let studContact = this.studData();
        let facContact = this.facData();

        let contact = [...studContact, ...facContact]
        contact = contact.filter((val, i) => {
            return val !== undefined
        })

        let [cont] = contact.filter((con, index) => {
            let conct = JSON.parse(con)
            return conct.contact == this.state.forPass ? this.contactTrue.splice(0, 1, conct.contact) && this.passwordTrue.splice(0, 1, conct.password) : ''
        })
        let chek = () => {
            this.contactTrue.splice(0, 1)
            this.passwordTrue.splice(0, 1)
            return 'Not Valid'
        }
        return cont !== undefined ? 'Valid' : chek()
    }

    sendMSG = async () => {
        let [contactTrue] = this.contactTrue
        let [passwordTrue] = this.passwordTrue
        if (contactTrue !== undefined) {
            let msg = ' Your Password is ' + ' ' + passwordTrue
            try {
                const res = await axios.get('http://localhost:5000/sms/' + contactTrue + '/' + msg)
                console.log(res)
                Notiflix.Notify.Success('text message sent Successfully  ');
            } catch (e) {
                console.log(e)
            }
        } else {
            Notiflix.Notify.Failure('Failure message sending');
        }
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Your Password </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group bg-white ">
                                <label className='bg-white'>Phone Number</label>
                                <input type='text' className='form-control' value={this.state.forPass} onChange={e => this.setState({ forPass: e.target.value })} />
                                {this.chekContact()}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.sendMSG}>Send Password</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}