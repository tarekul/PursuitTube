import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';


class Video extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 'LH4Y1ZUUx2g',
            link: `https://www.youtube.com/embed/LH4Y1ZUUx2g?autoplay=1&fs=1&origin=http://localhost:3000`,
            data: {}
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
                console.log('DAAAATATATAT',data);
                this.setState({ data: data.data.items[0].statistics }, () => console.log(this.state))
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
                    <iframe title='yt-video' type="text/html" width="640" height="360"
                        src={this.state.link} frameBorder="0"></iframe>
                </div>
                <div className='row'>
                    <div className='col'>Views: {this.state.data.viewCount}</div>
                    <div className='col'>Likes: {this.state.data.likeCount}</div>
                    <div className='col'>Dislikes: {this.state.data.dislikeCount}</div>
                    <div className='col'>Comments: {this.state.data.commentCount}</div>
                </div>
            </>
        );
    }
}

export default withRouter(Video);