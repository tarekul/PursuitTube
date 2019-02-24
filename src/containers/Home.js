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
            feed: [{feedName:"Lol",
                    nextPageToken: '',
                    feedArray:[]}],
        }
    }

    feedLoad = (query) => {
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
              q: query,
              pageToken: ''
            }
          })
        .then((data)=>{
            let arr = data.data.items
         
            arr.map((e, i)=>{
                this.setState({nextPageToken: data.data.nextPageToken})
            })
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