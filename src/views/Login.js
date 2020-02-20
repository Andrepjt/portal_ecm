import React, {Component} from "react";

import FooterSmall from "components/FooterSmall.js";

import DatePicker from 'react-date-picker';

import {
  Link
} from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      npk : "",
      password : "",
      loading : false,


      register : false,
      part : false,


      npk_regis : "",
      nama : "",
      email : "",
      date : new Date(),
      password_regis : "",
      confirm_password_regis : "",
      loading_regis : false,

    }
  }

  npk = (e) => {
    this.setState({ npk : e.target.value });
  }

  password = (e) => {
    this.setState({ password : e.target.value });
  }



  ///
  onChange = date => this.setState({ date })


  npk_regis = (e) => {
    this.setState({ npk_regis : e.target.value });
  }

  password_regis = (e) => {
    this.setState({ password_regis : e.target.value });
  }

  confirm_password_regis = (e) => {
    this.setState({ confirm_password_regis : e.target.value });
  }


  submit = (e) => {
    e.preventDefault();
    if(this.state.npk.trim() === "") {
      alert('NPK tidak boleh kosong');
    } else if(this.state.password.trim() === "") {
      alert('Password tidak boleh kosong');
    } else {
      this.setState({loading : true});
      fetch('http://103.106.174.171:8080/ecm/api/v2/login', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body : JSON.stringify({
          npk : this.state.npk,
          password : this.state.password,
        })
      }).then(response => response.json())
      .then(json => {
        this.setState({loading : false});
        if(json.Status === 200) {
          let token = json.Authorization.slice(7);
          let data  = JSON.stringify(token);
          localStorage.setItem('auth', data);
          window.location.reload();
        } else {
          alert('Mohon cek kembali password anda atau kemungkinan anda belum mendaftar');
        }
      })
    }
  }





  submitCheck = (e) => {
    e.preventDefault();
    if(this.state.npk_regis.trim() === "") {
      alert('NPK TIDAK BOLEH KOSONG!')
    } else {
      this.setState({
        loading_regis : true
      });
      fetch('http://103.106.174.171:8080/ecm/api/v2/user/check/'+this.state.npk_regis, {
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        this.setState({ loading_regis : false });
        if(json.Status === 200) {
          this.setState({
            part : true,
            email : json.Data.email,
            nama : json.Data.Nama_karyawan
          });
        } else {
          alert('DATA TIDAK DITEMUKAN!');
        }
      });
    }
  }

  register = (e) => {
    let bulan = this.state.date.getMonth() + 1;
    let tanggal  = this.state.date.getFullYear() + '-' + bulan + '-' + this.state.date.getDate();
    console.log(this.state.npk_regis+ ' '+ this.state.nama +' '+this.state.email +' '+this.state.password + ' ' +tanggal);
    e.preventDefault();
    if(this.state.password_regis.trim() === "") {
      alert('PASSWORD TIDAK BOLEH KOSONG!');
    } else if (this.state.confirm_password_regis.trim() === "") {
      alert('CONFIRM PASSWORD TIDAK BOLEH KOSONG!');
    } else if(this.state.password_regis !== this.state.confirm_password_regis) {
      alert('PASSWORD DAN CONFIRM TIDAK SAMA!');
    } else {
      this.setState({ loading_regis : true});
      let bulan = this.state.date.getMonth() + 1;
      let tanggal  = this.state.date.getFullYear() + '-' + bulan + '-' + this.state.date.getDate();
      fetch('http://103.106.174.171:8080/ecm/api/v2/user/registration', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body : JSON.stringify({
          Npk : this.state.npk_regis,
          fullname : this.state.nama,
          email : this.state.email,
          password : this.state.password_regis,
          birthday : tanggal
        })
      }).then(response => response.json())
      .then(json => {
        this.setState({ loading_regis : false });
        if(json.Status === 201) {
          alert('Berhasil membuat akun!, Silahkan Login');
          setTimeout(()=>{
            window.location.reload();
          }, 500);
        } else {
          alert('Gagal membuat akun!');
        }
      });
    }
  }

  render() {
    if(this.state.register == false) {
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
                              className="w-48"
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
                        <form onSubmit={this.submit}>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-white text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              NPK
                            </label>
                             <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                              <i className="fas fa-user"></i>
                            </span>
                            <input type="text"
                              placeholder="NPK"
                              style={{ transition: "all .15s ease" }}
                              name="npk" onChange={this.npk}
                              className="px-3 py-3 pl-10 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              />

                            {/*<input
                              type="NPK"
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              placeholder="NPK"
                              style={{ transition: "all .15s ease" }}
                              name="npk" onChange={this.npk}
                            />*/}
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-white text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Password
                            </label>
                            <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                              <i className="fas fa-lock"></i>
                            </span>
                            <input
                              type="password"
                              className="px-3 py-3 pl-10 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                              placeholder="Password"
                              style={{ transition: "all .15s ease" }}
                              name="password" onChange={this.password}
                            />
                          </div>

                          <div className="text-center mt-6">
                            <button

                              className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="submit"
                              style={{ transition: "all .15s ease" }}
                            >
                            {
                              (this.state.loading === false) &&
                              <div>Sign In</div>
                            }
                            {
                              (this.state.loading === true) &&
                              <div>Loading...</div>
                            }

                            </button>
                          </div>
                          <div className="flex flex-wrap mt-2">
                            <div className="w-full text-center">
                              <div className="relative w-full px-1 max-w-full flex-grow flex-1 text-center">
                                <button
                                  onClick={()=>this.setState({ register : true })}
                                  className="text-ecm-light active:bg-ecm font-bold uppercase text-sm px-12 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                  type="button"
                                >
                                  <small>Create new account</small>
                                </button>
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
    } else if (this.state.register == true) {
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

                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <br/>
                        {
                          (this.state.part === false) &&
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
                                name="npk" onChange={this.npk_regis}
                              />
                            </div>

                            <div className="text-center mt-6">
                              <button
                                onClick={this.submitCheck}
                                className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                              {
                                (this.state.loading === true) &&
                                <div>Loading...</div>
                              }
                              {
                                (this.state.loading === false) &&
                                <div>Checking Npk</div>
                              }

                              </button>
                            </div>

                            <div className="text-center mt-6">
                                <button
                                  onClick={()=>window.location.reload()}
                                  className="bg-ecm-dark text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                  type="button"
                                  style={{ transition: "all .15s ease" }}
                                >
                                  Back to Login
                                </button>
                            </div>
                          </form>
                        }

                        {
                          (this.state.part === true) &&
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
                                name="npk" value={this.state.npk_regis}
                                disabled
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                EMAIL
                              </label>
                              <input
                                type="NPK"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                placeholder="NPK"
                                style={{ transition: "all .15s ease" }}
                                name="npk" value={this.state.email}
                                disabled
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                NAMA KARYAWAN
                              </label>
                              <input
                                type="NPK"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                placeholder="NPK"
                                style={{ transition: "all .15s ease" }}
                                name="npk" value={this.state.nama}
                                disabled
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                TANGGAL LAHIR
                              </label>
                              <DatePicker
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                onChange={this.onChange}
                                value={this.state.date}
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
                                placeholder="PASSWORD"
                                style={{ transition: "all .15s ease" }}
                                onChange={this.password_regis}
                                name="npk" value={this.state.password_regis}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                placeholder="CONFIRM PASSWORD"
                                style={{ transition: "all .15s ease" }}
                                onChange={this.confirm_password_regis}
                                name="npk" value={this.state.confirm_password_regis}
                              />
                            </div>

                            <div className="text-center mt-6">
                              <button
                                onClick={this.register}
                                className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                {
                                  (this.state.loading_regis === true) &&
                                  <div>Loading...</div>
                                }
                                {
                                  (this.state.loading_regis === false) &&
                                  <div>Sign Up</div>
                                }

                              </button>
                            </div>

                            <div className="text-center mt-6">
                              <button
                                onClick={()=>this.setState({ register : false, part: false })}
                                className="bg-ecm-dark text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                Back to Login
                              </button>
                            </div>
                          </form>
                        }

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
}

export default Login;
