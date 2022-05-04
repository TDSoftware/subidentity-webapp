import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from "vuex";

export interface StoreI {
    isAuthenticated: boolean;
}

export const key: InjectionKey<Store<StoreI>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
};

export const store = createStore({
    state: {
        isAuthenticated: false
    },
    getters: {},
    mutations: {
        login(state: StoreI) {
            state.isAuthenticated = true;
        },
        logout(state: StoreI) {
            state.isAuthenticated = false;
        }
    },
    actions: {

        /**
         * @async
         */
        SEARCH_IDENTITIES(): Promise<void> {            
            return new Promise((resolve) => {

                // TODO: call subidentity NPM packs API to search identities with search string

                // TODO: remove fake timeout delay

                setTimeout(resolve, 2000);
            });
        }
    },
    modules: {}
});
