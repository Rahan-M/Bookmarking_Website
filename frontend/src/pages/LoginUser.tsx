import { useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Navbar from "../components/navbar";
import Spinner from "../components/spinner";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginUser=()=>{
    const [email, setEmail]=useState("");
    const [loading, setLoading]=useState(false);
    const [password, setPassword]=useState("");
    const {enqueueSnackbar}=useSnackbar();
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();

    const loginUserFxn=async()=>{
        if(!(email && password)){
            enqueueSnackbar("Please Fill All Fields", { variant: "error" });
            return;
        }
        const data={
            email,
            password
        }
        setLoading(true);
        try{
            const res=await axios.post("http://localhost:5000/api/users/login", data);

            if(res.data.success==true){
                const {token, user}=res.data.data; 
                login(user, token);
                enqueueSnackbar("Logged in Succesfully", { variant: "success" });
                navigate('/');
            }else{
                const errorType=res.data.code;
                if(errorType==0){
                    enqueueSnackbar("Please fill all fields", { variant: "error" });
                }else if(errorType==1){
                    enqueueSnackbar("Incorrect password fields", { variant: "error" });
                }else if(errorType==2){
                    enqueueSnackbar("No account with this email was found", { variant: "error" });
                }
            }
        }catch (err){
            console.error("Error whilst logging in", err);
            enqueueSnackbar("Logging in Failed, Try Again", { variant: "error" });
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
            <Navbar/>
            <div className="flex flex-col items-center justify-center mt-5">
                <h1 className="text-5xl font-bold mt-4 text-blue-600 font-oswald">
                    Sign In
                </h1>
                {loading && <Spinner/>}
                <div className="flex flex-col items-center justify-center h-[50vh] md:h-[60vh] w-[80vw] md:w-[40vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                            Enter Email :
                        </label>
                        <input
                        type="text"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                            Enter Password :
                        </label>
                        <input
                        type="password"
                        value={password} // specifies initial value
                        onChange={(e)=> setPassword(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <h2>Don't have an account? <a className="text-blue-500" href="/login">Sign Up</a></h2>
                    <button className="p-2 bg-sky-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl" onClick={loginUserFxn}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default LoginUser;