import React from 'react'

const Home = (props)=>{
    const clickHandler = () => {
        props.changeState({video: 'syed'})
    }
    return (
    <>
    <h1>Home</h1>
    </>
    )
}

export default Home