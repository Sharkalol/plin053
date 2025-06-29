export type ClassesResponse = {
    count: number;
    results: ClassResult[];
}
export type ClassResult = {
    index: string;
    name: string;
    url: string;
}