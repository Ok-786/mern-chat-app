import React, { useEffect } from 'react'
import { Route, Navigate, Routes as Switch, BrowserRouter } from 'react-router-dom'
// import ChatPage from './Pages/HomePage'
import HomePage from './pages/AuthenticationPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { isSignin } from './Store/Actions/user';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';


const Routes = () => {
  const login = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isSignin());
  }, [dispatch])

  return (
    <div className='container'>
      <ToastContainer />

      <BrowserRouter className="container">
        <Switch className="container">
          {
            login ?
              <>
                <Route path='/setAvatar' element={<SetAvatar />} exact />
                <Route path='/chats' element={<Chat />} exact />
                <Route path="/" element={<Navigate to="/setAvatar" />} />
              </>
              :
              <>
                <Route path='/' element={<HomePage />} exact />
                <Route path="/chats" element={<Navigate to="/" />} />
              </>

          }
        </Switch>
      </BrowserRouter>

    </div>
  )
}

export default Routes