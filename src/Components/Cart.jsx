import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Delete from '../resource/delete.png';
import  { v4 as uuid }  from 'uuid'
import axios from 'axios';

const Cart = ({cartlist,setCartlist,user,api,resitem}) => {


    
    const [total,setTotal]=useState(0);
    const [items,setItems]=useState(0);
    const navigate = useNavigate();
    const [address,setAddress]=useState({
        Name:'',
        Address:'',
        Mobile_number:'',
        Alternative_number:''
    })

    useEffect(() => {
        preFunction();
    }, [cartlist]);
    

    const preFunction =()=>{
        const totalAmount = cartlist.reduce((acc, curr) => acc + curr.amount, 0);
        const totalItems = cartlist.reduce((acc, curr) => acc + curr.quan, 0);
        setTotal(totalAmount);
        setItems(totalItems);
    }

    const handleAddquan =(item)=>{
        const updated = {...item,quan:item.quan+1};
        console.log(updated);
        const amountupdate ={...updated,amount:updated.price*updated.quan};
        console.log(amountupdate);
        const newlist = cartlist.map((dish)=>dish.name===item.name?amountupdate:dish);
        setCartlist(newlist);
    }
    const handleSubquan =(item)=>{
        if(item.quan>1){
        const updated = {...item,quan:item.quan-1};
        console.log(updated);
        const amountupdate ={...updated,amount:updated.price*updated.quan};
        console.log(amountupdate);
        const newlist = cartlist.map((dish)=>dish.name===item.name?amountupdate:dish);
        console.log(newlist);
        setCartlist(newlist);
        }
    }

    const handleDelete =(id)=>{
        const deleted = cartlist.filter((item)=>item.id!==id);
        setCartlist(deleted);
    }

    const Orderconfirm=async()=>{
        
        if(cartlist.length>0){
            const date= new Date();
            const today = {
                Date :date.getDate(),
                month:date.getMonth(),
                year: date.getFullYear(),
            }

            const month =['Jan','Feb','Mar','Apr','May','Jun','Jly','Aug','Sep','Oct','Nov','Dec'];
            const Daate = `${today.Date} ${month[today.month]} ${today.year}`;
            console.log(Daate)
        
        

            const id = uuid();
            console.log(id);
            console.log(user.user_id);
            const order = {
                order_id:id,
                user_id:user.user_id,
                resid:resitem.id,
                date:Daate,
                amount:total,
                address:`${address.Name},${address.Address},${address.Mobile_number},${address.Alternative_number}`,
                order_list:cartlist,
                status:'Order Taken'


            }
            
            if(address.Name && address.Mobile_number&& address.Address){
                navigate('/loading');
                const response = await axios.post(`${api}/order`,{order});
                if(response){
                    setTimeout(() => {
                        setCartlist([]);
                        navigate('/Ordercompletion');
                        setTimeout(() => {
                            navigate('/');
                            
                        }, 4000);
                        
                    }, 2000);
                }else{
                    navigate('/cart');
                }

            }
        }
        
    }
  return (
    <div className='flex flex-col md:flex-row '>
        <div className='md:w-1/2'>
            <h2 className='font-semibold md:text-2xl '>Cart List</h2>

            <div className='px-4 pt-4 md:h-[85vh] bg-gray-400 overflow-y-auto  rounded-lg m-2'>
                {cartlist.map((item)=>(
                    
                <div className='bg-white  border-2 shadow-xl border-green-800 rounded-lg flex justify-evenly md:justify-between p-2 md:px-8 md:py-4 items-center font-semibold mb-4 ' key={item.id} >
                    <div className='flex  items-center md:w-1/4 text-sm md:text-lg'>
                        <h2 className='bg-green-800  text-white font-bold  text-sm md:text-2xl mr-4 p-2 md:p-4 rounded-full' >{item.name.charAt(0)+item.name.charAt(1)}</h2>
                        <h2>{item.name}</h2>
                    </div>
                    <div className='flex justify-between items-center w-32 md:w-48 text-sm md:text-lg' >
                        <div className='flex bg-slate-200 items-center rounded-lg overflow-hidden '>
                            <button className='bg-green-800 md:px-2 px-1 text-white md:text-2xl' onClick={()=>{handleSubquan(item)}}>-</button>
                            <h2 className='md:px-4 px-2'>{item.quan}</h2>
                            <button className='bg-green-800 px-1 md:px-2 text-white md:text-2xl' onClick={()=>{handleAddquan(item)}}>+</button>
                        </div>
                        <h2>{`Rs:${item.amount}`}</h2>
                    </div>
                    <button className='w-6 h-6' onClick={()=>handleDelete(item.id)}><img src={Delete} alt="Delte_btn" /></button>
                    
                    {/* <button className='bg-green-800 p-2 text-white font-semibold font-serif rounded-xl'>ADD</button> */}
                    

                </div>
                ))}
            

            </div>
            
        </div>
        <div className='md:w-1/2 p-2 md:px-10 md:py-10  '>
           
            <form  className='bg-gray-400 h-5/6 rounded-t-lg py-4 px-10 flex flex-col justify-evenly text-sm md:text-xl '>

                <h2 className='font-semibold md:text-xl  '>Delivary Address</h2>

                <div className='flex flex-col  ' >
                    <label htmlFor="fullname" className='flex  mb-2'>Name</label>
                    <input type="text" id='fullname' className='rounded-lg py-2 px-4' value={address.Name} placeholder='Abdul Askar ' onChange={(e)=>setAddress({...address,Name:e.target.value})}/>
                </div> 
                <div className='flex flex-col' >
                    <label htmlFor="Mobilenumber" className='flex   mb-2'>Mobile Number</label>
                    <input type="text" id='Mobilenumber' maxLength={10} minLength={10} value={address.Mobile_number} className='rounded-xl py-2 px-4' placeholder='15248 65869'onChange={(e)=>setAddress({...address,Mobile_number:e.target.value})}/>
                </div>
                <div className='flex flex-col' >
                    <label htmlFor="Address" className='flex   mb-2'>Address</label>
                    <input type="text" id='Address'  className='rounded-xl py-2 px-4' value={address.Address} placeholder='Door No,Street name,District - pincode'onChange={(e)=>setAddress({...address,Address:e.target.value})}/>
                </div>
                <div className='flex flex-col' >
                    <label htmlFor="Alternativenumber" className='flex   mb-2'>Alternate Number</label>
                    <input type="text" id='Alternativenumber' maxLength={10} minLength={10} value={address.Alternative_number} className='rounded-xl py-2 px-4' placeholder='98765 43210'onChange={(e)=>setAddress({...address,Alternative_number:e.target.value})}/>
                </div>
            </form>
            <div className='flex px-10 bg-green-800 justify-between py-2 h-1/6 items-center text-sm md:text-lg'>
                <div className='flex justify-between w-3/6 items-center text-white'>
                    <h2 className='w-3/4'>{`Rs:${total} `}<br/><span className='text-sm'>(inclusive of all taxes and invoice)</span></h2>
                    <h2 className='w-1/4'>{`Items : ${items}`}</h2>
                </div>
                <button className='bg-white text-green-800  px-2 rounded-xl font-semibold py-2' onClick={()=>Orderconfirm()}>Order Now</button>
            </div>
    </div>

    </div>
  ) 
}

export default Cart