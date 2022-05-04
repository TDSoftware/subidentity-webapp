import { mount } from "@vue/test-utils";
import IdentitySearch from "@/components/partials/IdentitySearch.vue";
import { key, store } from "@/store";
import { set, get } from "@/util/storage";

jest.mock("@/util/storage");

import { mocked } from "jest-mock";

const mockedGet = mocked(get);
const mockedSet = mocked(set);

describe("IdentitySearch.vue", () => {
    describe("when search button is disabled", () => {
        it("should not dispatch SEARCH_IDENTITIES action", async () => {
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

    describe("When search button is clicked", () => {
        // mound the component and get the real store instance
        const wrapper = mount(IdentitySearch, {
            global: {
                plugins: [[store, key]]
            },
            // This is necessary for testing form submits on button "click"...
            attachTo: document.body
        });

        // This works only if "attachTo: document.body" is passed in mount() as option.
        const searchButton = wrapper.find({
            ref: "searchButton"
        });


        it("should dispatch SEARCH_IDENTITIES action", async () => {
            // Overwriting a method with a dummy (here the store dispatch)
            // On one hand this allows us to check if the function gets called
            // on the other hand we avoid, that e.g. the real store action (HTTP request or so) is triggered
            // mound the component and get the real store instance
            wrapper.vm.searchTerm = "test";
            wrapper.vm.selectedChainKey = "polkadot";
            wrapper.vm.store.dispatch = jest.fn();

            await wrapper.vm.$nextTick();
            await searchButton.trigger("click");

            // This would work always but isn't that nice.
            // We want our unit test to have an input and output: this time input is the click
            // event by the user and the output is the store method to be called.
            // await wrapper.find("form").trigger("submit");

            // Test if the dummy method gets called.
            expect((searchButton.element as HTMLInputElement).disabled).toBeFalsy();
            expect(wrapper.vm.store.dispatch).toBeCalledTimes(1);
        });


        it("should dispatch correct search term and selected chain", async () => {
            wrapper.vm.store.dispatch = jest.fn();

            await wrapper.vm.$nextTick();
            await searchButton.trigger("click");

            expect(wrapper.vm.store.dispatch).toBeCalledWith(
                "SEARCH_IDENTITIES",
                {
                    searchTerm: "test",
                    selectedChainKey: "polkadot"
                }
            );
        });


        it("should store search history to local storage", async () => {
            wrapper.vm.searchTerm = "search_term1";
            wrapper.vm.selectedChainKey = "polkadot";
            wrapper.vm.searchResult = 23;
            wrapper.vm.searchDate = "2022-05-01T03:54:55+0000";

            await wrapper.vm.$nextTick();
            await searchButton.trigger("click");

            expect(mockedSet).toHaveBeenCalledWith("recentSearchHistory", [{
                chainName: "polkadot",
                searchTerm: "search_term1",
                searchResult: 23,
                searchDate: "2022-05-01T03:54:55+0000"
            }
            ]);
        });


        describe("When search history contains 2 search histories already", () => {
            it("should add the new search history to the history", async () => {
                mockedGet.mockReturnValue([{
                    chainName: "polkadot",
                    searchTerm: "search_term1",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term2",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }]);

                wrapper.vm.searchTerm = "search_term3";
                wrapper.vm.selectedChainKey = "polkadot";
                wrapper.vm.searchResult = 23;
                wrapper.vm.searchDate = "2022-05-01T03:54:55+0000";

                await wrapper.vm.$nextTick();
                await searchButton.trigger("click");

                expect(mockedGet).lastReturnedWith([{
                    chainName: "polkadot",
                    searchTerm: "search_term1",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term2",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term3",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }]);
                expect(mockedSet).toHaveBeenCalledWith("recentSearchHistory", [{
                    chainName: "polkadot",
                    searchTerm: "search_term1",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term2",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term3",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }]);
            });
        });

        describe("When search history contains 3 search histories already", () => {
            it("should not add more than 3 search histories to the history and replace one with the new search history", async () => {
                mockedGet.mockReturnValue([{
                    chainName: "polkadot",
                    searchTerm: "search_term1",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term2",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term3",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }]);

                wrapper.vm.searchTerm = "new_search_term";
                wrapper.vm.selectedChainKey = "polkadot";
                wrapper.vm.searchResult = 23;
                wrapper.vm.searchDate = "2022-05-01T03:54:55+0000";

                await wrapper.vm.$nextTick();
                await searchButton.trigger("click");

                expect(mockedSet).toHaveBeenCalledWith("recentSearchHistory", [{
                    chainName: "polkadot",
                    searchTerm: "search_term2",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "search_term3",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }, {
                    chainName: "polkadot",
                    searchTerm: "new_search_term",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }]);
            });
        });

    });
});