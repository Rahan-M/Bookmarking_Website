import axios, { all } from 'axios'
import { useEffect, useState, useRef } from 'react'
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
  const [visibleCount, setVisibleCount] = useState(0);
  const encodedFolder= encodeURIComponent(folder);
  useEffect(()=>{
    setLoading(true);
    axios.get<apiResponse>(`http://localhost:5000/api/bookmarks/folders/${encodedFolder}`)
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
  return (
    <div ref={maindivRef} className='border w-[25vw] h-[25vh] border-black rounded-md m-5 p-3 bg-[#c2f1fc]'>
      <div className='relative bottom-[17rem]'>
        {loading && <Spinner/>}
      </div>
      <div ref={titledivRef} className='title flex justify-between items-center mb-3'>
        <h1 className='text-3xl text-center'>{folder}</h1>
        <Link to={`/folders/rename/${folder}`}>
          <FaEdit className='text-2xl'/>
        </Link>
      </div>
      <div  >
        <ul className="list">
          {bookMarks.slice(0, visibleCount).map((bookMark, index)=>( // If this bracket was curly then we'll have to return explicitly
            <li key={index} className='text-xl mb-2'>{bookMark.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SingleCard