import Button from '../../common/Button';
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <div className="flex flex-col">
        <h1>
          D&D Character Creator
        </h1>
        <div className="flex flex-col p-10 space-y-10 ">
          <p>What do you want to do?</p>
          <Link to="/new_character">
            <Button>
              New character
            </Button>
          </Link>
          <Link to="/characters">
            <Button>
              Characters
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home;
