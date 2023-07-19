import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

interface creatForm {
  title: string;
  description: string;
}

export const PostForm = () => {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().max(50, "This title too long.").required('You must add Title.'),
    description: yup.string().max(200, "This description too long.").required('You must add Description.')
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const [ user ] = useAuthState(auth);
  const postsResf = collection(db, 'posts');

  const onSubmitData = async (data: creatForm) => {
    await addDoc(postsResf, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
    });

    navigate('/');
  };

  return (
    <form onSubmit={ handleSubmit(onSubmitData) }>
      <label>Title</label>
      <input placeholder="Text Title" { ...register('title') } className="create-post__input-title" />
      <p style={{color: "red", fontSize: '0.7rem'}}> {errors.title?.message} </p>
      <label>Description</label>
      <textarea placeholder="Text Description" { ...register('description') } className="create-post__input-description" rows={5} />
      <p style={{color: "red", fontSize: '0.7rem'}}> {errors.description?.message} </p>
      <input type="submit" className="create-post__submit" value='Send' />
    </form>
  );
};