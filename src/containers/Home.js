import React, {Component} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import Feedbar from '../components/Feedbar'
import Feedlist from '../components/Feedlist'
import Header from '../components/Header'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: "Mo",
            feed:["Lol","Girl","Boy"]
        }
    }

    feedLoad = () => {
        axios({
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/videos',
            params: {
              part: 'id,snippet,statistics',
              key: 'AIzaSyD1HDXH0JOccPKU7SYfh08ctspDqbUc4SI',
              id: this.state.feed[0],
            }
          })
        .then(()=>{

        })
        .catch(()=>{

        })
    }
    
    componentDidMount(){
        this.feedLoad()
    }

    render() {
      return (
        <>
          <Header name={this.state.name}/>
          <Feedlist feed={this.state.feed}/>
          <Feedbar />
        </>
      );
    }
  }

export default withRouter(Home)