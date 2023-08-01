import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useFormInputs } from '../hooks';
import axios from 'axios';
import { login } from '../redux/slice/userSlice';
import { Navbar } from '../components';
import Fallback from '../components/Fallback';
import Cookies from 'universal-cookie';

const initialState = {
  email: '',
  password: '',
};

const url = 'https://todo-app-backend-n4ta.onrender.com/api/users/login';

const Login = () => {
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);
  const { inputs, bind } = useFormInputs(initialState);
  const { email, password } = inputs;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const disabled = !inputs;

  const handleSubmit = async (e) => {
    console.log(inputs);
    e.preventDefault();

    const payload = { email, password };
    console.log('payload');
    console.log(payload);

    if (!email || !password) {
      return toast.error('Please fill all fields');
      // if (!EMAIL_REGEX.test(email)) return toast.error("Email is invalid");
    }

    const headers = { 'Content-Type': 'application/json' };
    setLoading(true);
    try {
      const data = await axios({
        method: 'POST',
        url,
        data: payload,
        headers,
      });

      setLoading(false);
      console.log(data);
      console.log(data.data.id);
      // const { success } = data;
      const user = { payload };
      dispatch(login(user));
      cookies.set('userId', data.data.id);
      setLoading(false);
      toast.success('User logged in successfully!🚀.');
      const timeout = setTimeout(() => navigate('/'), 1000);
      return () => clearTimeout(timeout);
    } catch (error) {
      setLoading(false);
      // setError(error.response.data.message);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Navbar />
      {loading && <Fallback />}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <img
             className="w-8 h-8 mr-2"
             src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
             alt="logo"
           /> */}
            T&D TODO
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome Back 👋Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...bind}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...bind}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={disabled}
                >
                  {loading ? 'loading' : 'Login'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{' '}
                  <a
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Signup here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
