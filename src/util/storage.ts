export enum StoreKey {
    RecentSearches = "RecentSearches"
}

export function get<T>(key: string): T | undefined {
    const item = window.localStorage.getItem(key);
    if (item) {
        return JSON.parse(item) as T;
    }
}

export function set<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function push<T>(key: string, value: T) {
    const items = get<T[]>(key) ?? [];
    items.push(value);
    set(key, items);
}