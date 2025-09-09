
import {
  Alert,
  Button,
  HelperText,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from '../redux/userSlice';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [fieldEmpty, setFieldEmpty] = useState({});
  const {
    loading,
    error: errorMessage,
    forgotPasswordMessage,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

    setFieldEmpty({ ...fieldEmpty, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      return setFieldEmpty({ email: 'Email is required' });
    }

    try {
      dispatch(forgotPasswordStart());

      const res = await fetch('/api/auth/forgot-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return dispatch(forgotPasswordFailure(data.message));
      }

      if (res.ok || data.success === true) {
        dispatch(forgotPasswordSuccess(data.message));
        navigate('/verification-otp', {
          state: formData,
        });
        setFormData({ email: '' });
      }
    } catch (error) {
      return dispatch(forgotPasswordFailure(error.message));
    }
  };

  return (
    <section className="min-h-screen mt-40">
      <div className="min-h-[500px] p-3 max-w-[500px] mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Enter your <span className='font-bold text-amber-700'>email</span>
            </h2>
            <TextInput
              type="email"
              placeholder="Email"
              id="email"
              color={fieldEmpty.email ? 'failure' : 'gray'}
              onChange={handleChange}
            />
            <HelperText className="text-red-600 font-semibold">
              {fieldEmpty.email && fieldEmpty.email}
            </HelperText>
          </div>

          <Button
            type="submit"
            className="px-2 py-1 bg-gradient-to-r from-cyan-400 to-cyan-800 rounded-lg text-white cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-cyan-300 hover:to-cyan-800 transition duration-200"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Send OTP'
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
          <Alert className="mt-3" color="success">
            {forgotPasswordMessage}
          </Alert>
        )}
      </div>
    </section>
  );
};
export default ForgotPassword;
