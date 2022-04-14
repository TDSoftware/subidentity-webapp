import {mount} from "@vue/test-utils";
import App from "@/App.vue";
import router from "@/router";

describe("App.vue", () => {




    // SETUP VueX store and expect rendered UI

    it("Renders 'About' button text if authenticated.", () => {
        const $store = {
            state: {
                isAuthenticated: true
            },
            commit: jest.fn()
        };
        const wrapper = mount(App, {
            global: {
                plugins: [router],
                mocks: {
                    $store
                }
            }
        });
        expect(wrapper.text()).toContain("About");
    });

    // Negative test !!!

    it("NOT renders 'About' button text if NOT authenticated.", () => {
        const $store = {
            state: {
                isAuthenticated: false
            },
            commit: jest.fn()
        };
        const wrapper = mount(App, {
            global: {
                plugins: [router],
                mocks: {
                    $store
                }
            }
        });
        expect(wrapper.text()).not.toContain("About");
    });

});

