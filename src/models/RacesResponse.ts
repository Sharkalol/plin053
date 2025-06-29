export type RacesResponse = {
    count: number;
    results: RaceResult[];
}
export type RaceResult = {
    index: string;
    name: string;
    url: string;
}