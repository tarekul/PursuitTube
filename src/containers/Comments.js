import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
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
                this.setState({ id: id, comments: comments }, () => console.log(data.data.items[0].snippet));
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getComments()
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.getComments(newProps.id);
    }

    render() {
        return (
            <>
            {this.state.id}
            </>
        )
    }
}




export default Comments;