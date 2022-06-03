import { SearchData } from "@/interfaces/SearchData";
import { get, push, set, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";
import { getIdentity, Identity, implementsIdentityPallet, Page, searchIdentities } from "@npmjs_tdsoftware/subidentity";
import { getChainAddress } from "@/util/chains";
import { LoadIdentityRequest } from "@/interfaces/LoadIdentityRequest";
import { Pagination } from "@/interfaces/Pagination";
import { ImplementsPalletStoreItem } from "@/interfaces/ImplementsPalletStoreItem";
import config from "@/config";


export interface StoreI {
    isAuthenticated: boolean;
    busyCounter: 0;
    recentSearches: SearchData<Identity>[];
    currentSearch?: SearchData<Identity>;
    identitySearchPagination: Pagination

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
        }

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

        resetBusyCounter(state: StoreI){
            state.busyCounter = 0;
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
            const foundSeachTermIndex = recentSearches.findIndex((element) => element.searchTerm === searchData.searchTerm);

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
            const wsAddress = getChainAddress(searchData.selectedChainKey);
            if (!wsAddress) {
                throw new Error("[store/index] No address given for chain: " + searchData.selectedChainKey);
                return console.error("[store/index] No address given for chain: ", searchData.selectedChainKey);
            }
            context.commit("incrementBusyCounter");
            const page: Page<Identity> = await searchIdentities(wsAddress, searchData.searchTerm, currentPage, this.state.identitySearchPagination.limit);
            console.log("[store/index] Got identities: ", page);
            context.commit("paginateSearchResult", page);
            searchData.results = page.items;
            searchData.totalItemCount = page.totalItemsCount;
            context.commit("storeAsRecentSearch", searchData);
            context.commit("decrementBusyCounter");
        },

        async LOAD_IDENTITY(context: ActionContext<StoreI, StoreI>, request: LoadIdentityRequest): Promise<Identity> {
            const wsAddress = getChainAddress(request.chain);
            if (!wsAddress) {
                throw new Error("[store/index] No address given for chain: " + request.chain);
            }
            const identity: Identity = await getIdentity(wsAddress, request.address);
            console.log("[store/index] Got identity by address: ", identity);
            return identity;
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
            const implementsPallet = await implementsIdentityPallet(wsAddress);
            set<ImplementsPalletStoreItem>(localStorageKey, {
                chainAddress: wsAddress,
                timestamp: Date.now(),
                implementsPallet
            });
            context.commit("decrementBusyCounter");
            return implementsPallet;
        },

        async RESET_BUSY(context: ActionContext<StoreI, StoreI>): Promise<void> {
            context.commit("resetBusyCounter");
        }
    },
    modules: {}
});
