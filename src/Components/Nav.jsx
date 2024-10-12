
import React, {  } from 'react'
import { useNavigate } from 'react-router-dom'
import user_profile from '../resource/user.png';
import axios from 'axios';

const Nav = ({loggedin,setLoggedin,setToken,setUserorders,api,user,profileveiw,setProfileveiw}) => {
  const navigate = useNavigate(); 

  const handlleNavtoorders=async()=>{
    const response = await axios.get(`${api}/order`);
    const filtered =response.data.filter((item)=>item.user_id===user.user_id);
    setUserorders(filtered);
    console.log(filtered);
    if(filtered){
      navigate('/orders')
    }
  }

  const logOut =()=>{
    localStorage.removeItem('acesstoken');
    setToken('');
    setLoggedin('false');
    setProfileveiw(false);

  }


  return (
    <div className='w-full bg-green-800 text-white h-10  flex justify-between md:h-14 px-10 md:px-20 items-center'>
        <div>
            <button><h2 className='text-3xl font-mono font-bold' onClick={()=>navigate('/')} >ZENO</h2></button>
        </div>
        

        {loggedin ==='true' ?

        <div className='h-full  flex md:w-40 justify-between items-center'>
          <button className=' text-sm md:text-lg px-2 md:font-semibold  border-2 rounded-lg md:p-1 hover:bg-white hover:text-green-900' onClick={()=>handlleNavtoorders()}>Orders</button>
          <button className='h-full overflow-hidden p-2'  >
            <img src={user_profile} alt="USER-PROFILE"  className='h-full' onClick={()=>setProfileveiw(!profileveiw)}/>
          </button>
        </div>

        : loggedin==='wait'? null:<div>
            <button className='bg-white px-2 py-1 text-sm  md:text-lg md:px-6 md:py-1 rounded-xl text-green-800 font-bold' onClick={()=>{setLoggedin('wait'); navigate('/login');}}>Login</button>
        </div>}  

      {/*Profile Part */}
      {profileveiw &&
         <div className={` ${profileveiw?'translate-x-[43vw] h-3/4 md:translate-x-[77vw]':'hidden translate-x-[144vw]'} bg-slate-200 text-black p-8 rounded-lg absolute  translate-y-[41vh] font-bold  z-10  flex justify-between flex-col items-center  `}>
          <div className=' size-20 md:size-48 '>
            <div className=' flex justify-center '>
             <h2 className='md:p-8 p-4 bg-green-500 rounded-full text-xl md:text-4xl'>{user.username.charAt(0)+user.username.charAt(1)}</h2>
            </div>
            <h2 className='p-4 text-xl md:text-3xl'>{user.username}</h2>
          </div>
            
             <button className='bg-red-600 text-white py-2 px-10 rounded-xl' onClick={()=>logOut()}>Logout</button>
            
        </div>     
        } 

        


    </div>
  )
}

export default Nav