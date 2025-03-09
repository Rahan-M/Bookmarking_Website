import axios from 'axios'
import { useEffect, useState } from 'react'
import Spinner from './spinner';

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
    <div className='border'>
      {loading && <Spinner />}
      <h2>{folder}</h2>
      <ul className="list">
        {bookMarks.map((bookMark, index)=>( // If this bracket was curly then we'll have to return explicitly
          <li key={index}>{bookMark.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleCard