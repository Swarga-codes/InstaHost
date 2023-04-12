import React, { useEffect, useRef, useState } from 'react'
import './ProfilePicPopup.css'
function ProfilePicPopup({edit}) {
    const upload=useRef(null);
    const[profilePic,setProfilePic]=useState();
    const[imgUrl,setimgUrl]=useState();
    const uploadPic=()=>{
        return upload.current.click();
    }
    const getPostDetails = () => {
        const data = new FormData();
        data.append("file", profilePic);
        data.append("upload_preset", "instagram-clone");
        data.append("cloud_name", "markus0509");
        fetch("https://api.cloudinary.com/v1_1/markus0509/image/upload", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setimgUrl(data.url);
            console.log(data.url);
          })
          .catch((err) => console.log(err));
      };
      const postProfileImage=(imgUrl)=>{
        fetch("/profilepic/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
           profilepic:imgUrl
          }),
        })
          .then((res) => res.json())
          .then((data) => {console.log(data);
            edit();
          window.location.reload();
          })
          .catch((err) => console.log(err));
      };

      useEffect(()=>{
        if(profilePic){
        getPostDetails();
        }
      },[profilePic])
      useEffect(()=>{
        if(imgUrl){
      postProfileImage(imgUrl);
        }
      
    }
      ,[imgUrl])
    
   

  return (
    <div className='ProfilePicUpdate'>
    <div className="profilepic_container">
    <button className='updateBtn' onClick={async()=>{uploadPic();
    }}>Update Profile Pic</button>
    <input type="file" accept='image/*' className='upload_profilepic' ref={upload} onChange={(e)=>setProfilePic(e.target.files[0])}/>
    <hr />
    <button className='removeBtn' onClick={()=>{
      postProfileImage(null);
    }}>Remove Profile Pic</button>
    <hr />
    <button onClick={()=>edit()}>Cancel</button>
    </div>
    </div>
  )
}

export default ProfilePicPopup