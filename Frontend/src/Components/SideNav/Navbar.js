import React from "react";
import "./Navbar.css";
import Logo from '../../assets/logo.png'
import HomeIcon from '@mui/icons-material/Home';
import SideRoutes from "./SideRoutes";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
function Navbar() {
  const navigate=useNavigate();
  const Logout=()=>{
    if(window.confirm('Do you wish to logout?')){
    localStorage.clear();
    navigate('/login');
    }
  }
  return (
    <div className="SideNav">
      <div className="app_logo">
      <Link to='/'><img src={Logo} alt="" /></Link>
      </div>
      <div className="nav_routes">
     <Link to='/'><SideRoutes Icon={HomeIcon} name="Home"/></Link>
<Link to='/search'><SideRoutes Icon={SearchIcon} name="Search"/></Link>
  {/*<Link to='/myfollowing'><SideRoutes Icon={ExploreIcon} name="Explore"/></Link>*/}
     <Link to='/myfollowing'><SideRoutes Icon={SwitchAccountOutlinedIcon} name="My Following"/></Link>
    {/* <SideRoutes Icon={SendIcon} name="Messages"/>*/}
     <Link to='/createposts'><SideRoutes Icon={AddBoxIcon} name="Create"/></Link>
     <Link to='/profile'><SideRoutes Icon={PersonIcon} name="Profile"/></Link>
     <div onClick={Logout}><SideRoutes Icon={LogoutIcon} name="Logout"/></div>
     <div>


</div>
      </div>
    </div>
  );
}

export default Navbar;
