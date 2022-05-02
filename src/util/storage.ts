export function get<T>(key: string): T | undefined {
    const item = window.localStorage.getItem(key);
    if (item) {
        return JSON.parse(item) as T;
    }
}

export function set<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
}