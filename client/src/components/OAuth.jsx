import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      className="bg-gradient-to-r from-blue-900 to-blue-400 cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-400 transition duration-200"
    >
      <AiFillGoogleCircle size={25} className="mr-3" />
      <span className="transform-none">Continue with Google</span>
    </Button>
  );
};
export default OAuth;
