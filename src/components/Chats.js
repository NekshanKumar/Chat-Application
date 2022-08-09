import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase';

import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const Chats = () => {

  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)

  const getFile = async () => {
    const response = await fetch(URL);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg",{type: 'image/jpeg' })
  }

  useEffect(() => {
    if(!user) {
      history.push('/');

      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
      "project-id": "c95476e2-599d-41ce-ab48-73ff71598ab4",
      "user-name": user.email,
      "user-secret": user.uid,
      }
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      let formdata = new FormData();
      formdata.append('email', user.email);
      formdata.append('username', user.email);
      formdata.append('secret', user.uid);

      getFile(user.photoURL)
      .then((avatar) => {
        formdata.append('avatar', avatar, avatar.name)

        axios.post('https://api.chatengine.io/users', 
        formdata,
        {header: { "private-key": "7c403271-ab82-452e-99ea-2b842c3fa171"}})
        .then(() => setLoading(false))
        .catch((error) => console.log(error))
      })
    })
  }, [user, history]);

  if(!user || loading) return 'Loading.......'

  const handleLogout = async () => {
    await auth.signOut();

    history.push('/');
  }
  return (
    <div className='chats-page'>
    <div className="nav-bar">
      <div className="logo-tab">
        Unichat
      </div>
      <div onClick={handleLogout} className="logout-tab">
        Logout
      </div>
    </div>
      
      <ChatEngine
            height="calc(100vh - 6px)"
            projectID="d23ea090-f74f-4255-ac38-f2d4cf3a6cfc"
            userName="user.email"
            userState="user.uid"
            />
    </div>
  )
}

export default Chats
