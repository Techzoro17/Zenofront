import React from 'react'
import { useNavigate } from 'react-router-dom'

const Order = ({userorders}) => {
  const navigate = useNavigate();
  return (
    <div>
        <div className='w-full flex px-6 py-2'>
          <button className='bg-green-700 p-1 rounded-lg text-white'>Back</button>
        </div>
      
        <h2 className='w-full flex  font-semibold text-lg px-10'>Your Orders:</h2>
      <div>
      <div>
        {userorders.length>0? 
        //For orders greater than o
        <div className=' h-[80vh]  px-20 py-4 overflow-auto '>
          {
            userorders.map((item)=>(
              <div className={`flex w-full p-4 border-2 rounded-lg border-green-800 justify-between items-center font-semibold text-lg`}>
                <h2>{item.date}</h2>
                <h2>Rupees:{item.amount}</h2>
                <h2 className={` text-white p-1 rounded-lg  ${item.status == 'Order Taken'?'bg-red-600':item.status==="Delivered"?'bg-green-800':'bg-orange-600'}`}>{item.status}</h2>
                <button className='bg-green-800 text-white font-semibold p-2 rounded-lg'>Veiw Details</button>
              </div>
            ))
          }

        </div>:
        //for orders not greater than 0
        <div className='h-[60vh] w-full flex justify-center items-center '>
            <div>
                <h2 className='text-5xl'>No Orders </h2>
                <p>Order Your Favourite Food On our App <span className='bg-green-700 text-white px-2 py-1 rounded-lg text-lg' onClick={()=>navigate('/')}>Now</span></p>
            </div>
        </div>
        }
      </div>
      

      
      </div>
        
    </div>
  )
}

export default Order