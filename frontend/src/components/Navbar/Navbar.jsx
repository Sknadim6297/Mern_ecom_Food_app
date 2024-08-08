import React, { useContext, useState } from 'react'
import  './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, Navigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  

  const logOut=()=>{
    const confirm = window.confirm("Are you sure you want to logout?");
    if(confirm){
      localStorage.removeItem('token');
       setToken('');
       Navigate('/');
    }
    toast.success("Logout Successfully");
    




  }

  return (
    <div className='navbar'>
      <Link to='/'><h1>Nadeem.Restu</h1></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()>0?"dot":""}></div>
        </Link>
        {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button>:
        <div className='navbar-profile'>
        <img src={assets.profile_icon} alt="" />
        <ul className='nav-profile-dropdown'>
          <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
          <hr />
          <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

        </ul>

        </div>
        }
       
      </div>
    </div>
  )
}

export default Navbar
