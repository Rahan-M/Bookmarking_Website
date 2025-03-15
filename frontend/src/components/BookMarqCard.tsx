import React from 'react'
import { Link } from 'react-router-dom';
interface bookMarqType{
    name: string;
    link:string;
    folder:string;
    _id:string;
  }

interface props{
    bookMarq:bookMarqType;
}

const BookMarqCard: React.FC<props> = ({bookMarq}) => {
  return (
    <>
        <Link to={bookMarq.link}>
            <div className='border border-black flex justify-center items-center text-2xl h-[20vh] w-[20vw] p-6 m-10 rounded-md color bg-[#c2f1fc]'>
                <div>{bookMarq.name}</div>
            </div>
        </Link>
    </>
  )
}

export default BookMarqCard