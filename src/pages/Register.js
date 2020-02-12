import React, { Component } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBNavLink,
  MDBInput,
  MDBBtn
} from 'mdbreact';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      status_npk : false,
      npk_karyawan : "",
    }
  }

  componentDidMount(){
    // fetch('http://103.106.174.171:8080/ecm/api/v1/check/3618')
    // .then(response => response.json())
    // .then(json => console.log(json))
    //
    // const axios = require('axios');
    //
    // // Make a request for a user with a given ID
    // axios.get('http://103.106.174.171:8080/ecm/api/v1/check/3618')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  }

  checking = () => {
    fetch('http://103.106.174.171:8080/ecm/api/v2/user/check/'+this.state.npk_karyawan, {
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      }
    }).then(response => response.json())
    .then(json => {
        console.log(json);
    });
    // this.setState({
    //   status_npk : true
    // });
  }

  npk_karyawan = (e) => {
    this.setState({ npk_karyawan : e.target.value });
  }


  render() {
    return (
      <div>
        <MDBCol
          md='10'
          className='mx-auto float-none white z-depth-1 py-2 px-2'
        >
          <MDBCardBody className='text-center'>
            <h2 className='h2-responsive mb-4'>
              <strong className='font-weight-bold'>
                SIGN UP
              </strong>
            </h2>
            <MDBRow />
            <p>Welcome to ECM 2020</p>
            <p className='pb-4'>
              This application is used only for ECM 2020 events
            </p>
            <MDBRow className='d-flex flex-row justify-content-center row'>
              <MDBCol md='3'>
                {
                  (this.state.status_npk === false) &&
                  <MDBCardBody>
                    <div className='grey-text'>
                      <MDBInput
                        label='Your NPK'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                        onChange={this.npk_karyawan}
                      />
                    </div>
                    <div className='text-center'>
                      <MDBBtn onClick={this.checking} color='info'>
                        CHECK NPK &nbsp;
                        <MDBIcon icon='arrow-right' className='mr-1' />
                      </MDBBtn>
                      <MDBNavLink to='/'>
                        Have an account, sign in now
                      </MDBNavLink>
                    </div>
                  </MDBCardBody>
                }

                {
                  (this.state.status_npk  === true) &&
                  <MDBCardBody>
                    <div className='grey-text'>
                      <MDBInput
                        label='Your Full Name'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                      />
                      <MDBInput
                        label='Your Email'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                      />
                      <MDBInput
                        label='Your Password'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                      />
                      <MDBInput
                        label='Confirm Email'
                        group
                        type='text'
                        validate
                        error='wrong'
                        success='right'
                      />
                    </div>
                    <div className='text-center'>
                      <MDBBtn onClick={this.checking} color='warning'>JOIN NOW</MDBBtn>
                      <MDBNavLink to='/'>
                        Have an account, sign in now
                      </MDBNavLink>
                    </div>
                  </MDBCardBody>
                }
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCol>
      </div>
    )
  }
}

export default Register;
