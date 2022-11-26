import React, { useEffect, useState } from 'react';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import {auth, db} from '../firebase';

function Home({ isAuth }) {
  const [postLists, setpostLists] = useState([]);    //THIS IS A STATE THAT WILL CONTAIN THE LIST OF POSTS THAT EXIST IN OUR DATABASE
  const postCollectionRef = collection(db, "posts")


  //THIS WILL POPULATE THE ABOVE STATE WITH DATA FROM OUT DATABASE
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      //console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      setpostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    };


    getPosts();              //THIS IS TO CALL THE ABOVE FUNCTION
  });

  const deletePost = async (id) => {               //THIS FUNCTION IS TO DELETE POSTS
    const postDoc = doc(db, "posts", id);

    await deleteDoc(postDoc)
  };

  return (
    
    <div className='homePage'>
      {isAuth ? null : <p className='logtxt' >LOGIN TO CREATE POST</p>}               {/*This will only display whe we are logged out*/}
      {postLists.map((post) => {
        return (
        <div className='post'> 
          <div className='postHeader'>
            <div className='title'> <h1> {post.title} </h1></div>

            <div className='deletePost'>
              {isAuth && post.author.id === auth.currentUser.uid && (        /*THIS CONDITION IS USED TO SHOW THE DELETE BUTTON ONLY IF THE SIGNED IN CREATED THE POST. i.e, ONLY THE USER WHO CREATED THE POST CAN DELETE IT*/
                <button
                onClick={() => {
                  deletePost(post.id);
                }}> &#128465; 
                </button>
              )}
            </div>

          </div>
          <div className='postTextContainer'> {post.postText} </div>
          <h3>@{post.author.name}</h3>
        </div>



        );
      })}
    </div>
  )
}

export default Home