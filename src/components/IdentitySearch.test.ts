import {mount} from "@vue/test-utils";
import IdentitySearch from "@/components/IdentitySearch.vue";
import {key, store} from "@/store";

describe("IdentitySearch.vue", () => {
    describe("When search button is submitted", () => {
        it("should dispatch action", async () => {

            // mound the component and get the real store instance
            const wrapper = mount(IdentitySearch, {
                global: {
                    plugins: [[store, key]]
                },

                // This is necessary for testing form submits on button "click"...
                attachTo: document.body
            });

            // Overwriting a method with a dummy (here the store dispatch)
            // On one hand this allows us to check if the function gets called
            // on the other hand we avoid, that e.g. the real store action (HTTP request or so) is triggered
            wrapper.vm.store.dispatch = jest.fn();
      
            // Some easy test
            expect(store.state.isAuthenticated).toBe(false);

            // This works only if "attachTo: document.body" is passed in mount() as option.
            const searchButton = wrapper.find({
                ref: "searchButton"
            });
            await searchButton.trigger("click");

            // This would works always but isn't that nice.
            // We want our unit test to have an input and output: this time input is the click 
            // event by the user and the output is the store method to be called.
            // await wrapper.find("form").trigger("submit");

            // Some easy test
            expect(store.state.isAuthenticated).toBe(true);

            // Test if the dummy method gets called.
            expect(wrapper.vm.store.dispatch).toBeCalled();

        });
    });
});

