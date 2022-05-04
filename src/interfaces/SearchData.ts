export interface SearchData<T> {
    searchTerm: string;
    selectedChainKey: string;
    results: T[];
    timestamp: number;
}