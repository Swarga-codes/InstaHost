import React, { useState } from 'react'
import './SignUp.css'
import Logo from '../../assets/logo.png'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link, useNavigate } from 'react-router-dom'
function SignUp() {
  const[email,setEmail]=useState('');
  const[name,setName]=useState('');
  const[userName,setUserName]=useState('');
  const[password,setPassword]=useState('');
  const[message,setMessage]=useState('');
  const navigator=useNavigate();

 const registerUser = () =>{
 fetch('/signup',{
  method:'POST',headers:{
'Content-Type':'application/json'
  },
  body:JSON.stringify({
    email:email,
    name:name,
    userName:userName,
    password:password
  })
 }).then(res=>res.json())
 .then(data=>{console.log(data);
  if(!data.error){
    navigator('/login');
  }
else{
  setMessage(data.error);
}
})
 .catch(err=>console.log(err))
 }
  return (
    <div className="signup">
    <div className="signup_logo">
    <img src={Logo} alt="" />
    {message?
      <p className='signup_status'><ErrorOutlineIcon/>&nbsp;{" "}{message}</p>
      :
      <p></p>
    }
  
    </div>
    <div className="signup_fields">
    <div>
    <input type="email" name='email' id='email' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div>
    <input type="text" name='name' id='name' placeholder='Enter Full Name' onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div>
    <input type="text" name='username' id='username' placeholder='Enter Username' onChange={(e)=>setUserName(e.target.value)}/>
    </div>
    <div>
    <input type="password" name='password' id='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <button className='SignUpBtn' onClick={registerUser}>Sign Up</button>
    <p className='existinguser'>Already Registered? <Link to='/login'><span>Sign In</span></Link></p>
    </div>
    </div>
  )
}

export default SignUp