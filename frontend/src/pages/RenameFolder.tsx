import Navbar from '../components/navbar'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';
import { useSnackbar } from 'notistack';
const RenameFolder = () => {
  const { name } = useParams();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(!name){
      console.log("Returned\n");
      return;
    } 
    const decodedName=decodeURIComponent(name);
    setLoading(true);
    axios
    .post(
        `http://localhost:5000/api/folders/folderId`,{ name:decodedName })
        .then((res) => {
          const idtemp = res.data.data;
          setLoading(false);
          setId(idtemp);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
      }, [name]);
      
  const [newName, setNewName] = useState("");
  const {enqueueSnackbar}=useSnackbar();
  const navigate=useNavigate();
  const renameFolder = () => {
    const data = {
      newName,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/folders/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("BookMarq Renamed Succesfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("An Error Occured", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <>
      <Navbar/>
      <div className="container flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mt-4 text-blue-600 font-oswald">
          Rename Folder
        </h1>
        {loading && <Spinner/>}
        <div className="flex flex-col items-center justify-center h-[50vh] md:h-[40vh] w-[80vw] md:w-[40vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
          <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
            <label htmlFor="" className="name font-orbitron">
              Enter Name :
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
            />
            <button className="p-2 bg-sky-300 ml-[5rem] rounded-lg w-52 font-archivo text-slate-100 text-2xl" onClick={renameFolder}>
              marqIt!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RenameFolder