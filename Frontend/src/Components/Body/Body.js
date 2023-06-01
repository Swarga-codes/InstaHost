import React, { useContext, useEffect, useState } from 'react'
import Posts from '../Posts/Posts'
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../SideNav/Navbar'
import './Body.css'
import CloseIcon from '@mui/icons-material/Close';
import { commentContext } from '../../context/comments';
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
function Body() {
  const navigator=useNavigate();
  const[data,setData]=useState([]);
  const[showComment,setShowComment]=useState(false);
  const{comment,setComment}=useContext(commentContext);
  const[items,setItem]=useState([]);
  const[updateComments,setUpdateComments]=useState(items)
  const createComment=(text,id)=>{
    fetch("http://localhost:5000/comments",{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        Authorization:"Bearer "+localStorage.getItem('jwt')
      }
      ,
      body:JSON.stringify({
        text:text,
        postId:id
      })
    }).then(res=>res.json())
    .then(response=>{
      console.log(response.comments[response.comments.length-1]);
    updatePage(response);
  setUpdateComments([...updateComments,response.comments[response.comments.length-1]])
    })
    .catch(err=>console.log(err))
  }
  const updatePage=(result)=>{
    const updatedData= data.map((posts)=>{
      if(posts._id===result._id){
        return result;
      }
      else{
        return posts;
      }
    })
    setData(updatedData);
  }
  const clickComment=(posts)=>{
    if(!showComment){
      setShowComment(true);
      // console.log('I am clicked')
    setItem(posts);
   
    console.log(updateComments)
    }
    else{
      setShowComment(false);
    }
    
  }
const likePosts = (id)=>{
  fetch("http://localhost:5000/likes",{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body: JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then(result=>{
    // console.log(result);
  // const updatedData= data.map((posts)=>{
  //   if(posts._id===result._id){
  //     return result;
  //   }
  //   else{
  //     return posts;
  //   }
  // })
  // setData(updatedData)
  updatePage(result);
  })
  .catch(err=>console.log(err))
}
const UnlikePosts = (id)=>{
  fetch("http://localhost:5000/unlikes",{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      'Authorization':'Bearer '+localStorage.getItem('jwt')
    },
    body: JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then(result=>{
    // console.log(result);
    const updatedData= data.map((posts)=>{
      if(posts._id===result._id){
        return result;
      }
      else{
        return posts;
      }
    })
    setData(updatedData)
  })
  .catch(err=>console.log(err))
}
 useEffect(()=>{
  fetch('http://localhost:5000/posts',{
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem('jwt')
    }
  }).then(res=>res.json())
  .then(data=>{
    // console.log(data);
    setData(data);
  })
  .catch(err=>console.log(err))
  console.log(updateComments)
 },[])
  return (
    <div className='Body'>
    <Navbar/>
    <div className="all_posts">
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
    <div className="posts_display">
    {data.map(d=>(
      <Posts dat={d} id={d._id} likePosts={likePosts} UnlikePosts={UnlikePosts} comms={clickComment} createComment={createComment} commupdate={setUpdateComments}/>
     
    ))
    
    }
    <br /><br /><br />
    </div>
<div className="responsive_navfooter">
<Link to='/'><HomeIcon/></Link>
<Link to='/myfollowing'><SwitchAccountOutlinedIcon/></Link>
<Link to='/createposts'><AddBoxIcon/></Link>
<Link to='/search'><SearchIcon/></Link>
<Link to='/profile'><PersonIcon/></Link>
</div>
<div className={showComment?"comment_details":"comment_details_hidden"}>
<div className="comment_container">
<div className="comment_pic">
<img src={items.photo} alt="" />
</div>
<div className="comment_display">
<div className="user_header">
<img src={items.postedBy?.photo?items.postedBy?.photo:DefaultProfilePic} alt="" />
<p><b>{items.postedBy?.userName}</b></p>
</div>
<div className="comment_section">
{updateComments?.map((com)=>{
  return(
  <p><b>{com?.postedBy?.userName}</b>&nbsp; &nbsp;{com.comment}</p>
)})}


</div>
<div className="likes_caption">
<p>{items?.likes?.length} likes</p>
<br />
<p><b>{items.postedBy?.userName}</b>{" "}{items.body}</p>
</div>

<div className="add_comment">

<input type="text" name='comment' id='name' value={comment} placeholder='Enter a comment...' onChange={(e)=>setComment(e.target.value)}/>
<button onClick={()=>{createComment(comment,items._id);
setComment('');
}}><SendIcon sx={{backgroundColor:'#201b1b'}}/></button>
</div>
</div>
</div>

<div className="close_comment" onClick={()=>clickComment()}>
<CloseIcon/>
</div>

</div>
    
    </div>

    </div>
  )
}

export default Body