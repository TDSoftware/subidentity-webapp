export interface ChainInfo {
    key: string;
    name: string;
    address: string;
    modifiedAt?: number;
}

export const chains: ChainInfo[] = [
    {
        key: "polkadot",
        name: "Polkadot",
        address: "wss://rpc.polkadot.io"
    },
    {
        key: "kusama",
        name: "Kusama",
        address: "wss://kusama-rpc.polkadot.io"
    },
    {
        key: "westend",
        name: "Westend",
        address: "wss://westend-rpc.polkadot.io"
    }
];

/**
 * @param chainKey - example: "polkadot" 
 * @returns the address to connect to via wbe3
 */
export function getChainAddress(chainKey: string): string | undefined {
    return chains.find(({ key }) => chainKey === key)?.address;
}

/**
 * @param chainKey - example: "polkadot" 
 */
export function getChainName(chainKey: string): string | undefined {
    return chains.find(({ key }) => chainKey === key)?.name;
}

