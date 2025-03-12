import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';

const RenameFolder = () => {
  const { name } = useParams();
  const [Id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/api/folders/folderId`,{
          newName:name
        })
      .then((res) => {
        const id = res.data.data;
        setId(id);
        console.log(id);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      <Navbar/>
      {loading && <Spinner/>}
      {Id}
    </>
  )
}

export default RenameFolder