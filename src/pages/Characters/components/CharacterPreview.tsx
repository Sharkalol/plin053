import { Link } from "react-router-dom";
import { Character } from "../../../models/Character";


type CharacterPreviewProps = {
    character: Character;
}

const CharacterPreview = ({character}:CharacterPreviewProps) => {

    const id = `/character/${character.id}`;

    return (
        <Link className="border border-white rounded-lg px-2 py-2 mx-2 my-2 w-1/5 hover:bg-fuchsia-950/50 " to={id}>
         <p className="text-xl border-b">{character.charactersName}</p>
         <p>{character.class}</p>
        </Link>
    )
};
export default CharacterPreview