import React from 'react'

const Feedbar = (props) => {
    const { feedName, videoInfo } = props.feed
    return <>
    {
        (videoInfo.length < 1) ? 
        <>
        <div>
            <div style={{'color':'darkblue','marginTop':'10px','marginBottom':'10px'}}>
            {feedName}
            </div>
            <div className='homeRow'>
                <div style={{"maxHeight":"400px", "overflow":"auto"}}>
                    <div className='homeRow'>
                        {[1,2,3,4,5,6,7,8].map((e,i)=>{
                             return (
                            <div className='homeCol-3'  key={i}> 
                                <div className='homeRow' style={{'paddingLeft':'5px', 'paddingTop':'5px' ,'paddingRight':'5px'}}>
                                        <div className='homeCol-12'>
                                            <img className='video' style={{'width':'100%','height':'calc(width*3/4)',}} src={"https://media.wired.com/photos/592722c1af95806129f51b71/master/pass/MIT-Web-Loading.jpg"} alt='' />
                                        </div>
                                        <div className='homeCol-12 videoName'style={{'color':'darkblue',}}>
                                                {'title'}
                                        </div>
                                        <div className='homeCol-12' style={{'color':'darkblue',}}>
                                                {'channel name'}
                                        </div>
                                        <div className='homeCol-12' style={{'color':'darkblue',}}>
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
                                    <div className='homeRow' style={{'paddingLeft':'5px', 'paddingTop':'5px' ,'paddingRight':'5px'}}>
                                        <div className='homeCol-12'>
                                            <img className='video' style={{'width':'100%','height':'calc(width*3/4)'}} src={`https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`} alt='' onClick={()=>props.goToVideoPage(e.id)} />
                                        </div>
                                        <div className='homeCol-12 videoName' style={{'color':'darkblue',}}>
                                                {e.title}
                                        </div>
                                        <div className='homeCol-12' style={{'color':'darkblue',}}>
                                                {e.channelName}
                                        </div>
                                        <div className='homeCol-12' style={{'color':'darkblue',}}>
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
        <button className='buttonHover' style={{'marginTop':'5px'}}  onClick={()=>props.loadMoreVideos(props.value)}>load more videos...</button>
    </div>
    </>
}

export default Feedbar