import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home_Rout from '../src/routs';

class App extends Component {
    
    render(){
        return(
            <Home_Rout/>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

