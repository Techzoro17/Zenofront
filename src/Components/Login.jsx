import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({setLoggedin,setToken,api}) => {
    const navigate = useNavigate();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const handleLogin = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/login`,{username,password});
            localStorage.setItem('acesstoken',response.data.accesstoken);
            setToken(response.data.accesstoken);
            setLoggedin('true');
            navigate('/');
            console.log(response.data.accesstoken);
            console.log('Login succesfull');
        } catch (error) {
            console.log(error)
            setPassword('');
            setUsername('');
        }
    }
  return (
    <div  className=' md:h-[90vh] h-[90vh]  flex justify-center items-center'>
        <form className='bg-green-800 w-3/4  md:w-1/4 p-4 text-white flex flex-col gap-8 h-fit rounded-2xl' >
            <h2 className='text-3xl'>Login</h2>
            <div className='flex flex-col '>
                <label htmlFor="" className='flex  '>Enter the Username/Email</label>
                <input type="text" placeholder='xyz@gmail.com'  value={username} className='mt-2 px-4 py-2 rounded-md text-black' onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="" className='flex'>Enter the Password</label>
                <input type="text" placeholder='XXXXXXXX' value={password} className='mt-2 px-4 py-2 rounded-md text-black'  onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='flex justify-between'>
                <button className='bg-white text-green-800 font-semibold px-4 py-1 rounded-lg' onClick={(e)=>handleLogin(e)}>Login</button>
                <p>Forgot Password</p>
            </div>

            
            <h2 className='bg-white text-green-800 py-2 font-semibold rounded-2xl text-xl'>Sign with Google</h2>
            <p>Didn't have a account <button className='text-green-800 bg-white py-1 rounded-lg px-2' onClick={()=>navigate('/signup')}>signup</button></p>
        </form>

        

    </div>
  )
}

export default Login