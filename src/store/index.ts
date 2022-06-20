import { SearchData } from "@/interfaces/SearchData";
import { get, push, set, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";
import { getIdentity, Identity, implementsIdentityPallet, Page, searchIdentities, connectToWsProvider } from "@npmjs_tdsoftware/subidentity";
import { getChainAddress } from "@/util/chains";
import { LoadIdentityRequest } from "@/interfaces/LoadIdentityRequest";
import { Pagination } from "@/interfaces/Pagination";
import { ImplementsPalletStoreItem } from "@/interfaces/ImplementsPalletStoreItem";
import config from "@/config";
import { apiAvailable, getRequest } from "@/util/http";
import { GetIdentitiesResponse } from "@/interfaces/http/GetIdentitiesResponse";
import { GetChainStatusResponse } from "@/interfaces/http/GetChainStatusResponse";
import { GetVersionResponse } from "@/interfaces/http/GetVersionResponse";
import { ApiPromise } from "@polkadot/api";
import {
    web3Accounts,
    web3Enable
} from "@polkadot/extension-dapp";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";


export interface StoreI {
    isAuthenticated: boolean;
    busyCounter: 0;
    recentSearches: SearchData<Identity>[];
    currentSearch?: SearchData<Identity>;
    identitySearchPagination: Pagination;
    apiVersion: string
}

export const key: InjectionKey<Store<StoreI>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
};

export const store = createStore({
    state: {
        busyCounter: 0,
        isAuthenticated: false,
        recentSearches: get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [],
        identitySearchPagination: {
            totalPageCount: 0,
            previous: 0,
            next: 0,
            currentPage: 1,
            limit: 5
        },
        apiVersion: ""

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

        login(state: StoreI) {
            state.isAuthenticated = true;
        },

        logout(state: StoreI) {
            state.isAuthenticated = false;
        },

        storeAsRecentSearch(state: StoreI, searchData: SearchData<Identity>) {
            const maxItemsInStorage = 12;
            const recentSearches = get<Array<SearchData<Identity>>>(StoreKey.RecentSearches) ?? [];
            const foundSeachTermIndex = recentSearches.findIndex((element) => element.searchTerm === searchData.searchTerm && element.selectedChainKey === searchData.selectedChainKey);

            // if search term found
            if (foundSeachTermIndex !== -1) {
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

            let page: Page<Identity>;
            if (await apiAvailable()) {
                try {
                    const response = await getRequest<GetIdentitiesResponse>(`/identities/search?wsProvider=${encodeURIComponent(wsAddress)}&page=${currentPage}&limit=${this.state.identitySearchPagination.limit}&searchKey=${encodeURIComponent(searchData.searchTerm)}`);
                    page = response.identities;
                } catch (error) {
                    if (["Provided node is not an archive node.", "Chain is not indexed yet.", "Could not connect to endpoint."].includes(error.message)) {
                        page = await searchIdentities(wsAddress, searchData.searchTerm, currentPage, this.state.identitySearchPagination.limit);
                    }
                    else {
                        throw new Error(`Something went wrong while trying to fetch this information: ${error.message}`);
                    }

                }
            } else {
                page = await searchIdentities(wsAddress, searchData.searchTerm, currentPage, this.state.identitySearchPagination.limit);
            }
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
            let identity;
            if (await apiAvailable()) {
                try {
                    identity = await getRequest<Identity>(`/identities/${request.address}?wsProvider=${encodeURIComponent(wsAddress)}`);
                } catch (error) {
                    if (["Provided node is not an archive node.", "Chain is not indexed yet.", "Unable to find an identity with the provided address.", "Could not connect to endpoint."].includes(error.message)) {
                        identity = await getIdentity(wsAddress, request.address);
                    }
                    else {
                        throw new Error(`Something went wrong while trying to fetch this information: ${error.message}`);
                    }
                }
            } else {
                identity = await getIdentity(wsAddress, request.address);
            }

            console.log("[store/index] Got identity by address: ", identity);
            return identity;
        },

        async GET_API_VERSION(context: ActionContext<StoreI, StoreI>) {
            if (await apiAvailable()) {
                try {
                    const response = await getRequest<GetVersionResponse>("/version");
                    context.commit("setApiVersion", response);
                } catch (error) {
                    throw new Error(`Something went wrong while trying to fetch this information: ${error.message}`);
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
            if (implementsPalletStoreItem && implementsPalletStoreItem.timestamp > Date.now() - config.CACHE_DURATION_IMPLEMENTS_PALLET) {
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

        async GET_CHAIN_GENESISHASH(context: ActionContext<StoreI, StoreI>, chainKey: string) {
            const wsAddress = getChainAddress(chainKey);
            if (!wsAddress) {
                throw new Error("No address given for chain: " + chainKey);
            }
            const apiPromise: ApiPromise = await connectToWsProvider(wsAddress);
            return (await apiPromise.genesisHash).toHuman();
        },


        async LOAD_WEB3_ACCOUNTS(context: ActionContext<StoreI, StoreI>, chainKey: string): Promise<InjectedAccountWithMeta[]> {
            const wsAddress = getChainAddress(chainKey);
            if (!wsAddress) {
                throw new Error("No address given for chain: " + chainKey);
            }
            await web3Enable("SubIdentity");
            // returns an array of { address, meta: { name, source } }
            // meta.source contains the name of the extension that provides this account
            const allAccounts = await web3Accounts();
            return allAccounts;
        }
    },
    modules: {}
});
