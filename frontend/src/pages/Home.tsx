import Navbar from '../components/Navbar';
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
        <Navbar/>
        <div className="icons">
            <Link to="/folders/create">
                <MdOutlineCreateNewFolder className='absolute right-0 mr-4 mt-2 text-5xl text-blue-500'/>
            </Link>
        </div>
    </>
  )
}

export default Home