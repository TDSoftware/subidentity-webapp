import { SearchData } from "@/interfaces/SearchData";
import { get, push, set, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";
import { getIdentity, Identity, implementsIdentityPallet, Page, searchIdentities } from "@npmjs_tdsoftware/subidentity";
import { getChainAddress } from "@/util/chains";
import { LoadIdentityRequest } from "@/interfaces/LoadIdentityRequest";
import { Pagination } from "@/interfaces/Pagination";
import { resourceLimits } from "worker_threads";


export interface StoreI {
    isAuthenticated: boolean;
    recentSearches: SearchData<Identity>[];
    currentSearch?: SearchData<Identity>;
    pagination: Pagination

}

export const key: InjectionKey<Store<StoreI>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
};

export const store = createStore({
    state: {
        isAuthenticated: false,
        recentSearches: get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [],
        pagination: {

            // TODO: add "limit", items per page here

            totalPageCount: 0,
            previous: 0,
            next: 0,
            currentPage: 1
        }

    },
    getters: {

        lastSearchResults(state: StoreI) {

            // TODO: with state.pagination, filter the sate.recentSearches.results array
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

            const startIndex = (state.pagination.currentPage - 1) * state.pagination.limit;
            const endIndex = state.pagination.currentPage * state.pagination.limit;

            return (state.recentSearches[
                state.recentSearches.length - 1
            ]?.results ?? []).slice(startIndex, endIndex);
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
        }
    },
    mutations: {

        login(state: StoreI) {
            state.isAuthenticated = true;
        },

        logout(state: StoreI) {
            state.isAuthenticated = false;
        },

        storeAsRecentSearch(state: StoreI, searchData: SearchData<Identity>) {
            const maxItemsInStorage = 12;
            push(StoreKey.RecentSearches, searchData, maxItemsInStorage);
            state.recentSearches = get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [];
        },

        appendRecentSearch(state: StoreI, searchData: SearchData<Identity>) {
            const recentSearches = get<Array<SearchData<Identity>>>(StoreKey.RecentSearches) ?? [];
            const lastSearch = recentSearches[recentSearches.length - 1];
            if (!lastSearch || lastSearch.searchTerm !== searchData.searchTerm) {
                return console.error("[store/index] Could not store paginated data for ", searchData);
            }
            lastSearch.results.push(...searchData.results);
            set(StoreKey.RecentSearches, recentSearches);
            state.recentSearches = get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [];
        },

        clearRecentSearches(state: StoreI) {
            set<SearchData<Identity>[]>(StoreKey.RecentSearches, []);
            state.recentSearches = [];
        },

        paginateSearchResult(state: StoreI, page) {
            state.pagination = { totalPageCount: page.totalPageCount, previous: page.previous, next: page.next, currentPage: page.next - 1 || page.previous + 1 || 1 };
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
                return console.error("[store/index] No address given for chain: ", searchData.selectedChainKey);
            }
            const limit = 5;
            const page: Page<Identity> = await searchIdentities(wsAddress, searchData.searchTerm, currentPage, limit);
            console.log("[store/index] Got identities: ", page);


            context.commit("paginateSearchResult", page);
            searchData.results = page.items;
            if (currentPage === 1) {
                context.commit("storeAsRecentSearch", searchData);
            } else {
                context.commit("appendRecentSearch", searchData);
            }
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
            return await implementsIdentityPallet(wsAddress);
        }
    },
    modules: {}
});
