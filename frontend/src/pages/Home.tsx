import Navbar from "../components/navbar";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import Spinner from "../components/spinner";
import SingleCard from "../components/SingleCard";

import { AuthContext } from "../context/AuthContext";

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
  const [name, setName]=useState("");
  const [folders, setFolders] = useState<folderType[]>([]);
  const [loading, setLoading] = useState(false);
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  
  
  useEffect(() => {
    if(!user){
      navigate('/login');
    }
    if(user){
      setName(user.name);
      console.log("name set to ", user.name);
    }
    const fetchData=async()=>{
      setLoading(true);
      try{
        const res=await axios
        .get<apiResponse>(
          `http://localhost:5000/api/folders`
        ) 
        const allFolders = res.data.data;
        setFolders(allFolders);
      }catch(err){
        console.error(err);
      }finally{
        setLoading(false);
      }
    }
     
    fetchData();
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
      {name && <h1>Hello {name}</h1>}
    </div>
  );

};

export default Home;
