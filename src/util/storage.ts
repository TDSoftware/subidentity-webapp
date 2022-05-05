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

/**
 * Will create an array if non exist.
 * 
 * @param key - key of the array in the localStorage
 * @param value - One item to be added to the array
 * @param max - max length of the array, will remove first item if exceeded
 */
export function push<T>(key: string, value: T, maxLength: number) {
    const items = get<T[]>(key) ?? [];
    items.push(value);
    if (items.length > maxLength) {
        items.shift();
    }
    set(key, items);
}