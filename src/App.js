import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { ReactComponent as Logo } from './assets/logo.png';
import Routes from './Routes';

class App extends Component {
  state = {
    collapseID: ''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  closeCollapse = collID => () => {
    const { collapseID } = this.state;
    window.scrollTo(0, 0);
    collapseID === collID && this.setState({ collapseID: '' });
  };

  render() {
    return (
      <Router>
        <div className='flyout'>
          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
