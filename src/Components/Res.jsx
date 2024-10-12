import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Res = ({res_item,cartlist,setCartlist}) => {

  const [dish,setDish] = useState(res_item);
  
  

  const navigate = useNavigate();


  const handleAdd =(item)=>{
    const exists = cartlist.find((data)=>data.id===item.id);
    if(!exists){
     cartlist.push(item);
     console.log(cartlist);
    }
    
  }

  const handleCart =()=>{
    try {
      if(cartlist.length>0){
      navigate('/cart')
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className='px-4'>
      <h2 className='md:text-2xl font-bold'>Restaurent Name</h2>
      <div className='bg-green-400 grid grid-rows-8 md:grid-cols-2 md:grid-rows-5 gap-4  p-4  h-[80vh]'>
        {dish.List.map((item)=>(


          <div className='bg-white rounded-lg flex  justify-between md:px-8 md:py-4 p-2 items-center font-semibold h-fit' key={item.id}>
            
            <div className='flex justify-between items-center'>
              <h2 className='bg-green-800  text-white font-bold md:text-2xl mr-4 p-1 md:p-4 rounded-full'>{item.name.charAt(0)+item.name.charAt(1)}</h2>
              <h2>{item.name}</h2>
            </div>

            <h2>Rs:{item.price}</h2>

            <div className='flex bg-slate-200 items-center rounded-lg overflow-hidden  '>
              <button className='bg-green-800 px-1 md:px-2 text-white md:text-2xl'>-</button>
              <h2 className=' px-2 md:px-4'>{item.quan}</h2>
              <button className='bg-green-800 px-1 md:px-2 text-white md:text-2xl'>+</button>
            </div>

            <button className='bg-green-800 p-1 md:p-2 text-white md:font-semibold text-sm md:text-lg  rounded-lg md:rounded-xl' onClick={()=>handleAdd(item)}>ADD</button>
          
          </div>
        ))}

      </div>
      <div className='h-[10vh] md:h-[7vh]  flex justify-end items-center px-2  md:px-10 text-white md:text-xl font-semibold'>
        <button className='bg-green-800 p-2 rounded-xl' onClick={()=>handleCart()}>{'Prodeed to Order ->'}</button>
      </div>
    </div>
  )
}

export default Res