import { SearchData } from "@/interfaces/SearchData";
import { get, push, set, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";
import { getIdentity, Identity, implementsIdentityPallet, Page, searchIdentities, connectToWsProvider } from "@npmjs_tdsoftware/subidentity";
import { getChainAddress } from "@/util/chains";
import { LoadIdentityRequest } from "@/interfaces/LoadIdentityRequest";
import { Pagination } from "@/interfaces/Pagination";
import { ImplementsPalletStoreItem } from "@/interfaces/ImplementsPalletStoreItem";
import constants from "@/constants";
import { apiAvailable, getRequest } from "@/util/http";
import { GetChainStatusResponse } from "@/interfaces/http/GetChainStatusResponse";
import { GetVersionResponse } from "@/interfaces/http/GetVersionResponse";
import { ApiPromise } from "@polkadot/api";
import {
    web3Accounts,
    web3Enable,
    web3FromAddress
} from "@polkadot/extension-dapp";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { LoadSendTokenRequest } from "@/interfaces/LoadSendTokenRequest";
import { DetailedIdentity, AccountActivityTypeEnum } from "@npmjs_tdsoftware/subidentity";


export interface StoreI {
    busyCounter: 0;
    recentSearches: SearchData<Identity>[];
    currentSearch?: SearchData<Identity>;
    identitySearchPagination: Pagination;
    apiVersion: string,
    isTransferTokenSuccess: boolean,
    transferTokenError: string
}

export const key: InjectionKey<Store<StoreI>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
};

export const store = createStore({
    state: {
        busyCounter: 0,
        recentSearches: get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [],
        identitySearchPagination: {
            totalPageCount: 0,
            previous: 0,
            next: 0,
            currentPage: 1,
            limit: 5
        },
        apiVersion: "",
        isTransferTokenSuccess: false,
        transferTokenError: ""

    },
    getters: {

        isBusy(state: StoreI) {
            return state.busyCounter > 0;
        },

        lastSearchResults(state: StoreI) {
            return state.recentSearches[
                state.recentSearches.length - 1
            ]?.results ?? [];
        },

        lastSearchTerm(state: StoreI) {
            return state.recentSearches[
                state.recentSearches.length - 1
            ]?.searchTerm;
        },

        lastSearchChainKey(state: StoreI) {
            return state.recentSearches[
                state.recentSearches.length - 1
            ]?.selectedChainKey;
        },

        lastTotalItemCount(state: StoreI) {
            return state.recentSearches[
                state.recentSearches.length - 1
            ]?.totalItemCount;
        }
    },
    mutations: {

        incrementBusyCounter(state: StoreI) {
            state.busyCounter++;
        },

        decrementBusyCounter(state: StoreI) {
            state.busyCounter--;
        },

        storeAsRecentSearch(state: StoreI, searchData: SearchData<Identity>) {
            const maxItemsInStorage = 12;
            const recentSearches = get<Array<SearchData<Identity>>>(StoreKey.RecentSearches) ?? [];
            const foundSeachTermIndex = recentSearches.findIndex((element) => element.searchTerm === searchData.searchTerm && element.selectedChainKey === searchData.selectedChainKey);
            const searchTermFund = foundSeachTermIndex !== -1;
            if (searchTermFund) {
                recentSearches.splice(foundSeachTermIndex, 1);
                recentSearches.push(searchData);
                set(StoreKey.RecentSearches, recentSearches);
                state.recentSearches = get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [];
            } else {
                push(StoreKey.RecentSearches, searchData, maxItemsInStorage);
                state.recentSearches = get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [];
            }
        },

        clearRecentSearches(state: StoreI) {
            set<SearchData<Identity>[]>(StoreKey.RecentSearches, []);
            state.recentSearches = [];
        },

        paginateSearchResult(state: StoreI, page) {
            state.identitySearchPagination = { totalPageCount: page.totalPageCount, previous: page.previous, next: page.next, currentPage: page.next - 1 || page.previous + 1 || 1, limit: 5 };
        },
        setApiVersion(state: StoreI, versionData) {
            state.apiVersion = `${versionData.version} (${versionData.commitHash})`;
        },

        setTransferTokenSuccessStatus(state: StoreI, status) {
            state.isTransferTokenSuccess = status;
        },
        setTransferTokenError(state: StoreI, error) {
            state.transferTokenError = error;
        }
    },
    actions: {

        /**
         *  This action calls fetches the queried identities from chain 
         *  and commits those to the store state under "recentSearches".
         * 
         *  --> all recentSearches are store in localStorage and allow client side caching.
         */
        async SEARCH_IDENTITIES(context: ActionContext<StoreI, StoreI>, { searchData, currentPage }): Promise<void> {
            context.commit("incrementBusyCounter");
            const wsAddress = getChainAddress(searchData.selectedChainKey);
            if (!wsAddress) {
                throw new Error("No address given for chain: " + searchData.selectedChainKey);
            }
            const page: Page<Identity> = await searchIdentities(wsAddress, searchData.searchTerm, currentPage, this.state.identitySearchPagination.limit);
            console.log("[store/index] Got identities: ", page);
            context.commit("paginateSearchResult", page);
            searchData.results = page.items;
            searchData.totalItemCount = page.totalItemsCount;
            context.commit("storeAsRecentSearch", searchData);
            context.commit("decrementBusyCounter");
        },

        async DECREMENT_BUSY(context: ActionContext<StoreI, StoreI>) {
            context.commit("decrementBusyCounter");
        },

        async LOAD_IDENTITY(context: ActionContext<StoreI, StoreI>, request: LoadIdentityRequest): Promise<Identity> {
            const wsAddress = getChainAddress(request.chain);
            if (!wsAddress) {
                throw new Error("No address given for chain: " + request.chain);
            }
            let identity: DetailedIdentity;
            if (await apiAvailable()) {
                try {
                    identity = await getRequest<Identity>(`/identities/${request.address}?wsProvider=${encodeURIComponent(wsAddress)}`);
                } catch (error) {
                    if ([constants.SERVER_ERROR_IS_NOT_ARCHIVE_NODE, constants.SERVER_ERROR_IS_NOT_CHAIN_INDEXED, constants.SERVER_ERROR_COULD_NOT_CONNECT_ENDPOINT, constants.SERVER_ERROR_CANNOT_FIND_IDENTITY].includes(error.message)) {
                        identity = await getIdentity(wsAddress, request.address);
                    }
                    else {
                        throw new Error("Something went wrong while trying to fetch this information");
                    }
                }
            } else {
                identity = await getIdentity(wsAddress, request.address);
            }

            // //TODO-- get governance and treasury data from npm package
            // identity.treasury = [
            //     {
            //         primaryObject: ActivityObject.TreasuryTip,
            //         primaryObjectValue: 0,
            //         secondaryObject: null,
            //         secondaryObjectValue: 0,
            //         additionalInfoType: InfoType.Reason,
            //         additionalInfoValue: "This was great",
            //         activity: Activity.Tipped,
            //         block: 10007882,
            //         type: AccountActivityTypeEnum.Treasury
            //     },
            //     {
            //         primaryObject: ActivityObject.TreasurySpend,
            //         primaryObjectValue: 120,
            //         secondaryObject: null,
            //         secondaryObjectValue: 0,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.Proposed,
            //         block: 10006282,
            //         type: AccountActivityTypeEnum.Treasury
            //     },
            //     {
            //         primaryObject: ActivityObject.CouncilMotion,
            //         primaryObjectValue: 100,
            //         secondaryObject: ActivityObject.TreasurySpend,
            //         secondaryObjectValue: 90,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.VotedAye,
            //         block: 10006282,
            //         type: AccountActivityTypeEnum.ProVote
            //     },
            //     {
            //         primaryObject: ActivityObject.CouncilMotion,
            //         primaryObjectValue: 99,
            //         secondaryObject: ActivityObject.TreasurySpend,
            //         secondaryObjectValue: 89,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.VotedNay,
            //         block: 10006082,
            //         type: AccountActivityTypeEnum.ConVote
            //     },
            //     {
            //         primaryObject: ActivityObject.CouncilMotion,
            //         primaryObjectValue: 96,
            //         secondaryObject: ActivityObject.TreasurySpend,
            //         secondaryObjectValue: 84,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.MissedVote,
            //         block: 10000082,
            //         type: AccountActivityTypeEnum.CouncilorMissed
            //     }
            // ];

            // identity.governance = [
            //     {
            //         primaryObject: ActivityObject.Referenda,
            //         primaryObjectValue: 24,
            //         secondaryObject: null,
            //         secondaryObjectValue: 0,
            //         additionalInfoType: InfoType.Reason,
            //         additionalInfoValue: "This was great",
            //         activity: Activity.VotedAye,
            //         block: 10007882,
            //         type: AccountActivityTypeEnum.ProVote
            //     },
            //     {
            //         primaryObject: ActivityObject.DemocracyProposal,
            //         primaryObjectValue: 120,
            //         secondaryObject: null,
            //         secondaryObjectValue: 0,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.Proposed,
            //         block: 10006282,
            //         type: AccountActivityTypeEnum.Info
            //     },
            //     {
            //         primaryObject: ActivityObject.Referenda,
            //         primaryObjectValue: 0,
            //         secondaryObject: null,
            //         secondaryObjectValue: 0,
            //         additionalInfoType: InfoType.Reason,
            //         additionalInfoValue: "This was great",
            //         activity: Activity.VotedAye,
            //         block: 10007882,
            //         type: AccountActivityTypeEnum.ProVote
            //     },
            //     {
            //         primaryObject: ActivityObject.Referenda,
            //         primaryObjectValue: 99,
            //         secondaryObject: ActivityObject.TreasurySpend,
            //         secondaryObjectValue: 0,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.VotedNay,
            //         block: 10006082,
            //         type: AccountActivityTypeEnum.ConVote
            //     },
            //     {
            //         primaryObject: ActivityObject.CouncilMotion,
            //         primaryObjectValue: 96,
            //         secondaryObject: ActivityObject.TreasurySpend,
            //         secondaryObjectValue: 84,
            //         additionalInfoType: null,
            //         additionalInfoValue: null,
            //         activity: Activity.MissedVote,
            //         block: 10000082,
            //         type: AccountActivityTypeEnum.CouncilorMissed
            //     }
            // ];

            console.log("[store/index] Got identity by address: ", identity);
            return identity;
        },

        async GET_API_VERSION(context: ActionContext<StoreI, StoreI>) {
            if (await apiAvailable()) {
                try {
                    const response = await getRequest<GetVersionResponse>("/version");
                    context.commit("setApiVersion", response);
                } catch (error) {
                    throw new Error("Something went wrong while trying to fetch this information");
                }

            }
        },

        async IDENTITY_PALLET_EXISTS(context: ActionContext<StoreI, StoreI>, chainKey: string): Promise<boolean> {
            const wsAddress = getChainAddress(chainKey);
            if (!wsAddress) {
                console.error("[store/index] No address given for chain: ", chainKey);
                return false;
            }
            const localStorageKey = "chain-" + wsAddress + "-implements-pallet";
            const implementsPalletStoreItem = get<ImplementsPalletStoreItem>(localStorageKey);
            if (implementsPalletStoreItem && implementsPalletStoreItem.timestamp > Date.now() - constants.CACHE_DURATION_IMPLEMENTS_PALLET) {
                return implementsPalletStoreItem.implementsPallet;
            }
            context.commit("incrementBusyCounter");
            let implementsPallet: boolean;
            if (await apiAvailable()) {
                try {
                    const chainStatusResponse = await getRequest<GetChainStatusResponse>(`/chains/status?wsProvider=${encodeURIComponent(wsAddress)}`);
                    implementsPallet = chainStatusResponse.chainStatus.implementsIdentityPallet;
                } catch (error) {
                    implementsPallet = await implementsIdentityPallet(wsAddress);
                }

            } else {
                implementsPallet = await implementsIdentityPallet(wsAddress);
            }
            set<ImplementsPalletStoreItem>(localStorageKey, {
                chainAddress: wsAddress,
                timestamp: Date.now(),
                implementsPallet
            });
            context.commit("decrementBusyCounter");
            return implementsPallet;
        },

        async LOAD_WEB3_ACCOUNTS(context: ActionContext<StoreI, StoreI>, chainKey: string): Promise<InjectedAccountWithMeta[]> {
            const wsAddress = getChainAddress(chainKey);
            if (!wsAddress) {
                throw new Error("No address given for chain: " + chainKey);
            }

            const apiPromise: ApiPromise = await connectToWsProvider(wsAddress);
            const chainGenesisHash = apiPromise.genesisHash.toHuman();

            await web3Enable("SubIdentity");

            const accounts: Array<InjectedAccountWithMeta> = [];

            // returns an array of { address, meta: { name, source } }
            // meta.source contains the name of the extension that provides this account
            const allWeb3Accounts = await web3Accounts();

            allWeb3Accounts.forEach((account: InjectedAccountWithMeta) => {
                if (!account.meta.genesisHash || account.meta.genesisHash === chainGenesisHash) {
                    accounts.push(account);
                }
            });

            return accounts;
        },

        async SEND_TOKEN(context: ActionContext<StoreI, StoreI>, request: LoadSendTokenRequest): Promise<void> {
            context.commit("incrementBusyCounter");
            context.commit("setTransferTokenSuccessStatus", false);
            context.commit("setTransferTokenError", "");

            let wsAddress;
            let apiPromise: ApiPromise;
            let injector;

            try {
                wsAddress = getChainAddress(request.chain);
                if (!wsAddress) {
                    throw new Error("No address given for chain: " + request.chain);
                }
                apiPromise = await connectToWsProvider(wsAddress);

                // (this needs to be called first, before other requests)
                await web3Enable("SubIdentity");

                // finds an injector for an address
                injector = await web3FromAddress(request.senderAddress);

                apiPromise
                    .tx
                    .balances
                    .transfer(request.receiverAddress, request.amount)
                    .signAndSend(request.senderAddress, { signer: injector?.signer }, ({ dispatchError, isFinalized }) => {
                        if (dispatchError) {
                            if (dispatchError.isModule) {
                                const decoded = apiPromise.registry.findMetaError(dispatchError.asModule);
                                const { docs, name, section } = decoded;

                                if (`${section}.${name}: ${docs.join(" ")}` === "balances.InsufficientBalance: Balance too low to send value") {
                                    context.commit("decrementBusyCounter");
                                    context.commit("setTransferTokenError", "The transaction was unsuccessful: Inability to pay some fees");
                                } else {
                                    context.commit("decrementBusyCounter");
                                    context.commit("setTransferTokenError", "The transaction was unsuccessful, please try again");
                                }
                            }
                        } else {
                            if (isFinalized) {
                                context.commit("decrementBusyCounter");
                                context.commit("setTransferTokenSuccessStatus", true);
                            }
                        }
                    }).catch((error) => {
                        context.commit("decrementBusyCounter");
                        let errorMessage;
                        if (error.message === "1010: Invalid Transaction: Inability to pay some fees , e.g. account balance too low") {
                            errorMessage = "The transaction was unsuccessful: Inability to pay some fees";
                            context.commit("setTransferTokenError", errorMessage);
                        } else if (
                            error.message ===
                            "Cancelled"
                        ) {
                            errorMessage =
                                "The transaction was cancelled";
                            context.commit("setTransferTokenError", errorMessage);
                        } else {
                            errorMessage =
                                "The transaction was unsuccessful, please try again";
                            context.commit("setTransferTokenError", errorMessage);
                        }
                    });

            } catch (error) {
                context.commit("decrementBusyCounter");
                context.commit("setTransferTokenError", "Something went wrong, please try again");
            }
        }
    },
    modules: {}
});