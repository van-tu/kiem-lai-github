import { Post as iPost } from "./main";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { addDoc, collection, getDocs, where, query, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import img from '../../images/delete-icon.png';

interface Props {
  post: iPost;
}

interface like {
  userID: string;
  likeID: string;
  postID: string;
}

export const Post =  (props: Props) => {
  const { post } = props;

  const [ user ] = useAuthState(auth);
  const likesRef = collection(db, 'likes');
  const [ Likes, setLikes ] = useState<like[] | null>(null);
  const likeDoc = query(likesRef, where('postId', '==', post.id));
  const hasUserLike = Likes?.find((like) => like.userID == user?.uid);
 
  
  console.log('zxcv');
  
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id
      });

      user && setLikes((prev) => (
        prev ? [ ...prev, { userID: user?.uid, likeID: newDoc.id, postID: post.id }] : [{ userID: user?.uid, likeID: newDoc.id, postID: post.id }]
      ));
     
    } catch (error) {
      console.log(error);
    }
    
  }

  const getLike = async () => {
    const data = await getDocs(likeDoc);
    
    setLikes(data.docs.map((doc) => ({ userID: doc.data().userId, likeID: doc.id, postID: doc.data().postId })));
  };


  useEffect(() => {
    getLike();
  }, []);
  
  const removeLike = async () => {
    try {
      const deleteQuery = query(likesRef,  where('postId', '==', post.id), where('userId', '==', user?.uid));
      const delData = await getDocs(deleteQuery);
      const likeID = delData.docs[0].id;
      const delDoc = doc(db, 'likes', likeID);
      deleteDoc(delDoc);

      setLikes((prev) => (
        prev && prev.filter((like) => like.likeID !== likeID)
      ))
    } catch (error) {
      console.log(error);
    }
    
  };
  
  const [id, setId] = useState('y');

  const deletePost = async () => {
    try {
      const delDoc = doc(db, 'posts', post.id);
      deleteDoc(delDoc);

      const del = Likes?.filter((doc) => doc.postID == post.id);
      const delID = del && del[0].likeID;
      if(delID) {
        const delLikeDoc = doc(db, 'likes', delID);
        deleteDoc(delLikeDoc);
      }

      
      
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = () => {
    setId('n');
  }
  
  return (
    <div className='post' id={id}>
      
        <div className="post__title">
          <h3> { post.title } </h3>
        </div>

        <div className="post__body">
          <p> { post.description } </p>
        </div>
        
        <div className="post__footer">
          <p className="post__user"> @{ post.username } </p>
          {user  && <button onClick={() => {
            !hasUserLike ? addLike() : removeLike();
          }} > { hasUserLike ? <>👎</> : <>👍</>} { Likes?.length }</button>}
          
        </div>
        
        <div>
          {post.userId == user?.uid && <img src={img} alt="X" width={50} height={50} className="post__delete" onClick={() => {
            removePost(); deletePost();
          }} /> }
        </div>
        
    </div>
  );
};