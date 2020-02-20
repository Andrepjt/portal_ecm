import React, {Component} from "react";

import Sidebar from "components/Sidebar.js";
import LineChart from "components/LineChart.js";
import BarChart from "components/BarChart.js";


class Dashboard extends Component{
  constructor() {
    super();
    this.state = {
      token : "",
      person : "",
      status : "",
      news : []
    }
  }

  componentDidMount() {
    this.getDataStatus();
  }

  getDataStatus () {
    let data = localStorage.getItem("auth");
    let basic = JSON.parse(data);
    this.setState({ token : basic });
    this.getHome(basic);
    this.getNews(basic);

  }

  getHome(token) {
    fetch('http://103.106.174.171:8080/ecm/api/v2/user/profile', {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : "Bearer " + token
      }
    }).then(response => response.json())
    .then(json => {
      if(json.Status == 200) {
        this.setState({
          person : json.Data
        });
        this.getStatus(this.state.person[0].npk, this.state.token);
      } else {
        alert('Expired user');
      }
    });
  }

  getNews(token) {
    fetch('http://103.106.174.171:8080/ecm/api/v2/news', {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : "Bearer " + token
      }
    }).then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        news : json.Data
      });
    })
  }

  getStatus(npk, token) {
    fetch('http://103.106.174.171:8080/ecm/api/v2/user/attendance/statusnpk/'+ npk, {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : "Bearer "+token
      }
    }).then(response => response.json())
    .then(json => {
      if(json.Status == 200) {
        this.setState({
          status : true
        });
      } else {
        this.setState({
          status : false
        });
      }
    })
  }

  submit = (e) =>{
    e.preventDefault();
    fetch('http://103.106.174.171:8080/ecm/api/v2/user/attendance/checkin', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : this.state.token
      },
      body : JSON.stringify({
        npk : this.state.person[0].npk,
        consumption : "1"
      })
    }).then(response => response.json())
    .then(json => {
      if(json.Status == 201) {
        window.location.reload();
      } else {
        alert('Sorry, Failed send attendance!');
      }
    }).catch(e => {
      alert('Sorry, Failed send attendance!');
    })

  }

  render() {
    let i = 1;
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-gray-800">
          {/* Header */}
          <div className="relative bg-ecm-light md:pt-1 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
              <div>
                {/* Card stats */}
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12 xl:w-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                      <div className="flex-auto p-4">

                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-gray-500 uppercase font-bold text-xs">
                              STATUS ATTENDANCE
                            </h5>
                            <span className="font-semibold text-xl text-gray-800">
                              Your status for ECM
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            {
                              (this.state.status == false) &&
                              <button
                                onClick={this.submit}
                                className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                PRESS ON
                              </button>
                            }
                            {
                              (this.state.status == true) &&
                              <button
                                onClick={this.submit}
                                className="bg-ecm-light text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                ALREADY ON
                              </button>

                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-900" style={{opacity:0.9}}>
                  <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                          EVENT
                        </h6>
                        <h2 className="text-white text-xl font-semibold">
                          Lokasi Pintu Masuk
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-auto">
                    {/* Chart */}
                    <table style={{borderWidth: 1}}>
                      <thead>
                        <tr>
                          <th className="text-white" style={{borderWidth: 1, padding: 10}}>ZONA</th>
                          <th className="text-white" style={{borderWidth: 1, padding: 10}}>LOKASI KERJA</th>
                          <th className="text-white" style={{borderWidth: 1, padding: 10}}>PINTU MASUK</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>A1</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>KEM</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance V</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>A2</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>KEM</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance V</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>A3</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>KRAMAT</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance I</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>A4</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>KRAMAT</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance I</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>B1</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>TELKOMSEL</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance S</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>B2</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>ASMO3, ASTRA HONDA MOTOR, TRAC, ATDMS & HSO</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance S</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>B3</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>ASTRA INTERNATIONAL</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance P</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>B4</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>ASTRA OTOPARTS, UNITED TRACTORS, WAREHOUSE, FIF, BSD</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Entrance P</td>
                        </tr>
                        <tr>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>C</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>AWARD NOMINEE</td>
                          <td className="text-white" style={{borderWidth: 1, padding: 10}}>Sesuai Lokasi Kerja</td>
                        </tr>
                      </tbody>

                    </table>
                    <br></br>
                  </div>
                </div>
              </div>

                <div className="w-full xl:w-4/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded" style={{opacity:0.9}}>
                    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                          <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                            Event
                          </h6>
                          <h2 className="text-gray-800 text-xl font-semibold">
                            Activity ECM
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-auto">
                      {
                        (this.state.news.length == 0 ) &&
                        <div>
                          Data belum diload
                        </div>
                      }
                      {
                        (this.state.news.length > 0 ) &&
                        <div>
                          {
                            this.state.news.map(list => (
                              <ul>
                                <li>{i++}. {list.title}</li>
                              </ul>
                            ))
                          }
                        </div>
                      }

                    </div>
                  </div>
                </div>

            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <br/>
            <footer className="block py-4">
              <div className="container mx-auto px-4">
                <hr className="mb-4 border-b-1 border-gray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-4/12 px-4">
                    <div className="text-sm text-gray-600 font-semibold py-1">
                      Copyright © {new Date().getFullYear()}{" "}
                      <a
                        href="https://www.creative-tim.com"
                        className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                      >
                        Creative Tim
                      </a>
                    </div>
                  </div>
                  <div className="w-full md:w-8/12 px-4">
                    <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                      <li>
                        <a
                          href="https://www.creative-tim.com"
                          className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                        >
                          Creative Tim
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.creative-tim.com/presentation"
                          className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://blog.creative-tim.com"
                          className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/creativetimofficial/tailwind-starter-kit/blob/master/LICENSE.md"
                          className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                        >
                          MIT License
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
