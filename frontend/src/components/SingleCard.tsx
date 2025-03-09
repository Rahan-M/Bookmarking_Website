import axios from 'axios'
import { useEffect, useState } from 'react'
import Spinner from './spinner';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

interface folderProps{
  folder: string;
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

const SingleCard = ({folder}:folderProps) => {
  const [bookMarks, setBookMarks]=useState<bookMarqType[]>([]);
  const [loading, setLoading]=useState(false);
  const encodedFolder= encodeURIComponent(folder);
  useEffect(()=>{
    setLoading(true);
    axios.get<apiResponse>(`http://localhost:5000/api/bookmarks/folders/${encodedFolder}`)
    .then((res)=>{
      const allBookmarks = res.data.data;
      setBookMarks(allBookmarks);
      setLoading(false);
    }).catch((err)=>{
      console.error(err);
      setLoading(false);
    });
  },[]);

  return (
    <div className='border w-[25vw] h-[25vh] border-black rounded-md m-5 p-3 bg-[#FFFFC7]'>
      {loading && <Spinner />}
      <div className='title flex justify-between items-center mb-3'>
        <h1 className='text-3xl text-center'>{folder}</h1>
        <Link to={`/folders/rename/${encodedFolder}`}>
          <FaEdit className='text-2xl'/>
        </Link>
      </div>
      <ul className="list">
        {bookMarks.map((bookMark, index)=>( // If this bracket was curly then we'll have to return explicitly
          <li key={index} className='text-xl mb-2'>{bookMark.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleCard