import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extended,Setextended] = useState(false)
    const {onSent, prevPrompt, setRecentPrompt} = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">

            <img className='menu' onClick={()=>Setextended(prev=>!prev)}  src={assets.menu_icon}  alt="" />
            
            <div className="new-chat">
                <img src={assets.plus_icon}  alt="" />
            {extended?<p>Nouveau chat</p>:null}
            </div>

            <p className="recent-title">Recent</p>

            {extended?
            
            <div className='recent'>
                
                {prevPrompt.map((item,index)=>{
                    return(
                        <div onClick={()=>loadPrompt(item)} className="recent-entry">
                            <img src={assets.message_icon}  alt="" />
                            <p>{item.slice(0,8)}...</p>      
                        </div>
                    )
                })}
                
            </div>
            
            :null} 
            

        </div>
        
        <div className="bottom">

            <div className="bottom-item-recent-item">
                <img src={assets.history_icon} id="icon" alt="" />
                {extended?<p>Historique</p>:null}
            </div>

            <div className="bottom-item-recent-item">
                <img src={assets.question_icon} id="icon" alt="" />
                {extended?<p>Aide</p>:null}
            </div>



            <div className="bottom-item-recent-item">
                <img src={assets.settings_icon} id="icon" alt="" />
                {extended?<p>Parametre</p>:null}
            </div>

        </div>
    </div>
  )
}

export default Sidebar