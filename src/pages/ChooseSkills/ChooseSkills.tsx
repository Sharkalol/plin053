import { useEffect, useState } from "react";
import { getClass } from "../../services/dndApiService";
import { getById, saveCharacter } from "../../utils/localStorageHelper";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Acolyte } from "../../data/backgrounds/Acolyte";
import { FolkHero } from "../../data/backgrounds/FolkHero";
import { Noble } from "../../data/backgrounds/Noble";
import { Sage } from "../../data/backgrounds/Sage";
import { Soldier } from "../../data/backgrounds/Soldier";
import { Background } from "../../models/Background";
import Button from "../../common/Button";


const ChooseSkills = () => {
    const navigate = useNavigate();

    const [listOfSkills, setListOfSkills] = useState<string[]>([]);
    const [numOfSkills, setNumOfSkills] = useState<number>(0);

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
    const backgroundSkills = selectedBackground?.skills;


    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const skillResponse = await getClass(character.class);

                let skills = skillResponse.proficiency_choices[0].from.options.map(x => x.item.name);
                skills = skills.map(x => x.replace("Skill: ", "")).filter(x => !backgroundSkills.includes(x));
                setListOfSkills(skills);

                const num = skillResponse.proficiency_choices[0].choose;
                setNumOfSkills(num);

                setSelectedSkills(Array(num).fill(listOfSkills[0]));


            } catch (error) {
                console.error("Error fetching info:", error);
            }
        };

        fetchInfo();
    }, []);


    const [selectedSkills, setSelectedSkills] = useState<string[]>(Array(numOfSkills).fill(""));

    const [hasDuplicates, setHasDuplicates] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const selections: string[] = [];

        for (let i = 0; i < numOfSkills; i++) {
            const value = formData.get(`skill-${i}`);
            if (typeof value === "string") {
                selections.push(value);
            }
        }

        const hasD = new Set(selectedSkills).size !== selectedSkills.length;
        setHasDuplicates(hasD);

        if (hasD) {
            return;
        }


        character.skills = selections;
        saveCharacter(character);
        navigate(`/character/${id}`)
    }



    return (
        <>
            <h1 className="my-2">Choose your skills</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <p className="my-2">Your skills: {backgroundSkills.join(", ")}</p>
                    {hasDuplicates && <p className="border py-1 px-2 my-1">A skill can be choosen only once</p>}
                    <div className="my-2 flex items-center">
                        <label className="mx-2">Choose {numOfSkills} more: </label>
                        <div className="flex flex-wrap">
                            {Array.from({ length: numOfSkills }).map((_, index) => (
                                <select name={`skill-${index}`} className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" value={selectedSkills[index]} onChange={(e) => { const updated = [...selectedSkills]; updated[index] = e.target.value; setSelectedSkills(updated); }}>
                                    {listOfSkills.map(x => <option key={x} value={x}>{x}</option>)}
                                </select>
                            ))}
                        </div>
                    </div>
                </div>
                <Button className="my-2" type="submit">Continue</Button>
            </form>
        </>
    )
};
export default ChooseSkills;