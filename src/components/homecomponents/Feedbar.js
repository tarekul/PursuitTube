import React from 'react'

const Feedbar = (props) => {
    console.log(props.feed.feedName)
    console.log(props.feed.videoInfo)
    return <>
        <div>{props.feed.feedName}</div>
        <div>{props.feed.videoInfo.map((e, i)=>{
            return <img src={e.photo} key={i}></img>
        })}</div>
    </>
}

export default Feedbar