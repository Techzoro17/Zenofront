import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';


const Signup = ({api}) => {
const navigate = useNavigate();

const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
const [confirm,setConfirm]= useState('');

const handlesignup = async (e)=>{
    e.preventDefault();
    try {
        
        if(!username){
            document.getElementById('error').textContent ='Username required';
            setTimeout(() => {
                document.getElementById('error').textContent ='';
                
            }, 3000); 
        }
        if(username && !password){
            document.getElementById('error').textContent ='Password required';
            setTimeout(() => {
                document.getElementById('error').textContent ='';
                
            }, 3000); 
        }
        if(username && password && !confirm){
            document.getElementById('error').textContent ='Confirm your password';
            setTimeout(() => {
                document.getElementById('error').textContent ='';
                
            }, 3000); 
        }

        if(username && password !== confirm){
            document.getElementById('error').textContent ='Password does not match';
            setConfirm('');
            setTimeout(() => {
                document.getElementById('error').textContent ='';
            }, 3000); 
            
        }

        if(username && password === confirm){
            const id = uuid();
             
            const user = {
                username :username,
                password:password,
                user_id:id
            }
            const response = await axios.post(`${api}/register`, user);
            if(response)console.log('created Account successfully');
            navigate('/login');

        }
         
        
    } catch (error) {
        console.log(error);
    }
    
}
  return (
    <div  className=' h-[90vh]  flex justify-center items-center'>
        <form className='bg-green-800 w-3/4 md:w-1/4 p-4 text-white flex flex-col gap-8 h-fit rounded-2xl' >
            <h2 className='text-3xl'>SignUp</h2>
            <div className='flex flex-col '>
                <label htmlFor="" className='flex  '>Enter the Username/Email</label>
                <input type="text" placeholder='xyz@gmail.com' value={username}  className='mt-2 px-4 py-2 rounded-md text-black' required onChange={(e)=>setUsername(e.target.value)}/>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="" className='flex'>Enter the Password</label>
                <input type="text" placeholder='XXXXXXXX' value={password} className='mt-2 px-4 py-2 rounded-md text-black' required onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="" className='flex'>Confirm the Password</label>
                <input type="text" placeholder='XXXXXXXX' value={confirm} className='mt-2 px-4 py-2 rounded-md text-black'   onChange={(e)=>setConfirm(e.target.value)}/>
            </div>
            <div className='flex justify-between'>
                <button className='bg-white text-green-800 font-semibold px-4 py-1 rounded-lg' onClick={(e)=>handlesignup(e)}>Signup</button>
            </div>
            <p className='font- xl text-red-500 font-semibold animate-fadeIn animate-fadeOut' id='error'></p>
                
            

        </form>
        

    </div>
  )
}

export default Signup