import { useState, useContext } from "react";
import Navbar from "../components/navbar";
import Spinner from "../components/spinner";
import { useSnackbar } from "notistack";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterUser=()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password1, setPassword1]=useState("");
    const [password2, setPassword2]=useState("");
    const [loading, setLoading]=useState(false);
    
    const {enqueueSnackbar}= useSnackbar();
    const navigate=useNavigate();
    const {login}=useContext(AuthContext);

    const registerUserFxn=async ()=>{
        if(password1!=password2){
            enqueueSnackbar("Passwords Don't Match", { variant: "error" });
            return null;
        }

        const data={
            name,
            email,
            password:password1
        }
        setLoading(true);
        try{
            const res=await axios.post("http://localhost:5000/api/users", data);
            const {token, user}=res.data.data; // This caused me so much trouble oh lord
            login(user, token);
            enqueueSnackbar("Registered Succesfully", { variant: "success" });
            navigate('/');
        }catch (err){
            console.error("Error whilst registering", err);
            enqueueSnackbar("Registeration Failed, Try Again", { variant: "error" });
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
            <Navbar/>
            <div className="flex flex-col items-center justify-center mt-5">
                <h1 className="text-5xl font-bold mt-4 text-blue-600 font-oswald">
                    Enter Details
                </h1>
                {loading && <Spinner/>}
                <div className="flex flex-col items-center justify-center h-[50vh] md:h-[60vh] w-[80vw] md:w-[40vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                            Enter Name :
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                            Enter Email :
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                            Enter Password :
                        </label>
                        <input
                            type="password"
                            value={password1}
                            onChange={(e)=>setPassword1(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                        <label htmlFor="" className="name font-orbitron">
                            Confirm Password :
                        </label>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e)=>setPassword2(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <button className="p-2 bg-sky-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl" onClick={registerUserFxn} >
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}

export default RegisterUser;