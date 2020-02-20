import React, {Component} from "react";

import FooterSmall from "components/FooterSmall.js";

function Modal() {

  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="text-white active:bg-ecm font-bold uppercase text-sm px-12 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        <small>Create new account</small>
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-800 rounded-t">
                  <h6 className="text-6lg font-semibold">
                    Check & Create User
                  </h6>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form>
                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                  <input type="text" placeholder="NPK" className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pr-10"/>
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-ecm-light text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Check NPK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
  
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      npk : "",
      password : ""
    }
  }

  npk = (e) => {
    this.setState({ npk : e.target.value });
  }

  password = (e) => {
    this.setState({ password : e.target.value });
  }

  submit = (e) => {
    e.preventDefault();
    if(this.state.npk.trim() === "") {
      alert('NPK tidak boleh kosong');
    } else if(this.state.password.trim() === "") {
      alert('Password tidak boleh kosong');
    } else {
      fetch('http://103.106.174.171:8080/ecm/api/v2/login', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body : JSON.stringify({
          npk : this.state.npk,
          password : this.state.password
        })
      }).then(response => response.json())
      .then(json => {
        if(json.Status === 200) {
          let token = json.Authorization.slice(7, -6);
          let data  = JSON.stringify(token);
          localStorage.setItem('auth', data);
          window.location.reload();
        } else {
          alert('Mohon cek kembali password anda atau kemungkinan anda belum mendaftar');
        }
      })
    }
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
                <div className="w-full lg:w-4/12 px-4">
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
                        <div className="text-gray-500 text-center mb-3 font-bold">
                          <small>This application is used only for ECM 2020 events</small>
                        </div>
                      </div>
                      <hr className="mt-6 border-b-1 border-gray-400" />
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            NPK
                          </label>
                          <input
                            type="NPK"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="NPK"
                            style={{ transition: "all .15s ease" }}
                            name="npk" onChange={this.npk}
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Password"
                            style={{ transition: "all .15s ease" }}
                            name="password" onChange={this.password}
                          />
                        </div>
                        
                        <div className="text-center mt-6">
                          <button
                            onClick={this.submit}
                            className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="flex flex-wrap mt-6">
                          <div className="w-full text-center">
                            <div className="relative w-full px-1 max-w-full flex-grow flex-1 text-center">
                              <Modal/>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FooterSmall absolute />
          </section>
        </main>
      </>
    );
  }
}

export default Login;
