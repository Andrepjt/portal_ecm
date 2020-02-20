import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "views/Login.js";
import Registrasi from "views/Registrasi.js";
import Landing from "views/Landing.js";
import Dashboard from "views/Dashboard.js";
import Question from "views/Question.js";


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
      <BrowserRouter>
        {
          (this.state.auth === false) &&
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/register" component={Registrasi} />
          </Switch>

        }
        {
          (this.state.auth === true) &&
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/landing" component={Landing} />
            <Route path="/question" component={Question} />
            <Route path="/logout">{this.logout}</Route>
          </Switch>
        }

      </BrowserRouter>
    );
  }
}

export default App;
