import { createStore } from "vuex";

export interface StoreI {
    isAuthenticated: boolean;
}

export default createStore({
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
    actions: {},
    modules: {}
});
