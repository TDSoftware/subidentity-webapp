import {mount} from "@vue/test-utils";
import IdentitySearch from "@/components/IdentitySearch.vue";
import {key, store} from "@/store";

describe("IdentitySearch.vue", () => {
    describe("when search button is disabled", () => {
        it("should not dispatch SEARCH_IDENDITIES action", async () => {
            // mound the component and get the real store instance
            const wrapper = mount(IdentitySearch, {
                global: {
                    plugins: [[store, key]]
                },
                attachTo: document.body
            });

            wrapper.vm.searchTerm = "";
            wrapper.vm.store.dispatch = jest.fn();

            const searchButton = wrapper.find({
                ref: "searchButton"
            });
            await searchButton.trigger("click");

            expect((searchButton.element as HTMLInputElement).disabled).toBe(true);
            expect(wrapper.vm.store.dispatch).toHaveBeenCalledTimes(0);
        });

    });

    describe("When search button is enabled", () => {
        // mound the component and get the real store instance
        const wrapper = mount(IdentitySearch, {
            global: {
                plugins: [[store, key]]
            },
            // This is necessary for testing form submits on button "click"...
            attachTo: document.body
        });

        it("should dispatch SEARCH_IDENDITIES action", async () => {
            // Overwriting a method with a dummy (here the store dispatch)
            // On one hand this allows us to check if the function gets called
            // on the other hand we avoid, that e.g. the real store action (HTTP request or so) is triggered
            // mound the component and get the real store instance
            wrapper.vm.searchTerm = "test";
            wrapper.vm.selectedChainKey = "all";
            wrapper.vm.store.dispatch = jest.fn();

            // This works only if "attachTo: document.body" is passed in mount() as option.
            const searchButton = wrapper.find({
                ref: "searchButton"
            });
            await wrapper.vm.$nextTick();
            await searchButton.trigger("click");

            // This would works always but isn't that nice.
            // We want our unit test to have an input and output: this time input is the click
            // event by the user and the output is the store method to be called.
            // await wrapper.find("form").trigger("submit");

            // Test if the dummy method gets called.
            expect((searchButton.element as HTMLInputElement).disabled).toBeFalsy();
            expect(wrapper.vm.store.dispatch).toBeCalledTimes(1);
        });


        it("should dispatch correct search term and selected chain", async () => {
            wrapper.vm.store.dispatch = jest.fn();
            const searchButton = wrapper.find({
                ref: "searchButton"
            });
            await wrapper.vm.$nextTick();
            await searchButton.trigger("click");

            expect(wrapper.vm.store.dispatch).toBeCalledWith(
                "SEARCH_IDENDITIES",
                {
                    searchTerm: "test",
                    selectedChainKey: "all"
                }
            );
        });
    });
});