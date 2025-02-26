import { Helmet } from 'react-helmet'
import { CiUser } from 'react-icons/ci'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios' // Import Axios
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import bg from '../../../assets/features/common-bg.png'
import useUser from '../../../CustomHocks/useUser'

const Login = () => {
  const [showPass, setShowPass] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [passErr, setPassErr] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const {verifyTokenAndSetUser}= useUser()

  const onSubmit = async (data) => {
    setErrMsg('')
    setPassErr('')
    setEmailErr('')

    // Validate password
    if (data.password.length < 5) {
      setPassErr('Password must be 5 characters ')
      return
    } else if (isNaN(data.password)) {
      setPassErr('Password must contain only numbers')
      return
    } else {
      setPassErr('')
    }

    setIsLoading(true) // Start loading

    try {
      // Call the backend API to log in
      const response = await axios.post(
        'https://mobile-banking-tawny.vercel.app/api/auth/login',
        {
          identifier: data.email,
          pin: data.password,
        },
        {
          withCredentials: true, // Include cookies in the request
        }
      )

      console.log('API Response:', response.data) // Log the API response

      // Check if the login was successful
      if (response.data.success) {
        toast.success('Login successful!')
        verifyTokenAndSetUser()

        // Redirect based on user role
        setTimeout(() => {
       
            navigate('/')
          
        }, 1500)
      } else {
        setErrMsg(response.data.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('API Error:', error)

      // Handle Axios errors
      if (error.response) {
        setErrMsg(
          error.response.data.message || 'An error occurred during login.'
        )
      } else if (error.request) {
        setErrMsg('No response from the server. Please check your connection.')
      } else {
        setErrMsg('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  return (
    <div
      className='bg-[#0e0d0e] relative pt-8'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center top',
      }}
    >
      {/* Blur overlay */}
      <div className='absolute inset-0 bg-gray-900 bg-opacity-60 blur-3xl'></div>

      <Helmet>
        <title>Login</title>
      </Helmet>
      <ToastContainer />
      <div className='max-w z-20 relative min-h-screen flex items-center justify-center lg:p-6 md:p-5 my-6'>
        <div className='md:w-1/2 lg:w-1/2'>
          <div className='relative lg:w-11/12 m-auto bg-gray-500 bg-opacity-30 rounded-lg p-5 pt-10 shadow-md shadow-black'>
            <div className='absolute -top-14 left-[40%]'>
              <CiUser className='bg-stone-900 text-gray-400 p-4 text-8xl rounded-full block' />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-4 flex gap-3 flex-col items-center'
            >
              {/* Email input */}
              <label className='input input-bordered bg-gray-900 flex items-center gap-2 w-full rounded-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='w-4 h-4 opacity-70'
                >
                  <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                  <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                </svg>
                <input
                  type='email'
                  className='grow'
                  placeholder='Email or Phone Number'
                  {...register('email', { required: true })}
                />
              </label>
              <div className='w-full'>
                <p className='text-red-500'>{emailErr}</p>
              </div>

              {/* Password input */}
              <label className='relative input input-bordered bg-gray-900 flex items-center gap-2 w-full rounded-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='w-4 h-4 opacity-70'
                >
                  <path
                    fillRule='evenodd'
                    d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  type={showPass ? 'text' : 'password'}
                  className='grow'
                  placeholder='PIN'
                  {...register('password', { required: true })}
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className='absolute right-4 cursor-pointer'
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </div>
              </label>
              <div className='w-full'>
                <p className='text-red-500'>{passErr}</p>
              </div>

              <div className='w-full'>
                <p className='text-red-500'>{errMsg}</p>
              </div>

              {/* Submit Button */}
              <input
                className='btn w-full bg-stone-900 rounded-sm text-white'
                type='submit'
                value={isLoading ? 'Logging in...' : 'Login'}
                disabled={isLoading}
              />
            </form>

            {/* Register link */}
            <div className='flex flex-col justify-center items-center'>
              <p className='font-semibold'>
                Create a new account{' '}
                <Link to={'/register'}>
                  <button className='btn-link btn text-white'>Register</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login