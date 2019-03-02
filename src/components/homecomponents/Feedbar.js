import React from 'react'
// import InfiniteScroll from 'react-infinite-scroller'

const Feedbar = (props) => {
    const { feedName, videoInfo } = props.feed
    return <>
    <div>
        {feedName}
        <div className='homeRow'>
        {videoInfo.map((e,i)=>{
            return <>
            <div className='homeCol-3' style={{'padding':'10px'}} key={i}>
                    <img style={{'width':'100px','height':'100px'}} src={`https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`} alt='' onClick={()=>props.goToVideoPage(e.id)}></img>
                    {e.title}
                    {e.channelName}
                    {e.timePosted}
            </div>
            </>
        })}
        </div>
        <div>
            <button onClick={()=>props.loadMoreVideos(props.value)}>load more videos</button>
        </div>
    </div>
    </>
}

export default Feedbar

{/* <InfiniteScroll
                pageStart={0}
                loadMore={props.pokeLoad}
                hasMore={true || false}
                loader={""}>
                {props.pokeState.pokeList.map((e, i) => {
                return (
                    <button className="col-12 textAlign buttonStyle curser" onClick={props.handlePokemonSelected} key={i}>
                        
                            <img className="leftFloat" src={`https://img.pokemondb.net/sprites/sun-moon/icon/${e.name}.png`} alt={''} onError={(e) => { e.target.onerror = null; e.target.src = shocked; e.target.style = 'justifyContent:center;height:30px;width:40px' }} />
                        
                        <span className="leftFloat textStyling leftPad">{_.capitalize(e.name)}</span>
                        <span className="rightFloat textStyling rightPad">#  {_.padStart(i + 1, 3, '0')}</span>
                    </button>
                )
            })}
            </InfiniteScroll> */}