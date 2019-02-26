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

    getData = (id = this.state.id) => {
        axios({
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/videos',
            params: {
                part: 'id,snippet,statistics',
                key: 'AIzaSyDeTfhlCohwwrwgaOm4Hso37sclFReUkoY',
                id: id
            }
        })
            .then((data) => {
                console.log('DATA', data);
                this.setState({ stats: data.data.items[0].statistics, snippet: data.data.items[0].snippet }, () => console.log(this.state))
            })
            .catch(err => {
                console.log(err);
            });
    }

    suggestionList = () => {
        if (!localStorage.getItem('suggestions')) return;
        console.log('HELLO', JSON.parse(localStorage.getItem('suggestions')));
        let vids = JSON.parse(localStorage.getItem('suggestions'));
        vids.vids = vids.vids.slice(0,9)
        return vids.vids.map((e, i) => {
            return (
                    <div className='suggestion' key={i} id={e.video_id} onClick={e=>{this.clickedSuggestion(e)}}>
                        <h6 id={e.video_id}>{e.title}</h6>
                        <img src={e.img} id={e.video_id}></img>
                    </div>
            )
        })
    }

    clickedSuggestion = (e) => {
        console.log('clicked a suggestion', e.target.id);
        this.props.history.push(`/video/${e.target.id}`)
    }

    componentDidMount(props) {
        this.getData()
    }

    componentWillReceiveProps(newProps) {
        console.log('OCCURERED', newProps)
      console.log(newProps.match.params.video_id)
      this.getData(newProps.match.params.video_id)
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className='col col-8'>
                        <iframe title='yt-video' type="text/html" width="711" height="400"
                            src={this.state.link} frameBorder="0"></iframe>
                            <h4>{this.state.snippet.title}</h4>
                        <div className='row'>
                            <div className='col col-2'><h5>{this.state.snippet.channelTitle}</h5></div>
                            <div className='col col-2'>Views: {this.state.stats.viewCount}</div>
                            <div className='col col-2'>Likes: {this.state.stats.likeCount}</div>
                            <div className='col col-2'>Dislikes: {this.state.stats.dislikeCount}</div>
                            {/* <div className='col col-2'>Comments: {this.state.stats.commentCount}</div> */}
                        </div>
                        <div className='row'>
                            <div className='col col-8'>{this.state.snippet.description}</div>
                        </div>
                    </div>

                    <div className='col col-2'>
                        <h4>Suggestions</h4>
                        <div className='suggestions'> 
                        {this.suggestionList()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Video);