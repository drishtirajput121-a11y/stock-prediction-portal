import { useState, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../AuthProvider"
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    const userData = {
      username,
      password
    }
    console.log(userData);
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData)
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      console.log('User logged in successfully');
      setIsLoggedIn(true);
      navigate('/dashboard');
    }catch(error){
      setError("Invalid credentials. Please try again.");
      console.log(error.response.data);
    }finally{
      setLoading(false);  
  }
}
  return (
        <>
    <div className='container'>
      <div className='row justify-content-center align-items-center'>
        <div className='col-md-6 bg-light-dark p-5' >
          <h2 className='text-light text-center'>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <input type="text" className='form-control mb-3' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            <div className='3'>  
            <input type="password" className='form-control mb-5' placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
            {error && <div className='text-danger'>{error}</div>}
            {loading ?(
              <button className='btn btn-primary w-100' disabled> <FontAwesomeIcon icon={faSpinner} spin />logging in...</button>) :(
              <button type='submit' className='btn btn-primary w-100'>Login</button>
              )
            }
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login