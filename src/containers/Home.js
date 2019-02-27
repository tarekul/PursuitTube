import React, {Component} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import Feedbar from '../components/homecomponents/Feedbar'
import Feedlist from '../components/homecomponents/Feedlist'
import Header from '../components/homecomponents/Header'
import './Home.css'

class Home extends Component {
    constructor(props){
        super(props)    
        this.state = {
            name: "Mo",
            feed: [{
                feedName: 'lol',
                nextPageToken: '',
                videoInfo: [{
                    title: '',
                    photo: '',
                    id: 1,
                    channelName: '',
                    timePost: ''
                }]
            },
            {feedName: 'girl',
            nextPageToken: '',
            videoInfo: [{
                title: '',
                photo: '',
                id: ''
                }]
            },
            {feedName: 'boy',
            nextPageToken: '',
            videoInfo: [{
                title: '',
                photo: '',
                id: ''
                }]
            },
            {feedName: 'Messi',
            nextPageToken: '',
            videoInfo: [{
                title: '',
                photo: '',
                id: ''
                }]
            }
          ],
        }
    }

    feedLoad = (query, i) => {
        axios({
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
              part: 'snippet',
              maxResults: 8,
              videoDefinition: 'high',
              type: 'video',
              videoEmbeddable: 'true',
              key: 'AIzaSyDEsrVHQ4ZTg26TevQhP882rTDPFyCc4Jw', //'AIzaSyD1HDXH0JOccPKU7SYfh08ctspDqbUc4SI'
              q: query,
              pageToken: ''
            }
          })
        .then((data)=>{
            let copiedFeed = [...this.state.feed]
            copiedFeed[i].feedName = query
            copiedFeed[i].nextPageToken = data.data.nextPageToken
            copiedFeed[i].videoInfo = data.data.items.map((e)=>{
                return {title:e.snippet.title,photo:e.snippet.thumbnails.medium.url,id:e.id.videoId}
            })
            this.setState({feed: copiedFeed})
        })
        .then(()=>{
            // console.log(this.state.feed[i])
        })
        .catch(()=>{

        })
    }

    getVideoID = (e) =>{
      // this.props.history.push(`/video/${e.target.value}`)
      console.log(e.target.children)
    }

    componentDidMount(){
        this.state.feed.map((e, i)=>{
           return this.feedLoad(e.feedName, i)
        })
    }

    render() {
      return (
        <>
          <div className='row'>
            <div className='col-12 center'>
            <Header name={this.state.name}/>
            </div>
          </div>
          <div className='row'>
          <div className='col-4'>
          <Feedlist feed={this.state.feed}/>
          </div>
          <div className='col-8'>
          <Feedlist feed={this.state.feed}/>
          {this.state.feed.map((feed, i) => {
            return <Feedbar key={i} feed={feed} feedLoad={this.feedLoad} getVideoID={this.getVideoID}/>
          })}
          </div>
          </div>  
        </>
      );
    }
  }

export default withRouter(Home)