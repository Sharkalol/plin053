import { CharacterInfo } from "./CharacterInfo";
import { Stats } from "./Stats";

export type Character = {
    id: string;
    rolledStats: number[];
    stats?: Stats;
    skills?: string[];
    trait?: string;
    ideal?: string;
    bond?: string;
    flaw?: string
} & CharacterInfo