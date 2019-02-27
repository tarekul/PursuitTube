import React from 'react'

const Feedbar = (props) => {
    console.log(props.feed.feedName)
    console.log(props.feed.videoInfo)
    return <>
        <div>{props.feed.feedName}</div>
        <div>{props.feed.videoInfo.map((e, i)=>{
            if(!e.photo){
                e.photo = 'https://i.imgur.com/CHUwxte.jpg'
                e.title = 'Video is loading...'
                e.channelName = 'Channel is loading...'
                e.timePost = `${new Date ()}`
            }
            return <>
            <div value={e.id} onClick={props.getVideoID} style={{'border':'solid 1px black'}}>
                {<img src={e.photo} key={i} style={{'width':'170px','height':'95px'}}></img>}
                <span>{e.title}</span>
                <span>{e.channelName}</span>
                <span>{e.timePost}</span> 
            </div>
            </>
        })}</div>
    </>
}

export default Feedbar