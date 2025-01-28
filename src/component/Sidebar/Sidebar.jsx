import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { formatDate } from '../../utils/dateUtils';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { 
    startNewSession, 
    loadSession, 
    userSessions, 
    user, 
    deleteSessionAndRefresh,
    sessionId: currentSessionId
  } = useContext(Context);

  const handleNewChat = () => {
    startNewSession();
  };

  const handleLoadSession = (sessionId) => {
    loadSession(sessionId);
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation();
    try {
      await deleteSessionAndRefresh(sessionId);
      // Si la session supprimée est la session courante, créer une nouvelle session
      if (sessionId === currentSessionId) {
        await startNewSession();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  if (!user) return null;

  return (
    <div className='sidebar'>
      <div className="top">
        <img
          className='menu'
          onClick={() => setExtended(prev => !prev)}
          src={assets.menu_icon}
          alt="Menu"
        />

        <div className="new-chat" onClick={handleNewChat}>
          <img src={assets.plus_icon} alt="Nouveau chat" />
          {extended && <p>Nouveau chat</p>}
        </div>

        {extended && (
          <>
            <p className="recent-title">Sessions récentes</p>
            {userSessions.map((session) => (
              <div key={session.id} className="recent-entry-container">
                <div className="recent-entry" onClick={() => handleLoadSession(session.id)}>
                  <img src={assets.history_icon} alt="Session" />
                  <div className="session-details">
                    <p>{formatDate(session.createdAt.toDate())}</p>
                    {session.score && <span>Score: {session.score}</span>}
                  </div>
                  <div className="session-menu-icon">
                    <div onClick={(e) => handleDeleteSession(e, session.id)}>
                      <img src={assets.Trash} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;