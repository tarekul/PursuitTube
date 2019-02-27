import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

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
            url: `https://www.googleapis.com/youtube/v3/commentThreads?key=${this.state.key}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=10`,
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
        this.getComments()
    }

    componentWillReceiveProps(newProps) {
        this.getComments(newProps.match.params.video_id);
    }

    render() {
        return (
            <>
            {this.state.id}
            </>
        )
    }
}




export default withRouter(Comments);