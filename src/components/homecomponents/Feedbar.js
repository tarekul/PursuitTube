import React from 'react'

const Feedbar = (props) => {
    const { feedName, videoInfo } = props.feed
    return <>
    {
        (videoInfo.length < 1) ? 
        <>
        <div>
            {feedName}
            <div className='homeRow'>
                <div style={{"maxHeight":"400px", "overflow":"auto"}}>
                    <div className='homeRow'>
                        {[1,2,3,4,5,6,7,8].map((e,i)=>{
                             return (
                            <div className='homeCol-3'  key={i}> 
                                <div className='homeRow' >
                                        <div className='homeCol-12'>
                                            <img style={{'width':'100%','height':'calc(width*3/4)'}} src={"https://media.wired.com/photos/592722c1af95806129f51b71/master/pass/MIT-Web-Loading.jpg"} alt='' />
                                        </div>
                                        <div className='homeCol-12 videoName'>
                                                {'title'}
                                        </div>
                                        <div className='homeCol-12'>
                                                {'channel name'}
                                        </div>
                                        <div className='homeCol-12'>
                                            {'time posted'}
                                        </div>
                                    </div>
                                </div>
                             )})}
                         </div>
                    </div>
                </div>
            </div>
        </>
        :   <div>
                {feedName}
                <div className='homeRow'>
                    <div style={{"maxHeight":"400px", "overflow":"auto"}}>
                        <div className='homeRow'>
                            {videoInfo.map((e,i)=>{
                                 return (
                                <div className='homeCol-3'  key={i}> 
                                    <div className='homeRow' >
                                        <div className='homeCol-12'>
                                            <img style={{'width':'100%','height':'calc(width*3/4)'}} src={`https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`} alt='' onClick={()=>props.goToVideoPage(e.id)} />
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
                             )})}
                         </div>
                    </div>
                </div>
            </div>
    }
    <div>
        <button onClick={()=>props.loadMoreVideos(props.value)}>load more videos...</button>
    </div>
    </>
}

export default Feedbar