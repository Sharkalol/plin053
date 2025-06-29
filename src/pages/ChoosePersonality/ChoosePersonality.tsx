import { useNavigate, useParams } from "react-router-dom";
import { getById, saveCharacter } from "../../utils/localStorageHelper";
import { Background } from "../../models/Background";
import { Acolyte } from "../../data/backgrounds/Acolyte";
import { FolkHero } from "../../data/backgrounds/FolkHero";
import { Noble } from "../../data/backgrounds/Noble";
import { Sage } from "../../data/backgrounds/Sage";
import { Soldier } from "../../data/backgrounds/Soldier";
import Button from "../../common/Button";
import { useState } from "react";

const ChoosePersonality = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    if (id === undefined) {
        return <div><p>Invalid id</p></div>;
    }
    const character = getById(id);
    if (character === undefined) {
        return <div><p>Invalid id</p></div>;
    }

    const backgrounds: Record<string, Background> = {
        Acolyte,
        FolkHero,
        Noble,
        Sage,
        Soldier
    };

    const selectedBackground = backgrounds[character.background.replace(" ", "")];
    const alignmentFilter = character.alignment + "any"
    const alignmentsForIdeals = Object.keys(selectedBackground.ideals).filter(x => alignmentFilter.toLowerCase().includes(x.toLowerCase()))

    const [trait, setTrait] = useState(selectedBackground.personality_traits[0]);
    const [ideal, setIdeal] = useState(selectedBackground.ideals[alignmentsForIdeals[0]][0]);
    const [bond, setBond] = useState(selectedBackground.bonds[0]);
    const [flaw, setFlaw] = useState(selectedBackground.flaws[0]);

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        character.trait = trait;
        character.ideal = ideal;
        character.bond = bond;
        character.flaw = flaw;
        saveCharacter(character)
        navigate(`/character/${id}`)

    }

    return (
        <form className="flex flex-wrap flex-col items-center" onSubmit={handleSubmit}>
            <h1 className="my-2">Choose your personality</h1>
            <div className="my-3 flex flex-wrap flex-col w-fit items-center">
                <label>Personality trait:</label>
                <select onChange={e => setTrait(e.target.value)} className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400">{selectedBackground.personality_traits.map(x => (<option key={x} value={x} >{x}</option>))}
                </select>
            </div>
            <div className="my-3 w-auto flex flex-col w-fit items-center">
                <label>Ideal:</label>
                <select onChange={e => setIdeal(e.target.value)} className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400">{alignmentsForIdeals.map((key) =>
                    selectedBackground.ideals[key]?.map((ideal, idx) => (
                        <option key={`${key}-${idx}`} value={ideal}>{ideal}</option>)))}
                </select>
            </div>
            <div className="my-3 flex flex-col w-fit items-center">
                <label>Bond:</label>
                <select onChange={e => setBond(e.target.value)} className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400">{selectedBackground.bonds.map(x => (<option key={x} value={x}>{x}</option>))}
                </select>
            </div>
            <div className="my-3 flex flex-col w-fit items-center">
                <label>Flaw:</label>
                <select onChange={e => setFlaw(e.target.value)} className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400">{selectedBackground.flaws.map(x => (<option key={x} value={x}>{x}</option>))}
                </select>
            </div>
            <Button className="w-fit my-2 w-fit" type="submit">Continue</Button>
        </form>
    )
};
export default ChoosePersonality