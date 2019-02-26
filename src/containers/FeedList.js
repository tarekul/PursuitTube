import React from 'react'
import CreateListTitle from '../components/feed-list_components/create-list-title';
import ExploreListFeed from '../components/feed-list_components/explore-list-title';
import AddFeed from '../components/feed-list_components/add-feed';

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
            </div>
        </div>
    </>
    )
}

export default FeedList;