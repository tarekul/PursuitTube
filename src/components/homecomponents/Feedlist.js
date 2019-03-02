import React from 'react'

const Feedlist = (props) => {
    return <>
        <div className='homeRow' style={{'justifyContent':'center'}}>
        <div className='homeCol-12'>
        <span>Feed List</span>
        </div>
            {props.feed.map((e , i)=>{
                return (
                    <div className='homeCol-12' key={i}>
                        {e.feedName}
                    </div>
                )
            })}
        </div>
    </>
}

export default Feedlist