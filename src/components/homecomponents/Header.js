import React from 'react'

const Header = (props) => {
    let nameRender = `${props.name}'s Home Page`
    if(!props.name) nameRender = ''
    return <>
    <div className='homeRow headerStyle' style={{'justifyContent':'center', 'alignItems':'center', 'marginTop':'10px', 'marginBottom':'10px'}}>
        <div className='homeCol-9'>
            {nameRender}
        </div>
    </div>
    </>
}

export default Header