import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import Spinner from './spinner';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdOutlineFolderDelete } from "react-icons/md";
import { useSnackbar } from 'notistack';
import { bookmarkApi, folderApi } from '../apis/apis';

interface Props{
  folder: {
    _id:string
    name: string;
  };
  onDelete: (id: string) => void;
}

interface bookMarqType{
  name: string;
  link:string;
  folder:string;
  _id:string;
}

interface apiResponse{ // Single element in the array
  data:bookMarqType[];
  success:boolean;
}

const SingleCard: React.FC<Props> = ({folder, onDelete}) => {
  const [bookMarks, setBookMarks]=useState<bookMarqType[]>([]);
  const [loading, setLoading]=useState(false);
  const [loading2, setLoading2]=useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const encodedFolder= encodeURIComponent(folder.name);
  const [showPopup, setShowPopup] = useState(false);
  const {enqueueSnackbar}=useSnackbar();

  useEffect(()=>{
    setLoading(true);
    bookmarkApi.get<apiResponse>(`/folders/${encodedFolder}`)
    .then((res)=>{
      const allBookmarks = res.data.data;
      setBookMarks(allBookmarks);
      setVisibleCount(allBookmarks.length)
      setLoading(false);
    }).catch((err)=>{
      console.error(err);
      setLoading(false);
    });
  },[]);

  const maindivRef=useRef<HTMLDivElement>(null);
  const titledivRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const height=maindivRef.current?.clientHeight;
    const titleHeight=titledivRef.current?.clientHeight;
    if(!height || !titleHeight) return;
    const availableHeight=height-titleHeight;
    const itemHeight=36;
    setVisibleCount(Math.floor(availableHeight/itemHeight));
  },[bookMarks])

  const handleDelete= async()=>{
    setLoading2(true);
    try{
      await folderApi.delete(`/${folder._id}`);
      enqueueSnackbar("Folder Deleted Succesfully", { variant: "success" });
      onDelete(folder._id);
    }
    catch(error){
      console.error("Error deleting Folder:", error);
      enqueueSnackbar("An Error Occured. Try Again.", { variant: "error" });
    }
    finally{
      setShowPopup(false);
      setLoading2(false);
    }
  }

  const deleteConfirmation=()=>{
    if(!showPopup) return null;
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        {loading2 && <div className='fixed inset-0 bg-black bg-opacity-50'><Spinner/></div>}
        <div className='bg-white h-[20vh] rounded-lg p-6 flex flex-col'>
          <p className='text-lg'>
              Are you sure you want to delete the bookmark <b>{folder.name}</b>
          </p>
          <div className="buttons flex justify-around items-center mt-5">
            <button disabled={loading2} className='bg-red-500 text-white px-10 py-2 rounded-lg' onClick={()=>{
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
    <div ref={maindivRef} className='border w-[25vw] h-[25vh] border-black rounded-md m-5 p-3 bg-[#c2f1fc]'>
      <div className='relative bottom-[17rem]'>
        {loading && <Spinner/>}
      </div>
      <div ref={titledivRef} className='title flex justify-between items-center mb-3'>
        <Link to={`/folders/${encodedFolder}`}>
          <h1 className='text-3xl text-center'>{folder.name}</h1>
        </Link>
        <div className="icons flex items-center">
          <MdOutlineFolderDelete className="mr-4 text-3xl cursor-pointer" onClick={()=>{
            setShowPopup(true);
          }}/>
          <Link to={`/folders/rename/${folder.name}`}>
            <FaEdit className='text-2xl cursor-pointer'/>
          </Link>
        </div>
      </div>
      <div  >
        <ul className="list">
          {bookMarks.slice(0, visibleCount).map((bookMark, index)=>( // If this bracket was curly then we'll have to return explicitly
            <li key={index} className='text-xl mb-2'>{bookMark.name}</li>
          ))}
        </ul>
      </div>
      {deleteConfirmation()}
    </div>
  )
}

export default SingleCard