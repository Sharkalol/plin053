import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { getAlignment, getClasses, getRaces } from "../../../services/dndApiService";
import { getRandomName } from "../../../services/nameApiService";
import { CharacterInfo, characterSchema } from "../../../models/CharacterInfo";
import { createCharacter } from "../../../utils/localStorageHelper";
import { useNavigate } from 'react-router-dom';
import Button from "../../../common/Button";
import { FaDice } from "react-icons/fa";


const CharacterForm = () => {
    const navigate = useNavigate();
    const [listOfClasses, setListOfClasses] = useState<string[]>([]);
    const [listOfRaces, setListOfRaces] = useState<string[]>([]);
    const [listOfAlignments, setListOfAlignments] = useState<string[]>([]);
    const listOfBackgrounds = ["Acolyte", "Folk Hero", "Noble", "Sage", "Soldier"];

    const onGetName = async () => {
        const name = await getRandomName();
        setValue("charactersName", name);
    }

    const onNameChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        if (e === undefined) {
            return;
        }
    }

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const classResponse = await getClasses();
                const classNames = classResponse.results.map((item) => item.name);
                setListOfClasses(classNames);

                const raceResponse = await getRaces();
                const raceNames = raceResponse.results.map((item) => item.name);
                setListOfRaces(raceNames);

                const alignmentResponse = await getAlignment();
                const alignmentNames = alignmentResponse.results.map((item) => item.name);
                setListOfAlignments(alignmentNames);


            } catch (error) {
                console.error("Error fetching info:", error);
            }
        };

        fetchInfo();
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CharacterInfo>({
        resolver: zodResolver(characterSchema),
    });

    const onSubmit = (values: CharacterInfo) => {
        const id = createCharacter(values);
        navigate(`/choose_stats/${id}`);
    }

    return (
        <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col ">
                <div className="w-full flex justify-between items-center">
                    <label>Character's name:</label>
                    <input className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" {...register("charactersName")} onChange={onNameChange} />
                    {errors.charactersName && <span>{errors.charactersName.message}</span>}
                </div>

                <div className="w-full flex justify-between items-center">
                    <label>Player's name:</label>
                    <input className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" {...register("playersName")} />
                    {errors.playersName && <span>{errors.playersName.message}</span>}
                </div>
                <div className="w-full flex justify-between items-center">
                    <label>Class: </label>
                    <select className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" defaultValue="" {...register("class")}>
                        <option value="" disabled hidden>Choose class</option>
                        {listOfClasses.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div className="w-full flex justify-between items-center">
                    <label>Race: </label>
                    <select className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" defaultValue="" {...register("race")}>
                        <option value="" disabled hidden>Choose race</option>
                        {listOfRaces.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div className="w-full flex justify-between items-center">
                    <label>Alignment: </label>
                    <select className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" defaultValue="" {...register("alignment")}>
                        <option value="" disabled hidden>Choose alignment</option>
                        {listOfAlignments.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div className="w-full flex justify-between items-center">
                    <label>Background: </label>
                    <select className="h-8 px-3 my-1 mx-1 bg-purple-200 text-black border rounded-md border-fuchsia-400" defaultValue="" {...register("background")}>
                        <option value="" disabled hidden>Choose background</option>
                        {listOfBackgrounds.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <Button className="my-2" type="submit">Continue</Button>
            </div>
            <Button className="h-8 px-3 mx-1 my-1" onClick={onGetName} type="button"><FaDice /></Button>
        </form>);

}

export default CharacterForm;

