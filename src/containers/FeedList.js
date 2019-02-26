import React from 'react'
import CreateListTitle from '../components/feed-list_components/create-list-title';
import ExploreListFeed from '../components/feed-list_components/explore-list-title';
import AddFeed from '../components/feed-list_components/add-feed';
import FeedEditor from '../components/feed-list_components/feed-editor';

const FeedList = ()=>{
    return(
        <>
        <div className='container'>
            <div className='row'>
                <CreateListTitle />
                <ExploreListFeed />
            </div>
            <div className='row'>
                <AddFeed />
                <FeedEditor />
            </div>
        </div>
    </>
    )
}

export default FeedList;