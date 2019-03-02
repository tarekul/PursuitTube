import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './video.css';
import Comments from './Comments';

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
                key: 'AIzaSyAxOwb4BvlFibcxm6BT_8aSbN9yxVzq67w',
                id: id
            }
        })
            .then((data) => {
                console.log('DATA', data);
                this.setState({
                    link: `https://www.youtube.com/embed/${id}?autoplay=1&fs=1&origin=http://localhost:3000`,
                    stats: data.data.items[0].statistics,
                    snippet: data.data.items[0].snippet
                },
                    () => console.log(this.state))
            })
            .catch(err => {
                console.log(err);
            });
    }

    suggestionList = () => {
        if (!localStorage.getItem('suggestions')) return;
        let vids = JSON.parse(localStorage.getItem('suggestions'));
        vids.vids = this.shuffleSuggestions(vids.vids);
        // vids.vids = vids.vids.slice(0, 20)
        return vids.vids.map((e, i) => {
            return (
                <div className='suggestion' key={i} id={e.video_id} onClick={e => { this.clickedSuggestion(e) }}>
                    <div className='row'>
                    <img className='vid_img' src={e.img} id={e.video_id}></img>
                    <div className='col col-5'><h6 className='vid_title' id={e.video_id}>{e.title}</h6></div>
                    </div>
                </div>
            )
        })
    }

    clickedSuggestion = (e) => {
        this.props.history.push(`/video/${e.target.id}`);
        window.scrollTo(0,0);
    }
    
    shuffleSuggestions = (array) => {
            let currentIndex = array.length
              , temporaryValue
              , randomIndex
              ;
        
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
        
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
        
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
        
            return array;
          }

    checkRecommendations() {
        if (!localStorage.getItem('suggestions')) {
            return (
                <div>No Recommendations. Search for more videos.</div>
            )
        }
        else {
            return(
                <div className='suggestions'>
                    {this.suggestionList()}
                </div>
            )
        }
    }


    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(newProps) {
        this.getData(newProps.match.params.video_id);
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className='col vid_container'>
                        <iframe title='yt-video' type="text/html" width="711" height="400"
                            src={this.state.link} frameBorder="0">
                        </iframe>
                        <h4>{this.state.snippet.title}</h4>
                        <div className='row vid_stats'>
                            <div className='col col-2'><h5>{this.state.snippet.channelTitle}</h5></div>
                            <div className='col col-2'>Views: {this.state.stats.viewCount}</div>
                            <div className='col col-2'>Likes: {this.state.stats.likeCount}</div>
                            <div className='col col-2'>Dislikes: {this.state.stats.dislikeCount}</div>
                            {/* <div className='col col-2'>Comments: {this.state.stats.commentCount}</div> */}
                        </div>
                        
                        <div className='row description'>
                            <div className='col'>{this.state.snippet.description}</div>
                        </div>
                        <br></br>
                        <Comments id={this.state.id}/>
                    </div>
                    <div className='col col-5 suggest_container'>
                        <h5 className='header_rec'>Recommended For You</h5>
                        {this.checkRecommendations()}
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Video);