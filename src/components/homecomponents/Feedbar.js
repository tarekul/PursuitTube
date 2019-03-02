import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

const Feedbar = (props) => {
    const { feedName, videoInfo } = props.feed
    return <>
    <div>
        {feedName}
        <div className='homeRow'>
        <div style={{"height":"400px", "overflow":"auto"}}>
    <InfiniteScroll
        pageStart={1}
        loadMore={()=>props.loadMoreVideos(props.value)}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
        threshold={700}
        style={{'border':'solid 1px black'}}
    >
    <div className='homeRow'>
        {videoInfo.map((e,i)=>{
            return (
            <div className='homeCol-3'  key={i}> 
                <div className='homeRow' >
                    <div className='homeCol-12'>
                        <img style={{'width':'100%','height':'calc(width*3/4)'}} src={`https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`} alt='' onClick={()=>props.goToVideoPage(e.id)}></img>
                    </div>
                    <div className='homeCol-12 videoName'>
                        {e.title}
                    </div>
                    <div className='homeCol-12'>
                        {e.channelName}
                    </div>
                    <div className='homeCol-12'>
                        {e.timePosted}
                    </div>
                </div>
            </div>
            )
        })}
        </div>
    </InfiniteScroll>
</div>
        </div>
    </div>
   
    </>
}

export default Feedbar