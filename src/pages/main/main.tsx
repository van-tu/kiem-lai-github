import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Post } from "./post";

export interface Post {
  username: string;
  title: string;
  description: string;
  id: string;
  userId: string;
};

export const Main = () => {

  const [ postsList, setPostsList ] = useState<Post[] | null>(null);
  const postsRef = collection(db, 'posts');

  const getPost = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as Post[])
  };

  useEffect(()=>{
    getPost();
  }, []);

  

  return (
    <div className="post-container">
      { postsList?.map((post) => <Post post={ post } />) }
    </div>
  );
};