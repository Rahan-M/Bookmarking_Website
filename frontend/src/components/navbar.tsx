import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { IoIosArrowDropdown } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import Spinner from "./spinner";

const Navbar = () => {
  const [showDropDown, setShowDropDown]=useState(false);
  const [loading, setLoading]=useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation]=useState(false);
  const [option2, setOption2]=useState(false);
  const [name, setName]=useState("");
  const [dropDownPos, setDropDownPos]=useState({left:0, top:0});

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const {user, loggedIn, loadingAuth, token, logout}=useContext(AuthContext);
  const navigate=useNavigate();
  const {enqueueSnackbar} =useSnackbar();

  useEffect(()=>{ 
    /* 
      We define event listeners and event handlers inside useEffect
      Even though the useEffect function itself runs only once, 
      the event listener you set up inside it persists until you 
      explicitly remove it (or the component unmounts and the cleanup 
      function runs)
    */
    if(loggedIn && user){
      setOption2(true);
      setName(user.name);
    }


    if(profileRef.current){
      const rect=profileRef.current.getBoundingClientRect();
      setDropDownPos({left:rect.left-170, top:rect.bottom-10});
    }

    const handleOutsideClick=(event: MouseEvent)=>{
      if(event.target instanceof Node &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      )
        setShowDropDown(false);
    }

    document.addEventListener("mousedown",handleOutsideClick);
    // click = mousedown + mouseup

    return ()=>{ // Return function runs when component unmounts or when effect is rerun 
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  },[loadingAuth])

  const handleLogout=()=>{
    logout();
    navigate('/login')
  }

  const AccountDropDownOption1=()=>{
    if(!showDropDown) return null;
    return (
      <div 
        ref={dropdownRef} 
        className="bg-slate-300 w-[15rem] z-10 text-center border border-solid border-black rounded-md"
        style={{
          position:"fixed",
          left:`${dropDownPos.left}px`,
          top:`${dropDownPos.top}px`
        }}
        >
        <div className="menu">
          <div className="border-b border-dashed border-black">
            <Link to="/register">
              <h1 className="h-[2rem] mt-2 ">Register</h1>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <h1 className="h-[2rem] mt-2">Login</h1>
            </Link>
          </div>
        </div>
      </div>
    )
  }  
  const AccountDropDownOption2=()=>{
    if(!showDropDown) return null;
    return (
      <div 
        ref={dropdownRef} 
        className="bg-slate-300 w-[15rem] z-10 text-center border border-solid border-black rounded-md"
        style={{
          position:"fixed",
          left:`${dropDownPos.left}px`,
          top:`${dropDownPos.top}px`
        }}
        >
        <div className="menu">
          <div className="border-b border-dashed border-black">
              <h1 className="h-[2rem] mt-2 ">Signed in as {name}</h1>
          </div>
          <div>
              <h1 className="h-[2rem] mt-2 cursor-pointer border-b border-dashed border-black" onClick={handleLogout}>Logout</h1>
          </div>
          <div>
              <h1 className="h-[2rem] mt-2 cursor-pointer" onClick={()=>{setShowDeleteConfirmation(true)}}>Delete Account</h1>
          </div>
        </div>
      </div>
    )
  }

  const handleDelete= async()=>{
    setLoading(true);
    try{
      const res=await axios.delete('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.success){
        logout();
        navigate("/register");
        enqueueSnackbar("Account Deleted Succesfully", { variant: "success" });
      }else if(res.data.code==0 || res.data.code==1){
        logout();
        navigate("/login");
        enqueueSnackbar("Your Session Expired, Please login again to delete your account", { variant: "info" });
      }
    }
    catch(error){
      console.error("Error deleting User:", error);
      enqueueSnackbar("An Error Occured. Try Again.", { variant: "error" });
    }
    finally{
      setShowDeleteConfirmation(false);
      setLoading(false);
    }
  }

  const deleteConfirmationPopup=()=>{
    return (
      <div className='fixed z-10 inset-0 bg-black bg-opacity-70 flex justify-center items-center'>
        {loading && <div className='fixed inset-0 bg-black bg-opacity-50'><Spinner/></div>}
        <div className='bg-white h-[20vh] rounded-lg p-6 flex flex-col'>
          <p className='text-lg'>
              Are you sure you want to delete this Account, <b>{name}?</b>
          </p>
          <div className="buttons flex justify-around items-center mt-5">
            <button disabled={loading} className='bg-red-500 text-white px-10 py-2 rounded-lg' onClick={()=>{
              handleDelete();
            }}>Yes</button>
            <button className='bg-gray-400 px-10 py-2 rounded-lg' onClick={()=>{
              setShowDeleteConfirmation(false);
            }}>No</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 flex justify-between h-14 items-center">
      <GiHamburgerMenu color="white" className="pl-3 text-5xl md:pl-5 md:text-6xl" />
      <Link to='/'>
        <div className="flex items-center">
          <img src={logo} className="h-[6rem] pt-1"></img>
          <h1 className="font-bold text-3xl pb-2 text-white md:text-4xl">BookMarq</h1>
        </div>
      </Link>
      <div ref={profileRef} className="flex items-center pr-3  md:pr-5 cursor-pointer" onClick={()=>{setShowDropDown(true)}} >
        <FaUserCircle className="text-5xl md:text-5xl" color="white"/>
        <IoIosArrowDropdown className="text-2xl ml-2" color="white"/>
      </div>
    </div>
    {!option2 && AccountDropDownOption1()}
    {option2 && AccountDropDownOption2()}
    {showDeleteConfirmation && deleteConfirmationPopup()}
    </>
  );
};

export default Navbar;
