import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
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
        key: 'AIzaSyDeTfhlCohwwrwgaOm4Hso37sclFReUkoY', //'AIzaSyDEsrVHQ4ZTg26TevQhP882rTDPFyCc4Jw', // 'AIzaSyD1HDXH0JOccPKU7SYfh08ctspDqbUc4SI'
        q: searchTerm,
        pageToken: pageToken
      }
    })
      .catch((err) => console.log(err))
  }

    feedLoad = (query, i) => {
        axios({
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
              part: 'snippet',
              maxResults: 10,
              videoDefinition: 'high',
              type: 'video',
              videoEmbeddable: 'true',
              key: 'AIzaSyD1HDXH0JOccPKU7SYfh08ctspDqbUc4SI',
              q: query,
              pageToken: ''
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