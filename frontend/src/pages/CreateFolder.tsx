import Navbar from '../components/Navbar'
import Spinner from '../components/spinner';
import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSnackbar} from "notistack";

//  Data Format Json {name, link, folder}
const CreateFolder = () => {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [folder, setFolder] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const saveBookMark=()=>{
        const data={
            name,
            link,
            folder
        };
        setLoading(true);
        axios
        .post("http:localhost:5000/api/bookmarks",data)
        .then(()=>{
            setLoading(false);
            enqueueSnackbar("Book Created Succesfully", { variant: "success" });
            navigate("/");
        })
        .catch((err)=>{
            setLoading(false);
            enqueueSnackbar("An Error Occured", { variant: "error" });
            console.log(err);
        });
    };
    return (
    <>
        <Navbar/>
        <div className="container flex flex-col items-center">
            <h1 className='text-5xl font-bold mt-4 text-blue-600 font-oswald'>Create Book</h1>
            {loading? <Spinner/>:""}
            <div className='flex flex-col items-center h-[70vh] w-[45vw] border-4 border-black my-10'>
                <div className="nameInp">
                    <label htmlFor="" className="name">Enter Name</label>
                </div>
            </div>
        </div>
    </>
    )
}

export default CreateFolder