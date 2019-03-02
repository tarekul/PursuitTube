import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './comments.css';
import moment from 'moment';

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.video_id,
            key: 'AIzaSyDeTfhlCohwwrwgaOm4Hso37sclFReUkoY',
            comments: []
        }

    }

    getComments = (id = this.state.id) => {
        axios({
            method: 'get',
            url: `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2C+replies&maxResults=50&videoId=${id}&key=${this.state.key}`,
        })
            .then((data) => {
                let comments = data.data.items
                this.setState({ id: id, comments: comments }, () => console.log(comments));
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getComments();
    }

    componentWillReceiveProps(newProps) {
        this.getComments(newProps.match.params.video_id);
        console.log('props coming');
    }

    render() {
        return (
            <>
            <h6>Comments</h6>
            {
                this.state.comments.length === 0 
                ? 
                <div>No Comments</div>
                :
                this.state.comments.map((e, i) => {
                    return (
                    <>
                    <div className='row comment' key={i}>
                        {console.log(this.state.comments[i].replies)}
                        <div className='col col-1 display_img'><img src={this.state.comments[i].snippet.topLevelComment.snippet.authorProfileImageUrl} ></img></div>
                        <div className='col'>
                            <div className='row'>
                                <span className='display_name'>{this.state.comments[i].snippet.topLevelComment.snippet.authorDisplayName}</span>
                                <span className='publish_date'>{moment(this.state.comments[i].snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                            </div>
                        <div className='row'><span>{this.state.comments[i].snippet.topLevelComment.snippet.textOriginal}</span></div>
                        <div className='col'>
                        <div className='row replies' key={i}>
                            <div>
                                {
                                    this.state.comments[i].replies === undefined 
                                    ?
                                    <div></div>
                                    :
                                    this.state.comments[i].replies.comments.map((e, j) => {
                                        return ( 
                                            <div className='reply row'>
                                                <div className='col col-sm-2 reply_img'><img src={this.state.comments[i].replies.comments[j].snippet.authorProfileImageUrl}></img></div>
                                                <div className='col col'>
                                                        <div className='row reply_name'>{this.state.comments[i].replies.comments[j].snippet.authorDisplayName}</div>
                                                        <div className='row reply_comment'>{this.state.comments[i].replies.comments[j].snippet.textOriginal}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                   
                    </>
                    )
                })
            }
            </>
        )
    }
}




export default withRouter(Comments);