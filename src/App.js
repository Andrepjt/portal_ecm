import React, {Component} from 'react';

import Login from "views/Login.js";
import Registrasi from "views/Registrasi.js";
import Landing from "views/Landing.js";
import Dashboard from "views/Dashboard.js";
import Question from "views/Question.js";


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth : false
    }
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth() {
    let data = localStorage.getItem("auth");
    let parsing = JSON.parse(data);
    if(!parsing) {
      this.setState({auth : false})
    } else {
      this.setState({auth : true})
    }
  }

  logout=(e)=>{
    localStorage.clear();
    window.location.href='/';
  }

  render() {
    return (
      <div>


      {
        (this.state.auth === false) &&
        <Router>
          <Route path="/" component={Login}/>
          <Route path="/register" component={Registrasi} />
        </Router>
      }


        {
          (this.state.auth === true) &&
          <Router>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/logout">{this.logout}</Route>
            </Switch>
          </Router>
        }

      </div>
    );
  }
}

export default App;
