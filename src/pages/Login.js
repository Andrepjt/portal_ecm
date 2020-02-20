import React, { Component } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBNavLink,
  MDBInput,
  MDBBtn
} from 'mdbreact';

class Login extends Component {
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
                SIGN IN
              </strong>
            </h2>
            <MDBRow />
            <p>Welcome to ECM 2020</p>
            <p className='pb-4'>
              This application is used only for ECM 2020 events
            </p>
            <MDBRow className='d-flex flex-row justify-content-center row'>
              <MDBCol md='4'>
                <MDBCardBody>
                  <div className='grey-text'>
                    <MDBInput
                      label='Your NPK'
                      group
                      type='text'
                      validate
                      error='wrong'
                      success='right'
                    />
                    <MDBInput label='Your password' group type='password' validate />
                  </div>
                  <div className='text-center'>
                    <MDBBtn color='primary'>SIGN IN</MDBBtn>
                    <br/>
                    <MDBNavLink to='/register'>
                      Don't have an account for ECM 2020? SIGN UP
                    </MDBNavLink>


                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCol>
      </div>
    )
  }
}

export default Login;
