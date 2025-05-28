import Navbar from "../components/navbar";
import Spinner from "../components/spinner";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

//  Data Format Json {name, link, folder}
const CreateFolder = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [folder, setFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {token, loggedIn}=useContext(AuthContext);

  useEffect(()=>{
    if(!loggedIn){
      enqueueSnackbar("You Must Login to Save Bookmarks", {variant:'info'});
      navigate('/login');
    } 
  },[])

  const saveBookMark =async () => {
    if(!(name&&link&&folder)){
      enqueueSnackbar("Fill all fields", {variant:'info'});
    }
    const data = {
      name,
      link,
      folder,
    };
    setLoading(true);
    
    try{
      const res=await axios.post('http://localhost:5000/api/bookmarks', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if(res.data.success){
        enqueueSnackbar("BookMarq Created Succesfully", { variant: "success" });
        navigate("/");
      }else{
        const errtype=res.data.code;
        if(errtype==0 || errtype==1){
          enqueueSnackbar("Your Session has Expired please log back in");
          navigate("/login");
        }
        else{
          throw new Error(res.data.msg)
        }
      }
    }catch (err){
      enqueueSnackbar("An Error Occured", { variant: "error" });
      console.log(err);
    }finally{
      setLoading(false);
    }

  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mt-4 text-blue-600 font-oswald">
          Create Bookmark
        </h1>
        {loading && <Spinner />}
        <div className="flex flex-col items-center justify-center h-[50vh] md:h-[60vh] w-[80vw] md:w-[40vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
          <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
            <label htmlFor="" className="name font-orbitron">
              Enter Name :
            </label>
            <input
              type="text"
              value={name}
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
              onChange={(e) => setFolder(e.target.value)}
              className="border-2 border-gray-500 px-2 md:px-4 py-2 w-[70vw] md:w-96"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl" onClick={saveBookMark}>
          marqIt!
        </button>
        </div>
      </div>
    </>
  );
};

export default CreateFolder;
