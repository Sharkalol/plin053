import { Link, useNavigate, useParams } from "react-router-dom";
import { getById } from "../../utils/localStorageHelper";
import { Acolyte } from "../../data/backgrounds/Acolyte";
import { FolkHero } from "../../data/backgrounds/FolkHero";
import { Noble } from "../../data/backgrounds/Noble";
import { Sage } from "../../data/backgrounds/Sage";
import { Soldier } from "../../data/backgrounds/Soldier";
import { useEffect, useState } from "react";
import Button from "../../common/Button";
import AbilityScore from "./components/AbilityScore";
import { getClass } from "../../services/dndApiService";
import { ClassResponse } from "../../models/ClassResponse";
import { FaArrowLeft } from "react-icons/fa";

const Character = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    if (id === undefined) {
        return <div><p>Invalid id</p></div>;
    }
    const character = getById(id);
    if (character === undefined) {
        return <div><p>Invalid id</p></div>;
    }

    const [characterClass, setCharacterClass] = useState<ClassResponse>();

    useEffect(() => {
        if (character.stats === undefined) {
            navigate(`/choose_stats/${id}`);
        }
        if (character.stats === undefined) {
            navigate(`/choose_skills/${id}`);
        }
        if (character.trait === undefined) {
            navigate(`/choose_personality/${id}`);
        }

        const fetchInfo = async () => {
            try {
                const characterClass = await getClass(character.class);
                setCharacterClass(characterClass)

            } catch (error) {
                console.error("Error fetching info:", error);
            }
        }

        fetchInfo()


    }, []);

    if (character.stats === undefined) {
        return <></>;
    }

    if (character.skills === undefined) {
        return <></>;
    }

    if (character.trait === undefined) {
        return <></>;
    }


    const backgrounds: Record<string, { name: string; skills: string[] }> = {
        Acolyte,
        FolkHero,
        Noble,
        Sage,
        Soldier
    };

    const selectedBackground = backgrounds[character.background.replace(" ", "")];
    const backgroundSkills = selectedBackground?.skills;
    const skills = character.skills?.concat(backgroundSkills);
    const hitDie = characterClass?.hit_die;

    const perception = () => {
        if (skills.includes("Perception")) {
            return 14;
        } else {
            return 12;
        }
    }



    return (
        <div className="flex md:flex-row flex-wrap ">
            <div>
                <Link to="/characters">
                    <Button className="my-1"><FaArrowLeft /></Button>
                </Link>
            </div>
            <div className=" flex flex-col flex-wrap">
                <div className="flex flex-col justify-left">
                    <h1 className="my-1">{character.charactersName}</h1>
                    <p className="my-1">{character.playersName}</p>
                </div>
                <div className="flex flex-col flex-wrap items-center md:flex-row flex-wrap justify-between gap-y-2 space-x-1">
                    <p className="w-1/3 border border rounded-lg bg-fuchsia-950/40 mx-10">{character.class}</p>
                    <p className="w-1/3 border border rounded-lg bg-fuchsia-950/40 mx-10">{character.race}</p>
                    <p className="w-1/3 border border rounded-lg bg-fuchsia-950/40 mx-10">{character.background}</p>
                    <p className="w-1/3 border border rounded-lg bg-fuchsia-950/40 mx-10">{character.alignment}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-2 my-6">
                    <AbilityScore ability_name="Strength" ability_score={character.stats.Strength} />
                    <AbilityScore ability_name="Dexterity" ability_score={character.stats.Dexterity} />
                    <AbilityScore ability_name="Constitution" ability_score={character.stats.Constitution} />
                    <AbilityScore ability_name="Intelligence" ability_score={character.stats.Intelligence} />
                    <AbilityScore ability_name="Wisdom" ability_score={character.stats.Wisdom} />
                    <AbilityScore ability_name="Charisma" ability_score={character.stats.Charisma} />
                </div>
                <div className="flex flex-col md:flex-row border rounded-lg border-white">
                    <div className="py-3 px-1 flex flex-col w-full md:w-1/2 border-b md:border-b-0 md:border-r border-white">
                        <p className="border-b ">Personality:</p>
                        <p className="py-2">{character.trait}</p>
                        <p className="py-2">{character.ideal}</p>
                        <p className="py-2">{character.bond}</p>
                        <p className="py-2">{character.flaw}</p>
                    </div>
                    <div className="py-3 flex flex-col items-center justify-center w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
                        <div className="grid grid-cols-2 gap-x-9 gap-y-3">
                            <p className="text-right">Hit die:</p>
                            <p className="text-left">{hitDie}</p>
                            <p className="text-right">Hit points:</p>
                            <p className="text-left">{hitDie}</p>
                            <p className="text-right">Passive wisdom:</p>
                            <p className="text-left">{perception()}</p>
                            <p className="text-right">Skill proficiencies:</p>
                            <div className="flex flex-col">
                                {skills.map((skill, idx) => (
                                    <p className="text-left" key={idx}>{skill}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};
export default Character