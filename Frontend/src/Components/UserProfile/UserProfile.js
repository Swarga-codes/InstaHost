import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PostDetails from '../PostDetails/PostDetails';
import Navbar from '../SideNav/Navbar'
import './UserProfile.css'
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import DefaultProfilePic from '../../assets/userdefault.png'
function UserProfile() {
  const navigator=useNavigate();
  const[posts,setPosts]=useState([]);
  const[profileName,setprofileName]=useState('');
  const[postCount,setPostCount]=useState();
  const[userInfo,setuserInfo]=useState("");
  const[isFollow,setisFollow]=useState(false);
  const[followers,setfollowers]=useState(0);
  const[following,setfollowing]=useState(0);
  const[profilePic,setProfilePic]=useState("");
  const[getPost,setgetPost]=useState([]);
  const[show,setShow]=useState(false);
  const{userId}=useParams()

console.log('user:',userId)
const followUser=(userFollowId)=>{
  fetch("/follow",{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      followId:userFollowId
    })
  }).then((res)=>res.json())
  .then((data)=>{console.log(data);
    setisFollow(true);
  })
  .catch(err=>console.log(err))
}
const unfollowUser=(userFollowId)=>{
  fetch("/unfollow",{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      Authorization:'Bearer '+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      followId:userFollowId
    })
  }).then((res)=>res.json())
  .then((data)=>{console.log(data);
  setisFollow(false);
  })
  .catch(err=>console.log(err))
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
fetch(`/users/${userId}`,{
  method:'GET',
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer '+localStorage.getItem('jwt')
  }
}).then(res=>res.json())
.then(data=>{console.log("Profile data ",data);
setPosts(data.result);
setfollowers(data.data[0].followers.length);
setfollowing(data.data[0].following.length);
setPostCount(data.result.length)
setprofileName(data.data[0].userName);
setProfilePic(data.data[0].photo);
setuserInfo(data.data[0]._id)
if(data.data[0].followers.includes(JSON.parse(localStorage.getItem("users"))._id)){
  setisFollow(true);
}
})
.catch(err=>console.log(err))
  },[isFollow])
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
   <img src={profilePic?profilePic:DefaultProfilePic} alt="" />
   </div>
   <div className="profile_details">
   <div className="profile_name">
   <h1>{profileName}{"   "}{!isFollow?<button className='follow_user' onClick={()=>{
    console.log(userInfo)
    followUser(userInfo);}}>Follow</button>:
    <button className='unfollow_user' onClick={()=>{
      console.log(userInfo)
      unfollowUser(userInfo);}}>Unfollow</button>
  }</h1>
   
   <div className="profile_reach">
   <p>{postCount} Posts</p>
   <p>{followers} Followers</p>
   <p>{following} Following</p>
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
   <div className="responsive_navfooter">
   <Link to='/'><HomeIcon/></Link>
   <Link to='/myfollowing'><ExploreIcon/></Link>
   <Link to='/createposts'><AddBoxIcon/></Link>
   <Link to='/search'><SearchIcon/></Link>
   <Link to='/profile'><PersonIcon/></Link>
   </div>
    </div>
  )
}

export default UserProfile