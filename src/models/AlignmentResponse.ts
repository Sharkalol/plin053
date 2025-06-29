export type AlignmentResponse = {
    count: number;
    results: AlignmentResult[];
}
export type AlignmentResult = {
    index: string;
    name: string;
    url: string;
}