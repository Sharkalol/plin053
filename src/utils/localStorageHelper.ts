import { Character } from "../models/Character";
import { CharacterInfo } from "../models/CharacterInfo";
import { Characters } from "../models/Characters";
import { generateStats } from "./statGenerator";
import { v4 as uuidv4 } from 'uuid';

const charactersKey = 'charactersKey'

export const getCharacters = () => {
    const storedData = localStorage.getItem(charactersKey);
    if (storedData === null) {
        return { characterList: [] };
    }
    return JSON.parse(storedData) as Characters;
}

export const getById = (id : string) => {
    const characters = getCharacters();
    return characters.characterList.find(x => x.id === id)
}

export const saveCharacter = (character : Character) => {
    deleteCharacter(character.id);
    const list = getCharacters();
    list.characterList.push(character);
    localStorage.setItem(charactersKey, JSON.stringify(list));
}

export const deleteCharacter = (id : string) => {
    const characters = getCharacters();
    characters.characterList = characters.characterList.filter(x => x.id !== id); 
    localStorage.setItem(charactersKey, JSON.stringify(characters));
}



export const createCharacter = (value: CharacterInfo) => {
    const character: Character = { ...value, rolledStats: generateStats() , id: uuidv4()};
    saveCharacter(character);
    return character.id;
}


