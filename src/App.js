import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <>
        <Route path='/' exact render={()=><Link to='/pong'>pong</Link>} />
        <Route path='/pong' exact render={()=><Link to='/'>ping</Link>} />
      </>
    );
  }
}

export default App;
