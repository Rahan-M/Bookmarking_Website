import React from 'react'
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Spinner from './spinner';
interface Props {
  bookMarq: {
    _id: string;
    name: string;
    link: string;
  };
  onDelete: (id: string) => void;  // Accept the function
}


const BookMarqCard: React.FC<Props> = ({bookMarq, onDelete}) => {
  const [showPopup,setShowPopup]=useState(false);
  const [loading,setLoading]=useState(false);
  const {enqueueSnackbar}=useSnackbar();
  const handleDelete= async()=>{
    setLoading(true);
    try{
      await axios.delete(`http://localhost:5000/api/bookmarks/${bookMarq._id}`);
      enqueueSnackbar("BookMarq Deleted Succesfully", { variant: "success" });
      onDelete(bookMarq._id);
    }
    catch(error){
      console.error("Error deleting bookmark:", error);
      enqueueSnackbar("An Error Occured. Try Again.", { variant: "error" });
    }
    finally{
      setShowPopup(false);
      setLoading(false);
    }
  }
  const deleteConfirmation=()=>{
    if(!showPopup) return null;
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        {loading && <div className='fixed inset-0 bg-black bg-opacity-50'><Spinner/></div>}
        <div className='bg-white h-[20vh] rounded-lg p-6 flex flex-col'>
          <p className='text-lg'>
              Are you sure you want to delete the bookmark <b>{bookMarq.name}</b>
          </p>
          <div className="buttons flex justify-around items-center mt-5">
            <button className='bg-red-500 text-white px-10 py-2 rounded-lg' onClick={()=>{
              handleDelete();
            }}>Yes</button>
            <button className='bg-gray-400 px-10 py-2 rounded-lg' onClick={()=>{
              setShowPopup(false);
            }}>No</button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <div className='border border-black flex flex-col justify-center items-center text-2xl h-[20vh] w-[20vw] p-6 m-10 rounded-md color bg-[#c2f1fc]'>
        <div className="icons flex justify-between w-[100%]">
          <MdDelete onClick={()=>{
            setShowPopup(true);
          }} className='cursor-pointer'/>
          <Link to={`/bookmarks/update/${bookMarq.name}`}>
            <FaEdit/>
          </Link>
        </div>
        <a href={bookMarq.link} target="_blank" rel="noopener noreferrer">
          <div className='text-center'>{bookMarq.name}</div>
        </a>
      </div>
      {deleteConfirmation()}
    </>
  )
}

export default BookMarqCard