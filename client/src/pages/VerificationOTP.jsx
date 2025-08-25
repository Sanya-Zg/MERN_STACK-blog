import {
  Alert,
  Button,
  HelperText,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearMessages,
} from '../redux/userSlice';

const VerificationOTP = () => {
  const [formData, setFormData] = useState(['', '', '', '', '', '']);
  const {
    loading,
    error: errorMessage,
    forgotPasswordMessage,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef([]);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate('/forgot-password');
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, location, navigate]);

  const valideValue = formData.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(forgotPasswordStart());

      const otp = formData.join('');
      const email = location.state.email;

      const res = await fetch('/api/auth/verify-otp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, otp}),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return dispatch(forgotPasswordFailure(data.message));
      }

      if (res.ok && data.success === true) {
        dispatch(forgotPasswordSuccess(data.message));
        navigate('/reset-password', {
          replace: true,
          state: { email, data },
        });
      }
    } catch (error) {
      return dispatch(forgotPasswordFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Enter your <span className="font-bold text-amber-700">OTP</span>
            </h2>
            <div className="flex justify-center gap-3 mt-4">
              {formData.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  ref={(ref) => (inputRef.current[index] = ref)}
                  value={formData[index]}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newData = [...formData];
                    newData[index] = value;
                    setFormData(newData);

                    if (value && index < 5) {
                      inputRef.current[index + 1].focus();
                    }
                  }}
                  maxLength={1}
                  className="w-12 h-12 rounded-lg text-center text-xl font-semibold tracking-widest bg-gray-100 focus:bg-white shadow-md border-2 border-gray-200 active:outline-none focus:outline-none focus:border-gray-300 transition-all"
                />
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!valideValue}
            className={`w-full py-3 mt-6 text-lg rounded-md shadow-md transition-all ${
              valideValue
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-800 hover:from-cyan-500 hover:to-cyan-900 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Verify OTP'
            )}
          </Button>
        </form>

        <div className="flex justify-between pt-5">
          <div className="flex gap-2 text-sm  font-medium">
            <span className="text-gray-500">Already have an account?</span>
            <Link
              to="/sign-in"
              className="text-cyan-500 hover:text-cyan-700 transition duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {errorMessage && (
          <Alert className="mt-3" color="failure">
            {errorMessage}
          </Alert>
        )}

        {forgotPasswordMessage && (
          <Alert className="mt-3 font-semibold" color="success">
            {forgotPasswordMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};
export default VerificationOTP;
