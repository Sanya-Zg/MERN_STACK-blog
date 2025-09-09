import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setVerifyEmailMessage, clearMessages } from '../redux/userSlice';
import { Alert } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { verifyEmailMessage } = useSelector((state) => state.user);

  const [success, setSuccess] = useState(false);

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      dispatch(clearMessages());
      dispatch(setVerifyEmailMessage('Invalid code'));
      return;
    }

    const verifyEmail = async () => {
      dispatch(clearMessages());
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (res.ok) {
          dispatch(setVerifyEmailMessage(data.message));

          setSuccess(data.success);
        } else {
          setSuccess(false);
          dispatch(
            setVerifyEmailMessage(data.message || 'Verification failed')
          );
        }
      } catch (err) {
        console.log(err);
        dispatch(
          setVerifyEmailMessage('Something went wrong. Please try again.')
        );
        setSuccess(false);
      }
    };

    verifyEmail();
  }, [code, dispatch]);

  const goToLogin = () => {
    navigate('/sign-in', { replace: true });
  };
  const goToHome = () => {
    navigate('/', { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* <h2
        className={`text-xl font-semibold ${
          success ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {message}
      </h2> */}
      {verifyEmailMessage && (
        <Alert className="mt-3" color={success ? 'success' : 'failure'}>
          {verifyEmailMessage}
        </Alert>
      )}

      {success ? (
        <button
          onClick={goToLogin}
          className="mt-4 bg-cyan-900 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg transition cursor-pointer"
        >
          Go to Sign In
        </button>
      ) : (
        <button
          onClick={goToHome}
          className="mt-4 bg-cyan-900 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg transition cursor-pointer"
        >
          Go to Home
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
