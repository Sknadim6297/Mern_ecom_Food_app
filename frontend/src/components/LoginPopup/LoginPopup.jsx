import React, { useContext,useState } from 'react'
import './LoginPopup.css'

import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({setShowLogin}) => {
    
    const{setToken}=useContext(StoreContext);

    const [currState,setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
        name:'',
        email:'',
        password:''
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
       setData({...data,[name]:value})
    } 
     
    const onLogin= async(event)=>{
        event.preventDefault();
        const response=await axios.post('http://localhost:4000/api/user/login',data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
            setShowLogin(false);
            toast.success("Login Succesfully");
        }
        else{
            toast.error("Login Failed");
        }   

    }
    const onRegister = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:4000/api/user/register', data);
        console.log(response);
        

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false);
            toast.success("Register successfully");
        } else {
            toast.error("Register failed");
        }
    };
    const onSubmitHandler = (event) => {
        if (currState === "Login") {
            onLogin(event);
        } else {
            onRegister(event);
        }
    };
  return (
    <div className='login-popup'>
        <form className="login-popup-container" onSubmit={onSubmitHandler}>
            <div className="login-popup-title">
                <h2>{currState}</h2> <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Sign Up"?<input  onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Your name' />:<></>}
                <input onChange={onChangeHandler} value={data.email} type="email" name='email' placeholder='Your email' />
                <input  onChange={onChangeHandler} value={data.password} type="password" name='password' placeholder='Password' />
            </div>
            <button type='submit'>{currState==="Login"?"Login":"Create account"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
                ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
                :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup
