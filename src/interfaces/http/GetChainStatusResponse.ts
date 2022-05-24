export interface GetChainStatusResponse {
    chainStatus: ChainStatus
}

interface ChainStatus {
    isIndexed: boolean;
    isArchiveNode: boolean;
    implementsIdentityPallet: boolean;
    chainName: string
}