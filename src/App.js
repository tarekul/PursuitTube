import React, { Component } from 'react';

import Navbar from './components/Navbar'
import Home from './containers/Home'
import Video from './containers/Video'
import Search from './containers/Search'
import Userlist from './containers/UserList'
import FeedList from './containers/FeedList'

import { Route } from 'react-router-dom'


class App extends Component {

  render() {
    return (
      <>
        <Navbar/>
        <Route path='/' exact component={Home}/>
        <Route path='/video' exact component={Video}/>
        <Route path='/search' exact component={Search}/>
        <Route path='/userlist' exact component={Userlist}/>
        <Route path='/feedlist' exact component={FeedList}/>
      </>
    );
  }
}

export default App;
