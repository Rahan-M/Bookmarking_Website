import SingleCard from './SingleCard'

interface folderType{
    name: string;
    count:number;
}

interface foldersProp{
    folders:folderType[];
}

const Cards: React.FC<foldersProp> = ({folders}) => {
  return (
    <div>
        {folders.map((folder)=>(
            <SingleCard folder={folder.name}/>
        ))}
    </div>
  )
}

export default Cards