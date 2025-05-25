import Navbar from "../components/navbar";
const RegisterUser=()=>{
    return(
        <>
            <Navbar/>
            <div className="flex flex-col items-center justify-center mt-5">
                <h1 className="text-5xl font-bold mt-4 text-blue-600 font-oswald">
                    Enter Details
                </h1>
                <div className="flex flex-col items-center justify-center h-[50vh] md:h-[60vh] w-[80vw] md:w-[40vw] border-4 rounded-3xl border-black mt-24 md:mt-12">
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                        Enter Name :
                        </label>
                        <input
                        type="text"
                        className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                        Enter Email :
                        </label>
                        <input
                        type="text"
                        className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <div className="nameInp flex my-5 md:my-3 flex-col items-start"> 
                        <label htmlFor="" className="name font-orbitron">
                        Enter Password :
                        </label>
                        <input
                        type="text"
                        className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                        <label htmlFor="" className="name font-orbitron">
                        Confirm Password :
                        </label>
                        <input
                        type="text"
                        className="border-2 border-gray-500 px-4 py-2 w-[70vw] md:w-96 mb-5"
                        />
                    </div>
                    <button className="p-2 bg-sky-300 m-8 rounded-lg w-52 font-archivo text-slate-100 text-2xl" >
                        Register
                    </button>
                </div>
            </div>
        </>
    )
}

export default RegisterUser;