
import { useState} from 'react';
import './App.css';

import Cart from './Components/Cart';
import Loading from './Components/Loading';
import Login from './Components/Login';
import Main from './Components/Main';
import Nav from './Components/Nav';
import OrderCompletoion from './Components/OrderCompletoion';
import Res from './Components/Res';
import Restaurent from './Components/Restaurent';
import Signup from './Components/Signup';
import { Route, Routes } from 'react-router-dom';
import Order from './Components/Order';


function App() {
  const [loggedin,setLoggedin]=useState('false');
  const [reslist,setReslist]=useState([]);
  const [resitem,setResitem]=useState([]);
  const [token,setToken] =useState('');
  const [search,setSearch] = useState('');
  const [cartlist,setCartlist]=useState([]);
  const [user,setUser] = useState([]);
  const [userorders,setUserorders]=useState([]);
  const [profileveiw,setProfileveiw] = useState(false);
  

  const api = ' http://192.168.198.196:3500';


  
  
  return (
    <div className="App">
      <Nav loggedin={loggedin} setLoggedin={setLoggedin} setToken={setToken} setUserorders={setUserorders} api={api} user={user} profileveiw={profileveiw} setProfileveiw={setProfileveiw}/>
      <Routes>
        <Route path='/' > 
          <Route index element={<Main token={token} api={api} setReslist={setReslist} loggedin={loggedin} search={search} setSearch={setSearch} setToken={setToken} setLoggedin={setLoggedin} setUser={setUser} profileveiw={profileveiw}  setProfileveiw={setProfileveiw} user={user}/>} />
          <Route path='loading' element={<Loading/>}/>
          <Route path='login'element={<Login setLoggedin={setLoggedin} setToken={setToken} api={api} />} />
          <Route path='signup'element={<Signup api={api}/>} />
          <Route path='restaurent'element={<Restaurent reslist={reslist} setResitem={setResitem} setReslist={setReslist} search={search} setSearch={setSearch}/>} />
          <Route path='res'element={<Res res_item={resitem} cartlist={cartlist} setCartlist={setCartlist}/>} />
          <Route path='cart'element={<Cart cartlist={cartlist} setCartlist={setCartlist} user={user} api={api} resitem={resitem}/>} />
          <Route path='Ordercompletion'element={<OrderCompletoion/>} />
          <Route path='orders' element={<Order userorders={userorders}/>} />
      </Route>
      </Routes>
    
    </div>
  );
}

export default App;
