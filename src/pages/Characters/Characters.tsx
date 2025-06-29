import { Link } from "react-router-dom";
import { getCharacters } from "../../utils/localStorageHelper";
import CharacterPreview from "./components/CharacterPreview";
import Button from "../../common/Button";
import { FaArrowLeft } from "react-icons/fa";

const Characters = () => {

    const characters = getCharacters();

    return (
        <div className="flex flex-col items-start md:flex-row">
            <div>
                <Link to="/home">
                    <Button className="my-2 mx-4"><FaArrowLeft /></Button>
                </Link>
            </div>
            <div className="flex flex-wrap ">
                {characters.characterList.map(x => <CharacterPreview key={x.id} character={x} />)}
            </div>
        </div>
    )
};
export default Characters