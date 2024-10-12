import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Restaurent = ({reslist,setResitem,search,setSearch,setReslist}) => {
  const [filteredlist,setFiltered] =useState(reslist);

  useEffect(() => {
    const filtered = reslist.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(filtered);
    
  }, [search,reslist,setReslist])
  

console.log(reslist)

  const navigate = useNavigate();
  const handleResList=(item)=>{
    setResitem(item);
    navigate('/res');
  }
  return (
    <div className=''>
        
        <div className='bg-green-400  py-2 md:px-20  flex justify-evenly'>


          <form className='rounded-xl overflow-hidden flex'>
            <input type="text "  placeholder='Search Restaurent' value={search} className=' px-2  md:px-2 md:py-1 md:w-96 focus:outline-none' onChange={(e)=>setSearch(e.target.value)}/>
            <button className='bg-green-800 text-white px-2 py-1 '>Search</button>
          </form>

          <button className='bg-white  px-4 py-1 rounded-lg shadow-md  shadow-black'>Sort by</button>
        </div>
        <p className='flex px-4 md:text-xl font-semibold'>Results based on search :</p>

        <div className='bg-green-400 mx-1 md:mx-4 px-2 rounded-lg py-4 md:px-6 '>
            {filteredlist.map((item)=>(

                <div className='bg-green-800 text-sm md:text-xl text-white rounded-xl p-2 flex justify-between md:px-10 md:py-2 items-center mb-4
                ' key={item.id} >
                    <div className='bg-white md:text-4xl font-bold  p-1 md:p-2 text-green-900  rounded-full'>{item.name.charAt(0)+item.name.charAt(1)}</div>
                    <h2 className='font-bold md:text-2xl'>{item.name}</h2>
                    <h3 className='hidden md:block'>{item.couisine}</h3>
                    <h3>{item.timing}</h3>
                    <div>{`${item.star} Star`}</div>
                    <button className='bg-white  text-green-800 font-semibold shadow-2xl shadow-black h-fit px-2 py-1 rounded-lg' onClick={()=> handleResList(item)}> Order</button>
                </div>

            ))}
            

        </div>

        
    </div>
  )
}

export default Restaurent