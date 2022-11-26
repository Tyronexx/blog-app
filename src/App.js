import React, { useState } from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import {signOut} from "firebase/auth";
import {auth} from "./firebase"



function App () {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));         //THIS IS TO CHECK IF A USER HAS BEEN AUTHENTICATED OR NOT


  const signUserOut = () => {            //THESE SERIES OF EVENTS HAPPEN WHEN WE SIGN OUT
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false);
      window.location.pathname = "/login"
    })
  }

  return (
    <Router>
      <nav>
        <h2><Link to="/">KENNA BLOG</Link></h2>

        <Link to="/" >Home</Link>
        
        {!isAuth ? (
          <Link to="/login" >Login</Link>
        ) : ( 
          <>
            <Link to="/createpost" >Create Post</Link>             {/*WE ONLY SEE CREATE POST ROUTE WHEN WE'RE LOGGED IN*/}
            <button onClick={signUserOut} >Log Out</button>        {/*WE DO THIS SO THAT WHEN WE'RE SIGNED IN WE DONT SEE THE LOGIN BUTTON BUT THE LOGOUT BUTTON*/}
          </>
        )}
      </nav>
      

      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} /> }   />
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />}  />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />}  />
      </Routes>
    </Router>
  )
}

export default App