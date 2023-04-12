import React, { useState, useEffect, useRef } from "react";
import Navbar from "../SideNav/Navbar";
import "./CreatePosts.css";
import Logo from '../../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
// import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
function CreatePosts() {
  const addPic=useRef();
  const navigator=useNavigate();
  const [captions, setCaptions] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createPosts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body: captions,
          pics: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {console.log(data);
        navigator('/');
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const getPostDetails = () => {
    console.log(captions, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "markus0509");
    fetch("https://api.cloudinary.com/v1_1/markus0509/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };
  const loadFile = (e) => {
    let output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <div className="createPosts">
      <Navbar />
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
      <div className="createPostsCard">
        <div className="createPostsHeader">
          <h1>Create a new post</h1>
          <button onClick={getPostDetails}>Create</button>
        </div>
        <div className="create">
          <img
            src="https://img.icons8.com/sf-black-filled/256/image.png"
            id="output"
            alt="no preview"
            onClick={()=>addPic.current.click()}
          />
          <br />
          <input
          ref={addPic}
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={(e) => {
              loadFile(e);
              setImage(e.target.files[0]);
            }}
          
          />
        </div>
        <div className="add_captions">
          <textarea
            name=""
            id=""
            cols="110"
            rows="5"
            placeholder="Enter the caption..."
            onChange={(e) => setCaptions(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="responsive_navfooter">
      <Link to='/'><HomeIcon/></Link>
      <Link to='/myfollowing'><SwitchAccountOutlinedIcon/></Link>
      <Link to='/createposts'><AddBoxIcon/></Link>
      <Link to='/search'><SearchIcon/></Link>
      <Link to='/profile'><PersonIcon/></Link>
      </div>
    </div>
  );
}

export default CreatePosts;
