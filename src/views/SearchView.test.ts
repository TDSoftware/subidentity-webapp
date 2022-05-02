import {shallowMount} from "@vue/test-utils";
import SearchView from "@/views/SearchView.vue";
import {get, set} from "@/util/storage";

jest.mock("@/util/storage");
import {mocked} from "jest-mock";

const mockedGet = mocked(get);

describe("SearchView.vue", () => {
    describe("When SearchView is created", () => {
        describe("And there is 1 search terms in history", () => {
            it("should get 1 search terms from local storage And recentSearches array should not be empty", () => {
                mockedGet.mockReturnValue([{
                    chainName: "polkadot",
                    searchTerm: "search_term1",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }]);

                const wrapper = shallowMount(SearchView);

                const expectedResult = [{
                    chainName: "polkadot",
                    searchTerm: "search_term1",
                    searchResult: 23,
                    searchDate: "2022-05-01T03:54:55+0000"
                }];
                expect(wrapper.vm.recentSearches).toEqual(expectedResult);
                expect(mockedGet).toHaveReturnedWith(expectedResult);
            });
        });

        describe("And there is 0 search terms in history", () => {
            it("should get empty search terms from local storage And recentSearches array should be empty", () => {
                mockedGet.mockReturnValue([]);
                const wrapper = shallowMount(SearchView);
                expect(wrapper.vm.recentSearches).toEqual([]);
                expect(mockedGet).toHaveReturnedWith([]);
            });
        });
    });
});