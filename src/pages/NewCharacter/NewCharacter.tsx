import { Link } from 'react-router-dom'
import CharacterForm from './components/CharacterForm';
import Button from '../../common/Button';
import { FaArrowLeft } from 'react-icons/fa';

const NewCharacter = () => {

  return (
    <>
      <div className="flex flex-col space-x-10 items-start md:flex-row">
        <Link to="/home">
          <Button className="my-1"><FaArrowLeft /></Button>
        </Link>
        <CharacterForm></CharacterForm>

      </div>
    </>
  )
}

export default NewCharacter;
