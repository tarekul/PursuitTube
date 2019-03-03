import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Services from '../services/services'
import { withRouter } from 'react-router-dom'
import Feedbar from '../components/homecomponents/Feedbar'
import Feedlist from '../components/homecomponents/Feedlist'
import Header from '../components/homecomponents/Header'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      feed: []
    }
  }

  callToYoutubeAPI = (searchTerm='', pageToken='') => {
    return axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: 1,
        videoDefinition: 'high',
        type: 'video',
        videoEmbeddable: 'true',
        key: 'AIzaSyA4ubJgvyUX269rBhXMyQTL_MR0wWPfRbg',
        q: searchTerm,
        pageToken: pageToken
      }
    })
      .catch(() => console.log('there is a problem'))
  }

  componentDidMount() {
    const services = new Services()
    let activeUser = services.getActiveUser()
    if(!activeUser){
      activeUser = ''
    }
    let feed = services.getFeed(activeUser)
    if(!feed){
      feed = [{feedName:'',nextPageToken:'',videoInfo: []}]
    }
    feed = feed.map((e, i)=>{
      return {feedName: e, nextPageToken:'', videoInfo: []}
    })
    this.setState({name: activeUser, feed: feed})
    let initialAPICall = feed.map(e => {
      return this.callToYoutubeAPI(e.feedName, e.nextPageToken)
    })
    Promise.all(initialAPICall)
      .then(response => {
        const { feed } = this.state;
        const copiedFeed = [...feed]
        response.forEach((e, i) => {
          const { items, nextPageToken } = e.data
          copiedFeed[i].nextPageToken = nextPageToken
          copiedFeed[i].videoInfo = items.map(e => {
            const { id, snippet } = e
            const { channelTitle, publishedAt, title } = snippet
            return {
              channelName: channelTitle,
              id: id.videoId,
              timePosted: moment(publishedAt).fromNow(),
              title: title,
            }
          })
        })
        this.setState({ feed: copiedFeed, name: activeUser})
      })
      .catch(() => console.log('there is a problem'))
  }

  loadMoreVideos = (i) => {
    const { feed } = this.state;
    this.callToYoutubeAPI(feed[i].feedName, feed[i].nextPageToken)
      .then(response => {
        const { feed } = this.state;
        const copiedFeed = [...feed]
        const { items, nextPageToken } = response.data
        copiedFeed[i].nextPageToken = nextPageToken
        const newVideoInfo = items.map(e => {
          const { id, snippet } = e
          const { channelTitle, publishedAt, title } = snippet
          return {
            channelName: channelTitle,
            id: id.videoId,
            timePosted: moment(publishedAt).fromNow(),
            title: title,
          }
        })
        copiedFeed[i].videoInfo = copiedFeed[i].videoInfo.concat(newVideoInfo)
        this.setState({ feed: copiedFeed })
      })
      .catch(() => console.log('there is a problem'))
  }

  goToVideoPage = (e) => {
    this.props.history.push(`/video/${e}`)
  }

  render() {
    return (
      <>
        <div className='homeRow' style={{'justifyContent':'center'}}>
          <div className='homeCol-9'>
            <div className='homeRow'>
              <div className='homeCol-12 center'>
                <Header name={this.state.name} />
              </div>
            </div>
            <div className='homeRow'>
              <div className='homeCol-4'>
                <Feedlist feed={this.state.feed} />
              </div>
              <div className='homeCol-8'>
                {this.state.feed.map((feed, i) => {
                  return <Feedbar key={i} value={i} feed={feed} loadMoreVideos={this.loadMoreVideos} goToVideoPage={this.goToVideoPage} />
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Home)