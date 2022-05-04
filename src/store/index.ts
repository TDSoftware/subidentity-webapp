import { Identity } from "@/interfaces/Identity";
import { SearchData } from "@/interfaces/SearchData";
import { get, push, StoreKey } from "@/util/storage";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store, ActionContext } from "vuex";

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
        SEARCH_IDENTITIES(context: ActionContext<StoreI, StoreI>, searchData: SearchData<Identity>): Promise<void> {
            return new Promise((resolve) => {
                setTimeout(() => {

                    // TODO: call subidentity NPM packs API to search identities with search string

                    // TODO: remove fake timeout delay

                    searchData.results = [
                        {
                            chain: searchData.selectedChainKey,
                            basicInfo: {},
                            judgements: ["yeah", "uuh"],
                            balance: {}
                        },
                        {
                            chain: searchData.selectedChainKey,
                            basicInfo: {},
                            judgements: ["yeah", "uuh"],
                            balance: {}
                        }
                    ];

                    context.commit("storeAsRecentSearch", searchData);
                    resolve();

                }, 2000);
            });
        }
    },
    modules: {}
});
