import React from 'react'
import './Search.css'
import Navbar from '../SideNav/Navbar'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import PendingIcon from '@mui/icons-material/Pending';
function Search() {
  return (
    <div className='Search'>
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
  <div className="search_coming_soon">
<PendingIcon/>
  <h2>Oops! This section is currently under development!</h2>
  <br />
  <p>It will be live soon. Till then you can explore the other sections as well !</p>
  <br />
  <Link to='/'><p className='explore_home_page'>Explore the Home Page</p></Link>
  </div>
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

export default Search