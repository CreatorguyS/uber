import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Start from './pages/start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import { UserDataContext } from './context/UserContext'
import Home from './pages/home'
import UserProtectWrapper from './pages/userProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
const App = () => {

  return (
    <div >
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectWrapper>
           <Home />
          </UserProtectWrapper>
    
        } />
        <Route path='/captain-home' element={
<CaptainProtectWrapper>
  <CaptainHome />
</CaptainProtectWrapper>
        }
          
          />
        <Route path='/users/logout' element={
<UserProtectWrapper>
   <UserLogout />
</UserProtectWrapper>
        } />

        <Route path='/captain-home' element={<CaptainHome />} />
      </Routes>
    </div>
  )
}

export default App
