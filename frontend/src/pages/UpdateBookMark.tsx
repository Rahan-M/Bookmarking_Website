import { useParams } from 'react-router-dom'

const UpdateBookMark = () => {
  const {name}=useParams();
  return (
    <div>{name}</div>
  )
}

export default UpdateBookMark