import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      status_npk : false,
      username: '',
      password:'',
      npk: '',
      token:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOUEsiOiIzNzEwIiwiYXV0aG9yaXplZCI6dHJ1ZSwiZXhwIjoxNTgwOTY1NjI1fQ.AEIcGFKzf5cmOH2iVlXowhjZ_Ztf-kd4qF8I6KFCtJU',
    }
  }

  componentDidMount(){
    fetch('http://103.106.174.171:8080/ecm/api/v2/user/profile',{
      headers: { Authorization: "Bearer " + this.state.token }
    })
    .then(response => response.json())
    .then(json => console.log(json))
    
    // Make a request for a user with a given ID
    axios.get('http://103.106.174.171:8080/ecm/api/v2/user/check/3710')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  login = () => {
    let data = {
      "npk": this.state.npk,
      "password": this.state.password
    }
    console.log('data: ', data);

    axios.post('http://103.106.174.171:8080/ecm/api/v2/login',data,{
      "header" :"Content-Type: application/x-www-form-urlencoded"
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  checking = () => {
    this.setState({
      status_npk : true
    });
  }

  
  render() {
  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-2">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-ecm border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-ecm active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-20 mr-1"
                          src={require("assets/img/logo.png")}
                        />
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                        >
                          NPK
                        </label>
                        <input
                          type="NPK"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="NPK"
                          style={{ transition: "all .15s ease" }}
                          value={this.state.npk}
                          onChange={event=> this.setState({npk: event.target.value})}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          value={this.state.password}
                          onChange={event=> this.setState({password: event.target.value})}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-white">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-ecm-light text-white active:bg-red-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                           onClick={() => this.login()}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
  }
}

export default Login;