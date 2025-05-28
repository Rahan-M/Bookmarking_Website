import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Spinner from './spinner';
import { bookmarkApi } from '../apis/apis';
interface Props {
  bookMarq: {
    _id: string;
    name: string;
    link: string;
    folder: string;
  };
  onDelete: (id: string) => void;  // Accept the function
  onUpdate: (id: string, updatedData: {_id: string, name: string; link: string; folder: string }) => void;
}


const BookMarqCard: React.FC<Props> = ({bookMarq, onDelete, onUpdate}) => {
  const [showPopup,setShowPopup]=useState(false);
  const [updPopup,setUpdPopup]=useState(false);
  const [loading1,setLoading1]=useState(false);
  const [loading2,setLoading2]=useState(false);
  const {enqueueSnackbar}=useSnackbar();

  const handleDelete= async()=>{
    setLoading1(true);
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
      setLoading1(false);
    }
  }
  const deleteConfirmation=()=>{
    if(!showPopup) return null;
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        {loading1 && <div className='fixed inset-0 bg-black bg-opacity-50'><Spinner/></div>}
        <div className='bg-white h-[20vh] rounded-lg p-6 flex flex-col'>
          <p className='text-lg'>
              Are you sure you want to delete the bookmark <b>{bookMarq.name}</b>
          </p>
          <div className="buttons flex justify-around items-center mt-5">
            <button disabled={loading1} className='bg-red-500 text-white px-10 py-2 rounded-lg' onClick={()=>{
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

  const [name, setName]=useState(bookMarq.name);
  const [link, setLink]=useState(bookMarq.link);
  const [folder, setFolder]=useState(bookMarq.folder);

  const handleUpdate= async ()=>{
    if(name==bookMarq.name && link==bookMarq.link &&  folder==bookMarq.folder){
      setUpdPopup(false);
      enqueueSnackbar("No Changes Made", {variant : "info"});
      return;
    }
    const data={
      _id:bookMarq._id,
      name,
      link,
      folder
    }
    try{
      setLoading2(true);
      await bookmarkApi.put(`/${bookMarq._id}`, data);
      enqueueSnackbar("Bookmark Updated Succesfully", {variant : "success"});
      onUpdate(bookMarq._id, data);
    }
    catch(err){
      console.error("Error during updation caught", err)
      enqueueSnackbar("Some Error Occured", {variant : "error"});
    }
    finally{
      setLoading2(false);
      setUpdPopup(false);
    }
  }
  const updateForm=()=>{
    if(!updPopup) return null;
    return(
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        {loading2 && <div className='fixed inset-0 bg-black bg-opacity-50'><Spinner/></div>}
        <div className="flex flex-col bg-white items-center justify-center h-[50vh] md:h-[60vh] w-[80vw] md:w-[40vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
          <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
            <label htmlFor="" className="name font-orbitron">
              Enter Name :
            </label>
            <input
              type="text"
              value={name}
              placeholder={bookMarq.name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
              />
          </div>
          <div className="linkInp flex flex-col items-start mb-5"> 
            <label htmlFor="" className="name font-orbitron">
              Enter the website link :
            </label>
            <input
              type="text"
              value={link}
              placeholder={bookMarq.link}
              onChange={(e) => setLink(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96"
              />
          </div>
          <div className="folderInp flex mt-5 mb:mt-3 flex-col items-start"> 
            <label htmlFor="" className="name font-orbitron">
              Enter folder name :
            </label>
            <input
              type="text"
              value={folder}
              placeholder={bookMarq.folder}
              onChange={(e) => setFolder(e.target.value)}
              className="border-2 border-gray-500 px-2 md:px-4 py-2 w-[70vw] md:w-96"
            />
          </div>
          <div className="buttons">
          <button disabled={loading2} className="p-2 bg-sky-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl" onClick={handleUpdate}>
            Update It!
          </button>
          <button className='p-2 bg-red-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl' onClick={()=>{
            setUpdPopup(false);
          }}>Cancel</button>
          </div>
      </div>
    </div>
    )
  }
  
  return (
    <>
      <div className='border border-black flex flex-col justify-between items-center text-2xl h-[15vh] w-[17vw] p-6 m-10 rounded-md color bg-[#c2f1fc]'>
        <div className="icons flex justify-between w-[100%]">
          <MdDelete onClick={()=>{
            setShowPopup(true);
          }} className='cursor-pointer'/>
          <FaEdit onClick={()=>{
            setUpdPopup(true);
          }} className='cursor-pointer'/>
        </div>
        <a href={bookMarq.link} target="_blank" rel="noopener noreferrer">
          <div className='text-center pb-6'>{bookMarq.name}</div>
        </a>
      </div>
      {deleteConfirmation()}
      {updateForm()}
    </>
  )
}

export default BookMarqCard