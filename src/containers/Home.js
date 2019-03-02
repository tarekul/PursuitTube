import React, { Component } from 'react'
import axios from 'axios'
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
      name: 'Mo',
      feed: [{
        feedName: 'ESPN First Take',
        nextPageToken: '',
        videoInfo: []
      },
      {
        feedName: 'Drake',
        nextPageToken: '',
        videoInfo: []
      }]
    }
  }

  callToYoutubeAPI = (searchTerm='', pageToken='') => {
    return axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        maxResults: 8,
        videoDefinition: 'high',
        type: 'video',
        videoEmbeddable: 'true',
        key: 'AIzaSyDzrhVSoNSorn64sSP1kp34zkCG9T2GitU',
        q: searchTerm,
        pageToken: pageToken
      }
    })
      .catch((err) => console.log(err))
  }

  componentDidMount() {
    const {feed} = this.state
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
              timePosted: publishedAt,
              title: title,
            }
          })
        })
        this.setState({ feed: copiedFeed})
      })
      .catch(err => console.log(err))
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
            timePosted: publishedAt,
            title: title,
          }
        })
        copiedFeed[i].videoInfo = copiedFeed[i].videoInfo.concat(newVideoInfo)
        console.log(copiedFeed)
        this.setState({ feed: copiedFeed })
      })
      .catch(err => console.log(err))
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