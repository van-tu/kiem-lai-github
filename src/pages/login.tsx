import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const signWithGoogle = async () => {
    try {
      await signInWithPopup( auth, provider );
    } catch (error) {
      console.log(error);
    }
    
    navigate('/');
  };

  return (
    <div className="login">
      <h2> Sign In With Google to countinue </h2>
      <button onClick={ signWithGoogle }> Sign With Google </button>
    </div>
  );
};