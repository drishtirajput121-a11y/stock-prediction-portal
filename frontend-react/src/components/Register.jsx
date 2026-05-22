import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const handledRegistration = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log('test');
    const userData = {
      username,
      email,
      password
    }
    console.log(userData);
    try {
      const apiBaseURL = import.meta.env.VITE_BACKEND_BASE_API || 'http://127.0.0.1:8000/api/v1/';
      const response = await axios.post(`${apiBaseURL}register/`, userData)
      console.log(response.data);
      console.log('User registered successfully');
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className='container mt-5'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-12 col-md-8 col-lg-6 glass-panel bg-light-dark p-4 p-md-5' >
            <h2 className='text-light text-center mb-4 fw-bold'>Create an account</h2>
            <form onSubmit={handledRegistration}>
              <div className='mb-3'>
                <input type="text" className='form-control mb-3' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
              </div>
              <div className='mb-3'>
                <input type="email" className='form-control mb-3' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='3'>
                <input type="password" className='form-control mb-5' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
              </div>
              {success && <div className='alert alert-success'>Registration successful! You can now log in.</div>}
              {loading ? (
                <button className='btn btn-primary w-100' disabled> <FontAwesomeIcon icon={faSpinner} spin /> Please wait...</button>) : (
                <button type='submit' className='btn btn-primary w-100' to='/login'>Register</button>
              )
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register