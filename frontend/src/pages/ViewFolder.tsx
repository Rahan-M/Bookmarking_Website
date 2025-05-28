import Navbar from '../components/navbar'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import BookMarqCard from '../components/BookMarqCard';
import { bookmarkApi } from '../apis/apis';
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
    bookmarkApi
    .get<apiResponse>(
        `/folders/${name}`)
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
  const handleUpdate = (id: string, updatedData: bookMarqType) => {
    setBookmarks((prevBMs) =>
      prevBMs.map((bm) => (bm._id === id ? { ...bm, ...updatedData } : bm))
    );
  };
  return (
    <>
        <Navbar/>
        {loading && <Spinner/>}
        <div className="cards flex flex-wrap justify-start mx-auto max-w-[90%]">
            {
                bookmarks.map((bookmark)=>(
                  <BookMarqCard 
                  key={bookmark._id} 
                  bookMarq={bookmark} 
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
                ))
            }
        </div>
    </>
  )
}

export default ViewFolder