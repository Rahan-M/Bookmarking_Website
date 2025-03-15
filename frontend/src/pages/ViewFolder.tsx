import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import BookMarqCard from '../components/BookMarqCard';
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

const ViewFolder = () => {
  const { name } = useParams();
  const[bookmarks, setBookmarks]=useState<bookMarqType[]>([]);
  const [loading, setLoading]=useState(false);
  useEffect(() => {
    if(!name){
      console.log("Returned\n");
      return;
    } 
    setLoading(true);
    axios
    .get<apiResponse>(
        `http://localhost:5000/api/bookmarks/folders/${name}`)
        .then((res) => {
          const allBookmarks = res.data.data;
          setLoading(false);
          setBookmarks(allBookmarks);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
      }, [name]);
  const handleDelete=(id:string)=>{
    setBookmarks((prevBMs)=> prevBMs.filter((bm) => bm._id!==id));
  }
  return (
    <>
        <Navbar/>
        {loading && <Spinner/>}
        <div className="cards flex">
            {
                bookmarks.map((bookmark)=>(
                  <BookMarqCard 
                  key={bookmark._id} 
                  bookMarq={bookmark} 
                  onDelete={handleDelete}
                />
                ))
            }
        </div>
    </>
  )
}

export default ViewFolder