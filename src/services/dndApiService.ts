import axios from 'axios';
import { ClassesResponse } from '../models/ClassesResponse';
import { RacesResponse } from '../models/RacesResponse';
import { AlignmentResponse } from '../models/AlignmentResponse';
import { string } from 'zod';
import { ClassResponse } from '../models/ClassResponse';

const apiUrl = "https://www.dnd5eapi.co/api/2014/";

export const getClasses = async () => {
    const response = await axios.get<ClassesResponse>(`${apiUrl}classes/`);
    return response.data;
}

export const getRaces = async () => {
    const response = await axios.get<RacesResponse>(`${apiUrl}races/`);
    return response.data;
}

export const getAlignment = async () => {
    const response = await axios.get<AlignmentResponse>(`${apiUrl}alignments/`);
    return response.data;
}

export const getClass = async (category: string) => {
    category = category.toLowerCase();
    const response = await axios.get<ClassResponse>(`${apiUrl}classes/${category}`);
    return response.data;
}
