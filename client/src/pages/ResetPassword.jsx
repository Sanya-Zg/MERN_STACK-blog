import {
  Alert,
  Button,
  HelperText,
  Label,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  clearMessages,
  forgotPasswordFailure,
  forgotPasswordStart,
  forgotPasswordSuccess,
} from '../redux/userSlice';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [fieldEmpty, setFieldEmpty] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    loading,
    error: errorMessage,
    forgotPasswordMessage,
  } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const valideValue = Object.values(formData).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate('/');
    } else if (location?.state?.email) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }

    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

    setFieldEmpty({ ...fieldEmpty, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      return dispatch(forgotPasswordFailure('Please fill in all fields.'));
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return dispatch(forgotPasswordFailure('The fields must match.'));
    }

    try {
      dispatch(forgotPasswordStart());

      const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return dispatch(forgotPasswordFailure(data.message));
      }

      if (res.ok && data.success === true) {
        dispatch(forgotPasswordSuccess(data.message));

        const timer = setTimeout(() => {
          navigate('/sign-in', { replace: true });
        }, 4000);

        setFormData({ email: '', newPassword: '', confirmPassword: '' });

        return () => clearTimeout(timer);
      }
    } catch (error) {
      return dispatch(forgotPasswordFailure(error.message));
    }
  };
  return (
    <section className="min-h-screen mt-40">
      <div className="min-h-[500px] p-3 max-w-[500px] mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-semibold text-2xl text-cyan-600 mb-4 text-center">
            Password change page
          </p>
          <div>
            <Label>New Password</Label>
            <div className="relative">
              <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                id="newPassword"
                color={fieldEmpty.newPassword ? 'failure' : 'gray'}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-5 flex items-center cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <HelperText className="text-red-600 font-semibold">
              {fieldEmpty.newPassword && fieldEmpty.newPassword}
            </HelperText>
          </div>

          <div>
            <Label>Confirm Password</Label>
            <div className="relative">
              <TextInput
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                id="confirmPassword"
                color={fieldEmpty.confirmPassword ? 'failure' : 'gray'}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-3 right-5 flex items-center cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <HelperText className="text-red-600 font-semibold">
              {fieldEmpty.confirmPassword && fieldEmpty.confirmPassword}
            </HelperText>
          </div>

          <Button
            type="submit"
            disabled={!valideValue}
            className="px-2 py-1 bg-gradient-to-r from-cyan-400 to-cyan-800 rounded-lg text-white cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-cyan-300 hover:to-cyan-800 transition duration-200"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Save password'
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
            <span className='text-lg'>{forgotPasswordMessage} </span>
            <p className="text-amber-600 font-medium">
              Redirecting to <span className='text-amber-600 font-bold uppercase'>sign-in</span> in 4s...
            </p>
          </Alert>
        )}
      </div>
    </section>
  );
};
export default ResetPassword;
