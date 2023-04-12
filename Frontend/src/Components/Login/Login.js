import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Login() {
  const navigate=useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[message,setMessage]=useState('');
  const LoginUser = () =>{
    fetch('/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
     console.log('User unauthenticated..')
    
   setMessage(data.error);
      }
      else{
        console.log('user authenticated successfully!')
        localStorage.setItem('jwt',data.token);
        localStorage.setItem('users',JSON.stringify(data.user));
        navigate('/');
      }
  
    })
  
  }
  return (
    <div className='login'>
    <div className="login_logo">
    <img src={Logo} alt="" />
    {message?
      <p className='signup_status'><ErrorOutlineIcon/>&nbsp;{" "}{message}</p>
      :
      <p></p>
    }
    </div>

   
    
    
    
    <div className="login_fields">
   
    <div>
  <input type="email" name='email' id='email' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div>
  <input type="password" name='password' id='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  <button className='LoginBtn' onClick={LoginUser}>Login</button>
    <p className='noaccount'>Don't have an account? <Link to='/signup'><span>SignUp</span></Link></p>
    </div>
    </div>
  )
}

export default Login