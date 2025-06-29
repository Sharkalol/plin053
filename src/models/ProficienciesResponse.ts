export type ProficienciesResponse = {
    count: number;
    results: ProficienciesResult[];
}
export type ProficienciesResult = {
    index: string;
    name: string;
    url: string;
}