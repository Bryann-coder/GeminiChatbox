import React from 'react'
import Main from '../Main/Main'
import Sidebar from '../Sidebar/Sidebar'
import ScorecontextProvider from '../ScoreContext/ScorecontextProvider'

const Chat = () => {
  return (
    <>
    <ScorecontextProvider>

        {/* <Sidebar/> */}


        <Main/>

    </ScorecontextProvider>
    </>
  )
}

export default Chat