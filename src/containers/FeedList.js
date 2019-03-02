// Dependencies
import React, {Component} from 'react'
import CreateListTitle from '../components/feed-list_components/create-list-title';
import ExploreListFeed from '../components/feed-list_components/explore-list-title';
import AddFeed from '../components/feed-list_components/add-feed';
import FeedEditor from '../components/feed-list_components/feed-editor';

// React Component
class FeedList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feeds: [],
        }
    }
    //see if it works

    updateUserFeed = (feedName) => {
        const newFeedArr = []
        newFeedArr.push(feedName)
        this.setState({
            feeds: newFeedArr,
        })
    }

    render() {
        return(
            <>
                <div className='container'>
                    <div className='row'>
                        <CreateListTitle />
                        <ExploreListFeed />
                    </div>
                    <div className='row'>
                        <AddFeed updateUserFeed={this.updateUserFeed}/>
                        <FeedEditor />
                    </div>
                </div>
            </>
        )
    }   
}

export default FeedList;