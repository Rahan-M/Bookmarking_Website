import Navbar from "../components/navbar";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import Spinner from "../components/spinner";
import SingleCard from "../components/SingleCard";
interface folderType{
  _id:string;
  name: string;
  count:number;
}

interface apiResponse{ // Single element in the array
  data:folderType[];
  success:boolean;
}

const Home = () => {
  const [folders, setFolders] = useState<folderType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get<apiResponse>(
        `http://localhost:5000/api/folders`
      )
      .then((res) => {
        const allFolders = res.data.data;
        setFolders(allFolders);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete=(id:string)=>{
    setFolders((prevFLDs)=> prevFLDs.filter((fld) => fld._id!==id));
  }

  return (
    <div>
      <Navbar />
      <div className="icons">
        <Link to="/folders/create">
          <MdOutlineCreateNewFolder className="absolute right-0 mr-4 mt-2 text-5xl text-blue-500" />
        </Link>
      </div>
      {loading && <Spinner />}
      <div className='flex  flex-wrap mt-16 mx-auto max-w-[85%]'>
        {folders.map((folder)=>{
            return(
                <SingleCard onDelete={handleDelete} folder={folder}/>
            )
        })}
      </div>
    </div>
  );

};

export default Home;
