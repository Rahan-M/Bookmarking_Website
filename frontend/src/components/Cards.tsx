import SingleCard from './SingleCard'
import { Link } from 'react-router-dom';
interface folderType{
    name: string;
    count:number;
}

interface foldersProp{
    folders:folderType[];
}

const Cards: React.FC<foldersProp> = ({folders}) => {
  return (
    <div className='flex mt-16'>
        {folders.map((folder)=>{
            const encodedFolder= encodeURIComponent(folder.name);
            return(
              <Link to={`/folders/${encodedFolder}`}>
                <SingleCard folder={folder.name}/>
              </Link>
            )
        })}
    </div>
  )
}

export default Cards