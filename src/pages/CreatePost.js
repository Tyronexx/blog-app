import React, { useEffect, useState } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function CreatePost( isAuth ) {
  const [title, setTitle] = useState("");              //THIS IS THE STATE THATS WILL TRACK WHAT WE WRITE IN THE TITLE
  const [postText, setPostText] = useState("");        //THIS IS THE STATE THATS WILL TRACK WHAT WE WRITE IN THE POST


  const postCollectionRef = collection(db, "posts")    //THIS IS A REFERENCE TO OUR DATABASE COLLECTION ON FIREBASE

  let navigate = useNavigate();

  const createPost = async () => {            //THIS FUNCTION WILL SUBMIT THE DATA TO FIRESTORE WHEN WE CLICK ON IT
    await addDoc(postCollectionRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName , id: auth.currentUser.uid },    //THIS WILL GRAB USER NAME AND ID FROM GOOGLE DATABASE
    });
    navigate('/') 
  }


  useEffect(() => {       //THIS IS A QUICK FIX FOR THOS WHO WANT TO ACCESS THE LOGIN PAGE DIRECTLY. SO ITLL AUTOMATICALLY REDIRECT THEM
    if (!isAuth)  {
      navigate('/login') 

    }
  }, [])
  
  

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create A Post</h1>
        <div className='inputGp'>
          <label> Title: </label>
          <input
           placeholder='Title...' 
           onChange={(event) => {
            setTitle(event.target.value)
           }} 
          />
        </div>

        <div className='inputGp'>
          <label> Post: </label>
          <textarea placeholder='...' 
             onChange={(event) => {
            setPostText(event.target.value)
           }} 
          />

        </div>
        <button onClick={createPost}> Submit Post </button>
      </div>
    </div>
  )
}

export default CreatePost