import React, { Component } from 'react';

import Navbar from './components/Navbar'
import Home from './containers/Home'
import Video from './containers/Video'
import Search from './containers/Search'
import Userlist from './containers/UserList'
import FeedList from './containers/FeedList'

import { Route } from 'react-router-dom'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video:'',
      search:'',
      users:[{name:'syed',
              feed:[]
            }]
    }

  }
  //use this function to update the class
  //param is object that has property to update and value
  changeState = (obj) => {
    this.setState(obj, () => {
      console.log(this.state)
    });
  }

  
  render() {
    return (
      <>
        <Navbar/>
        <Route path='/' exact render={()=><Home changeState = {this.changeState}/> } />
        <Route path='/video' exact render={()=><Video/>} />
        <Route path='/search' exact render={()=><Search/>} />
        <Route path='/userlist' exact render={()=><Userlist/>} />
        <Route path='/feedlist' exact render={()=><FeedList/>} />
      </>
    );
  }
}

export default App;
