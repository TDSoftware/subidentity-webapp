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
        isAuthenticated: true
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
        searchIdentities() {
            // search identities logic
            console.error("real store called");
        }
    },
    modules: {}
});

