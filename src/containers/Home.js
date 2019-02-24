import React, {Component} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import Feedbar from '../components/homecomponents/Feedbar'
import Feedlist from '../components/homecomponents/Feedlist'
import Header from '../components/homecomponents/Header'

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
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
              part: 'snippet',
              maxResults: 8,
              videoDefinition: 'high',
              type: 'video',
              videoEmbeddable: 'true',
              key: 'AIzaSyD1HDXH0JOccPKU7SYfh08ctspDqbUc4SI',
              q: this.state.feed[0],
              pageToken: ''
            }
          })
        .then((data)=>{
            console.log(data.data.items)
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