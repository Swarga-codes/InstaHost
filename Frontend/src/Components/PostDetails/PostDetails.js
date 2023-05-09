import React, { useContext,useEffect,useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import "./PostDetails.css";
import DefaultProfilePic from '../../assets/userdefault.png'
import { commentContext } from "../../context/comments";
function PostDetails({ items, detailDisp }) {
  const navigate=useNavigate();
  const[showComment,setShowComment]=useState(false);
  const[item,setItem]=useState(items?.comments);
  const[data,setData]=useState([])
const{comment,setComment}=useContext(commentContext);
  const DeletePost=(posts)=>{
    if(window.confirm('Do you really want to delete this post?')){
    fetch(`http://localhost:5000/delposts/${posts}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      }
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  }
  }
  //Create comment
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
    .then(response=>{console.log(response);

    // updatePage(response.comment);
    console.log("My comm",response)
    setItem([...item,response.comments[response.comments.length-1]])
    // clickComment();
    navigate('/profile');
    })
    .catch(err=>console.log(err))
  }
  // const updatePage=(result)=>{
  //   const updatedData= data.map((posts)=>{
  //     if(posts._id===result._id){
  //       return result;
  //     }
  //     else{
  //       return posts;
  //     }
  //   })
  //   setItem(updatedData);
  // }

  const clickComment=(posts)=>{
    if(!showComment){
      setShowComment(true);
      console.log('I am clicked')
    setItem(posts);
    }
    else{
      setShowComment(false);
    }
    
  }
  useEffect(()=>{
  },[item])
  return (
    <div className="comment_details">
      <div className="comment_container">
        <div className="comment_pic">
          <img src={items.photo} alt="" />
        </div>
        <div className="comment_display">
          <div className="user_header">
            <img
              src={items.postedBy?.photo?items.postedBy?.photo:DefaultProfilePic}
              alt=""
            />
            <p>{items.postedBy?.userName}</p>
            <div className="delete_post" onClick={()=>{
              DeletePost(items._id);
              navigate('/');
            }}>
            <DeleteIcon/>
            </div>
          </div>
          <div className="comment_section">
            {item?.map((com) => {
              return (
                <p>
                  <b>{com?.postedBy?.userName}</b>&nbsp; &nbsp;{com.comment}
                </p>
              );
            })}
          </div>
          <div className="likes_caption">
            <p>{items?.likes?.length} likes</p>
            <br />
            <p><b>{items.postedBy.userName}</b>{" "}{items.body}</p>
          </div>

          <div className="add_comment">
            <input
              type="text"
              name="comment"
              id="name"
              placeholder="Enter a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={() => {
                createComment(comment, items._id);
              // detailDisp();
              }}
            >
              <SendIcon sx={{ backgroundColor: "#201b1b" }} />
            </button>
          
          </div>
          <div className="responsive_delete" onClick={()=>{
            DeletePost(items._id);
            navigate('/');
          }}>
          <DeleteIcon/>
          </div>
        </div>
      </div>

      <div className="close_comment" onClick={() => detailDisp()}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default PostDetails;
// onChange={(e) => setComment(e.target.value)}