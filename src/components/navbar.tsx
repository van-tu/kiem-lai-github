import { Link } from 'react-router-dom';
import { useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [ user ] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className='navbar__link'>
        <div className='navbar__link-home'>
          <Link to='/' > Home </Link>
        </div>
        
        <div className='navbar__link-login'>
          { user ? <Link to='/create-post'> Create Post </Link> : <Link to='/login' > Login </Link> }
        </div>
        
      </div>
      
      
      { user && 
        <div className='navbar__account'>
          <p> { user?.displayName } </p>
          <img src={ user?.photoURL || "" } width={30} height={30} />
          <button onClick={ async () => {await signOut(auth); navigate('/');} }> Logout </button>
        </div> }
      
    </div>
  );
};