import React from 'react'

const Home = (props)=>{
    const clickHandler = () => {
        props.changeState({video: 'syed'})
    }
    
    return (
    <>
    <h1>Home</h1>
    <input type='text' onClick={clickHandler}></input>
    </>
    )
}

export default Home