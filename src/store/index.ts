import { SearchData } from "@/interfaces/SearchData";
import { get, push, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";
import { Identity, Page, searchIdentities } from "@npmjs_tdsoftware/subidentity";
import { getChainAddress } from "@/util/chains";


export interface StoreI {
    isAuthenticated: boolean;
    recentSearches: SearchData<Identity>[];
    currentSearch?: SearchData<Identity>;
}

export const key: InjectionKey<Store<StoreI>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
};

export const store = createStore({
    state: {
        isAuthenticated: false,
        recentSearches: get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? []
    },
    getters: {

        lastSearchResults(state: StoreI) {
            return state.recentSearches[
                state.recentSearches.length - 1
            ]?.results ?? [];
        },

        lastSearchTerm(state: StoreI) {
            return state.recentSearches[
                state.recentSearches.length - 1
            ]?.searchTerm;
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
        }
    },
    actions: {

        /**
         *  This action calls fetches the queried identities from chain 
         *  and commits those to the store state under "recentSearches".
         * 
         *  --> all recentSearches are store in localStorage and allow client side caching.
         */
        async SEARCH_IDENTITIES(context: ActionContext<StoreI, StoreI>, searchData: SearchData<Identity>): Promise<void> {
            const wsProvider = getChainAddress(searchData.selectedChainKey);
            if (!wsProvider) {
                return console.error("[store/index] No address given for chain: ", searchData.selectedChainKey);
            }
            const pageNumber = 1;
            const limit = 100;
            const page: Page<Identity> = await searchIdentities(wsProvider, searchData.searchTerm, pageNumber, limit);
            console.log("[store/index] Got identities: ", page);

            // // TODO: implement pagination

            searchData.results = page.items;
            context.commit("storeAsRecentSearch", searchData);
        }
    },
    modules: {}
});
