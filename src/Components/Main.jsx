import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ad_1 from '../resource/ad_1.jpeg'
import ad_2 from '../resource/ad_2.jpeg'
import ad_3 from '../resource/ad_3.jpeg'
import ad_4 from '../resource/ad_4.jpeg'
import ad_5 from '../resource/ad_5.jpeg'
import './main.css';

const Main = ({token,api,setReslist,loggedin,setSearch,search,setToken,setLoggedin,setUser,profileveiw,setProfileveiw,user}) => {

  const district =["Chennai","Coimbatore","Trichy","Madurai","Banglore","Erode"];
  const navigate = useNavigate();
  const ad =[ad_1,ad_2,ad_3,ad_4,ad_5];

  useEffect(() => {
    
    
    const fetchuser = async ()=>{
      
      try {
        const gettoken = localStorage.getItem('acesstoken'); 
        if(gettoken){
          setToken(gettoken);
        }
        const response = await axios.get(`${api}/user/${gettoken}`);
        const user = response.data;
        if(user){
          setUser(user);
          setLoggedin('true');
          console.log('the user was',user);
        }else{
          console.log('No user was found')
        }
      } catch (error) {
        console.log(error);        
      }
    
    }
    fetchuser();

    
  }, [token])
  
  
  const fetching = async(e)=>{
    e.preventDefault();
   
      if(loggedin === 'true'){
        try {
          const fetched =  await axios.get(`${api}/resdata`,{
            headers:{
              'Authorization':token
            }
          });
          setReslist(fetched.data);
          navigate('/restaurent');
        } catch (error) {
          setLoggedin('false');
          console.log(error);
        }
      }else{
        navigate('/login');
      }
  }

  

  
  return (
    <div className=' p-4 relative z-0'>
      {/* start of Profile Code part*/}

      
        {/*End of profile code part*/}

        {/*Start of Main part */}
        {/*Start of Advertisment  */}

        <div className=' w-full h-72 rounded-lg   text-4xl font-bold  items-center text-white overflow-hidden '   >
          <div className='w-full h-full flex justify-between adsm  md:Ad gap-4 md:gap-20 md:-translate-x-28 py-4'>
            {ad.map((item,index)=>(
              <img src={item} alt="image"  className='h-full w-2/4' key={index} />
            ))}
          </div>
        </div>
        {/*End of Advertisment  */}
        {/*Start of Search */}

        <div className='my-4 p-2 md:py-2  md:px-20 rounded-xl flex justify-between bg-green-400  md:justify-evenly md:flex '>

          <form className='rounded-2xl overflow-hidden '>
            <input type="text "  placeholder='Search Dishes' value={search}  className='px-2 py-1 md:h-full md:w-96 focus:outline-none  ' onChange={(e)=>setSearch(e.target.value)} />
            <button className='bg-green-800 text-white px-2 py-1 h-full ' onClick={(e)=>fetching(e)}>Search</button>
          </form>

          <button className='bg-white text-sm px-2 py-1 font-semibold md:text-lg md:px-4 md:py-1 rounded-lg shadow-md shadow-gray-400'>Sort by</button>

        </div>
        {/*End of Search start of District filters  */}

        <div className=''>
          <h2 className='md:text-2xl flex justify-start py-2'>Search By Places</h2>

          <div className='bg-green-400 rounded-lg grid  grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-5 p-4'>
             {district.map((item,index)=>(
              <button className='basis-1 bg-green-800 text-white  rounded-xl p-2 md:p-4' key={index} >
                <div className='bg-white text-xl p-2 w-10 h-fit md:text-4xl md:w-1/4  md:p-8 rounded-full flex justify-center mx-auto text-green-800'>
                  {item.charAt(0)+item.charAt(1)}
                </div>
                <h2 className='md:text-lg  font-bold'>{item}</h2>
              </button>
             ))}
          </div>
          

        </div>
        {/*End of District filters */}

    </div>
  )
}

export default Main