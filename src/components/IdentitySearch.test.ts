import {mount} from "@vue/test-utils";
import IdentitySearch from "@/components/IdentitySearch.vue";
import {key} from "@/store";
import {createStore} from "vuex";


describe("IdentitySearch.vue", () => {
    describe("When search button is submitted", () => {


        it("should dispatch action", async () => {
            const store = createStore({});

            // Arrange
            const wrapper = mount(IdentitySearch, {
                global: {
                    plugins: [[store, key]]
                }
            });
            // const spyDispatch = jest.spyOn(wrapper.vm.store, "dispatch").mockImplementation();
            const spyDispatch = (wrapper.vm.store.dispatch = jest.fn());
            const spy = (wrapper.vm.onSubmitIdentitySearch = jest.fn());

            // const searchButton = wrapper.find({
            //     ref: "searchButton"
            // });

            // Action or Act
            // await searchButton.trigger("click");
            await wrapper.find("form").trigger("submit.prevent");


            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spyDispatch).toHaveBeenCalledTimes(1);
        });
    });


});

