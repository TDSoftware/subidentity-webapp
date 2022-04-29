import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from "vuex";

export interface StoreI {
    isAuthenticated: boolean;
    isMobileScreen: boolean;
}

export const key: InjectionKey<Store<StoreI>> = Symbol();

export const useStore = () => {
    return baseUseStore(key);
};

export const store = createStore({
    state: {
        isAuthenticated: false,
        isMobileScreen: false
    },
    getters: {},
    mutations: {
        LOGIN(state: StoreI) {
            state.isAuthenticated = true;
        },
        LOGOUT(state: StoreI) {
            state.isAuthenticated = false;
        },
        SET_IS_MOBILE_SCREEN(state: StoreI, isMobile: boolean) {
            state.isMobileScreen = isMobile;
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
