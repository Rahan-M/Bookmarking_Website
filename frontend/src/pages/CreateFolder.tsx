import Navbar from "../components/Navbar";
import Spinner from "../components/spinner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

//  Data Format Json {name, link, folder}
const CreateFolder = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [folder, setFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const saveBookMark = () => {
    const data = {
      name,
      link,
      folder,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/bookmarks", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("BookMarq Created Succesfully", { variant: "success" });
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
      <Navbar />
      <div className="container flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mt-4 text-blue-600 font-oswald">
          Create Book
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
