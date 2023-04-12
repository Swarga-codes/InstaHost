import React, { useEffect, useState } from 'react'
import PostDetails from '../PostDetails/PostDetails';
import ProfilePicPopup from '../ProfilePicPopup/ProfilePicPopup';
import Navbar from '../SideNav/Navbar'
import './Profile.css'
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
// import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
import { Link, useNavigate } from 'react-router-dom';
import DefaultProfilePic from '../../assets/userdefault.png'
function Profile() {
  const navigator=useNavigate();
  const[posts,setPosts]=useState([]);
  const[profile,setprofile]=useState('');
  const[getPost,setgetPost]=useState([]);
  const[show,setShow]=useState(false);
  const[changeProfilePic,setChangeProfilePic]=useState(false);
  const editProfilePic=()=>{
    if(!changeProfilePic){
      setChangeProfilePic(true);
    }
    else{
      setChangeProfilePic(false);
    }
  }
  const detailDisp=(getPost)=>{
    if(show){
setShow(false);
    }
    else{
      setShow(true);
      setgetPost(getPost);
    }
  }
  useEffect(()=>{
fetch(`/users/${JSON.parse(localStorage.getItem('users'))._id}`,{
  method:'GET',
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer '+localStorage.getItem('jwt')
  }
}).then(res=>res.json())
.then(data=>{
  // console.log("Profile data ",data);
setPosts(data.result);
setprofile(data.data[0]);
})
.catch(err=>console.log(err))
  },[])
  return (
    <div className='Profile'>
  <Navbar/>
  <div className="responsive_navheader">
  <Link to='/'><img src={Logo} alt="" /></Link>
  <div className="res_logout" onClick={()=>{
    if(window.confirm('Do you wish to logout?')){
      localStorage.clear();
      navigator('/login');
      }
  }}>
  <LogoutIcon sx={{color: 'white'}}/>
  </div>
 
  </div>
   <div className="profile_header">
   <div className="profile_image">
   <img src={profile.photo?profile.photo:DefaultProfilePic} alt="" onClick={editProfilePic}/>
   </div>
   <div className="profile_details">
   <div className="profile_name">
   <h1>{profile.userName}</h1>
   <div className="profile_reach">
   <p>{posts.length} Posts</p>
   <p>{profile.followers? profile.followers.length: "0"} Followers</p>
   <p>{profile.following? profile.following.length: "0"} Following</p>
    </div>
   </div>

   </div>
   </div>
   {/* Gallery Section */}
   <div className="users_posts">
   {posts.map(post=>(
    <img src={post.photo} alt="" onClick={()=>{
      detailDisp(post);
    }}/>
   ))}
   </div>
   {
    show &&
    <PostDetails items={getPost} detailDisp={detailDisp}/>
   }
   {
    changeProfilePic &&
    <ProfilePicPopup edit={editProfilePic}/>
   }
   <div className="responsive_navfooter">
   <Link to='/'><HomeIcon/></Link>
   <Link to='/myfollowing'><SwitchAccountOutlinedIcon/></Link>
   <Link to='/createposts'><AddBoxIcon/></Link>
   <Link to='/search'><SearchIcon/></Link>
   <Link to='/profile'><PersonIcon/></Link>
   </div>
    </div>
  )
}

export default Profile