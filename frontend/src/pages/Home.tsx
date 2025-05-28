import Navbar from "../components/navbar";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import Spinner from "../components/spinner";
import SingleCard from "../components/SingleCard";
import { AuthContext } from "../context/AuthContext";
import { enqueueSnackbar } from "notistack";

interface folderType{
  _id:string;
  name: string;
  count:number;
}


const Home = () => {
  const [folders, setFolders] = useState<folderType[]>([]);
  const [foldersExist, setFoldersExist] = useState(false);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const {user, token, loggedIn, loadingAuth, logout}=useContext(AuthContext);
  
  useEffect(() => {
    const fetchData=async()=>{
      if(loadingAuth) return;
      
      if(!loggedIn){
        console.log(loggedIn);
        if(user)
          console.log(user.name);
        navigate('/login');
        return;
      }
      
      setLoading(true);
      setFoldersExist(false);
      
      try{
        const res=await axios.get("http://localhost:5000/api/folders",{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        if(res.data.success){
          const allFolders = res.data.data;
          if(allFolders && allFolders.length>0){
            setFoldersExist(true);
            console.log(allFolders);
            console.log(allFolders.length);
          } 
          setFolders(allFolders);
        }else{
          setFoldersExist(false);
          const errtype=res.data.code;
          if(errtype==0){
            enqueueSnackbar("No authorization header present");
          }else if(errtype==1){
            logout();
            navigate("/login");
            console.log(errtype);
            enqueueSnackbar("Your Session Has Expired");
          }else{
            throw new Error(res.data.msg);
          }
        }
      }catch(err){
        enqueueSnackbar("An Error Occured", { variant: "error" });
        console.error(err);
      }finally{
        setLoading(false);
      }
    }
     
    fetchData();
  }, [loggedIn, loadingAuth]);

  const handleDelete=(id:string)=>{
    setFolders((prevFLDs)=> prevFLDs.filter((fld) => fld._id!==id)); // Using functional form of set folders
  }

  const createBookmarksPrompt=()=>{
    return(
      <div className="fixed left-[50vw] -translate-x-1/2 right-[50vw] flex flex-col items-center justify-center h-[50vh] md:h-[30vh] w-[80vw] md:w-[30vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
        <h1 className="text-2xl text-center">You don't have any bookmarks yet<br/>Create some for them to popup</h1>
        <Link to="/folders/create">
          <button className="p-2 bg-sky-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl" >
              Create
          </button>
        </Link>
      </div>
    )
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
                <SingleCard key={folder._id} onDelete={handleDelete} folder={folder}/>
            )
        })}
      </div>
        {!foldersExist && createBookmarksPrompt()}
    </div>
  );

};

export default Home;
