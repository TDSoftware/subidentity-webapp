import {mount} from "@vue/test-utils";
import router from "@/router";
import {store} from "@/store";
import HomeView from "@/views/SearchView.vue";

describe("AmazingButton.vue", () => {

    // Trigger Event and Check VueX Store Value

    it("should set isAuthenticated to true when login button is clicked", async () => {
        const wrapper = mount(HomeView, {
            global: {
                plugins: [router, store]
            }
        });

        expect(store.state.isAuthenticated).toBe(false);

        const loginButton = wrapper.find(".login-button");
        expect(loginButton.exists()).toBe(true);
        await loginButton.trigger("click");

        expect(store.state.isAuthenticated).toBe(true);
    });

});

