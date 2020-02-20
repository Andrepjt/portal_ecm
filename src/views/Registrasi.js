import React, {Component} from "react";
import DatePicker from 'react-date-picker';
import FooterSmall from "components/FooterSmall.js";
import {
  Link,
  Redirect
} from "react-router-dom";

class Registrasi extends Component {
  constructor() {
    super();
    this.state = {
      part : false,
      npk : "",
      nama : "",
      email : "",
      date : new Date(),
      password : "",
      confirm_password : "",
      loading : false
    }
  }


  onChange = date => this.setState({ date })


  npk = (e) => {
    this.setState({ npk : e.target.value });
  }

  password = (e) => {
    this.setState({ password : e.target.value });
  }

  confirm_password = (e) => {
    this.setState({ confirm_password : e.target.value });
  }

  submitCheck = (e) => {
    e.preventDefault();
    if(this.state.npk.trim() == "") {
      alert('NPK TIDAK BOLEH KOSONG!')
    } else {
      this.setState({
        loading : true
      });
      fetch('http://103.106.174.171:8080/ecm/api/v2/user/check/'+this.state.npk, {
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        this.setState({ loading : false });
        if(json.Status == 200) {
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
    e.preventDefault();
    if(this.state.password.trim() == "") {
      alert('PASSWORD TIDAK BOLEH KOSONG!');
    } else if (this.state.confirm_password.trim() == "") {
      alert('CONFIRM PASSWORD TIDAK BOLEH KOSONG!');
    } else if(this.state.password !== this.state.confirm_password) {
      alert('PASSWORD DAN CONFIRM TIDAK SAMA!');
    } else {
      this.setState({ loading : true});
      let bulan = this.state.date.getMonth() + 1;
      let tanggal  = this.state.date.getFullYear() + '-' + bulan + '-' + this.state.date.getDate();
      fetch('http://103.106.174.171:8080/ecm/api/v2/user/registration', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body : JSON.stringify({
          Npk : this.state.npk,
          fullname : this.state.nama,
          email : this.state.email,
          password : this.state.password,
          birthday : tanggal
        })
      }).then(response => response.json())
      .then(json => {
        this.setState({ loading : false });
        if(json.Status == 201) {
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
                        (this.state.part == false) &&
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

                          <div className="text-center mt-6">
                            <button
                              onClick={this.submitCheck}
                              className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                              type="button"
                              style={{ transition: "all .15s ease" }}
                            >
                            {
                              (this.state.loading == true) &&
                              <div>Loading...</div>
                            }
                            {
                              (this.state.loading == false) &&
                              <div>Checking Npk</div>
                            }

                            </button>
                          </div>

                          <div className="text-center mt-6">
                            <Link to={'/'}>
                              <button
                                className="bg-ecm-dark text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                Back to Login
                              </button>
                            </Link>
                          </div>
                        </form>
                      }

                      {
                        (this.state.part == true) &&
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
                              name="npk" value={this.state.npk}
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
                              onChange={this.password}
                              name="npk" value={this.state.password}
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
                              onChange={this.confirm_password}
                              name="npk" value={this.state.confirm_password}
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
                                (this.state.loading == true) &&
                                <div>Loading...</div>
                              }
                              {
                                (this.state.loading == false) &&
                                <div>Sign Up</div>
                              }

                            </button>
                          </div>

                          <div className="text-center mt-6">
                            <Link to={'/'}>
                              <button
                                className="bg-ecm-dark text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                Back to Login
                              </button>
                            </Link>
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

export default Registrasi;
