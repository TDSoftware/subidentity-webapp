import { SearchData } from "@/interfaces/SearchData";
import { get, push, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";
import { searchIdentities } from "../../node_modules/subidentity-package/lib";
import { Page } from "../../node_modules/subidentity-package/src/types/Page";
import { Identity } from "../../node_modules/subidentity-package/src/types/Identity";


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
    getters: {},
    mutations: {

        login(state: StoreI) {
            state.isAuthenticated = true;
        },

        logout(state: StoreI) {
            state.isAuthenticated = false;
        },

        storeAsRecentSearch(state: StoreI, searchData: SearchData<Identity>) {

            // TODO: add some limit to the stored array...

            push(StoreKey.RecentSearches, searchData);
            state.recentSearches = get<SearchData<Identity>[]>(StoreKey.RecentSearches) ?? [];
        }
    },
    actions: {

        /**
         * @async
         */
        async SEARCH_IDENTITIES(context: ActionContext<StoreI, StoreI>, searchData: SearchData<Identity>): Promise<void> {

            // TODO: select WS based on selected chain...            

            const wsProvider = "wss://rpc.polkadot.io";
            const pageNumber = 1;
            const limit = 100;
            const page: Page<Identity> = await searchIdentities(wsProvider, searchData.searchTerm, pageNumber, limit);
            console.log("[store] Got identities based on search: ", page);

            searchData.results = page.items;
            context.commit("storeAsRecentSearch", searchData);
        }
    },
    modules: {}
});
