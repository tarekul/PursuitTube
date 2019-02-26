import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';


class Video extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.video_id,
            link: `https://www.youtube.com/embed/${props.match.params.video_id}?autoplay=1&fs=1&origin=http://localhost:3000`,
            stats: {},
            snippet: {}
        }
    }

    getData = () => {
        axios({
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/videos',
            params: {
                part: 'id,snippet,statistics',
                key: 'AIzaSyDeTfhlCohwwrwgaOm4Hso37sclFReUkoY',
                id: this.state.id,
            }
        })
            .then((data) => {
                console.log('DATA',data);
                this.setState({ stats: data.data.items[0].statistics, snippet: data.data.items[0].snippet}, () => console.log(this.state))
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount(props) {
        this.getData()
    }

    render() {
        return (
            <>  
                <div className='row'>
                <div className='col'><h1>{this.state.snippet.title}</h1></div>
                </div>
                <div className='row'>
                    <iframe title='yt-video' type="text/html" width="640" height="360"
                        src={this.state.link} frameBorder="0"></iframe>
                </div>
                <div className='row'>
                    <div className='col'><h4>{this.state.snippet.channelTitle}</h4></div>
                    <div className='col'>Views: {this.state.stats.viewCount}</div>
                    <div className='col'>Likes: {this.state.stats.likeCount}</div>
                    <div className='col'>Dislikes: {this.state.stats.dislikeCount}</div>
                    <div className='col'>Comments: {this.state.stats.commentCount}</div>
                </div>
                <div className='row'>
                    <div className='col'>{this.state.snippet.description}</div>
                </div>
            </>
        );
    }
}

export default withRouter(Video);