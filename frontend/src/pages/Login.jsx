
import React , {useState} from "react";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/ContextProvider';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const navigate = useNavigate()
  const {login} = useAuth()
  
  
  const handleSubmit =  async (e) => {
   e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login",
    {   
        email,
        password,
    });
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        navigate("/")
      }
    }
    catch (error) {
      console.log(error)
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-gray-100">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-7">
        
        
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
          Login
        </h2>

        
        <form className="space-y-4"  onSubmit={handleSubmit} >  
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
             
            />
          </div>

         
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
             
            />
          </div>

         
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-sm text-white py-2 rounded-lg font-medium transition duration-300"
          >
            Login
          </button>

         
          <p className="text-center text-xs text-gray-600">
            Don't Have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login
