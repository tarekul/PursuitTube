import React from 'react'

const Feedlist = (props) => {
    return <>
        <div className='homeRow' style={{'justifyContent':'center'}}>
            <div className='homeCol-12'>
            <div className='homeCol-12' style={{'backgroundColor':'lightgrey','color':'darkblue','marginBottom':'2px', 'paddingLeft':'5px'}}>
                <span>Feed List</span>
            </div>
            </div>
            <div className='homeRow' style={{'backgroundColor':'#f8f9fa', 'color':'darkblue', 'paddingLeft':'5px'}}>
            {props.feed.map((e , i)=>{
                    return (
                    <div className='homeCol-12' key={i}>
                         {e.feedName}
                     </div>
                    )
             })}
            </div>
            </div>
    </>
}

export default Feedlist