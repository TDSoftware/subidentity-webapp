import { mount } from "@vue/test-utils";
import IdentitySearch from "@/components/partials/IdentitySearch/IdentitySearch.vue";
import { key, store } from "@/store";
import { get } from "@/util/storage";


import { mocked } from "jest-mock";
jest.mock("@/util/storage");

const mockedGet = mocked(get);

describe("IdentitySearch.vue", () => {
    describe("when component is mounted", () => {

        const wrapper = mount(IdentitySearch, {
            global: {
                plugins: [[store, key]],
                stubs: {
                    IonIcon: true
                }
            },
            attachTo: document.body
        });

        it("should set searchTerm and selectedChainKey from the urlSearchParams", async () => {
            const location = {
                ...window.location,
                search: "?query=test&chain=kusama&page=1"
            };
            Object.defineProperty(window, "location", {
                writable: true,
                value: location
            });

            const wrapper = mount(IdentitySearch, {
                global: {
                    plugins: [[store, key]],
                    stubs: {
                        IonIcon: true
                    }
                },
                attachTo: document.body
            });

            expect(wrapper.vm.searchTerm).toBe("test");
            expect(wrapper.vm.selectedChainKey).toBe("kusama");

        });


        it("should load customNode from local storage", async () => {
            mockedGet.mockReturnValue({
                address: "chain-address",
                key: "customNode",
                modifiedAt: 1654785496261,
                name: "customNode"
            });

            const wrapper = mount(IdentitySearch, {
                global: {
                    plugins: [[store, key]],
                    stubs: {
                        IonIcon: true
                    }
                },
                attachTo: document.body
            });


            const expectedResult = {
                address: "chain-address",
                key: "customNode",
                modifiedAt: 1654785496261,
                name: "customNode"
            };
            expect(wrapper.vm.customNode).toEqual(expectedResult);
            expect(mockedGet).toHaveReturnedWith(expectedResult);
        });

        describe("when search button is disabled", () => {
            it("should not call submitIdentitySearch function", async () => {
                wrapper.vm.searchTerm = "";
                wrapper.vm.implementsPallet = false;
                const submitIdentitySearchMock = jest.spyOn(wrapper.vm, "submitIdentitySearch");

                expect(wrapper.vm.store.getters.isBusy).toBeTruthy();

                const searchButton = wrapper.find({
                    ref: "searchButton"
                });
                await searchButton.trigger("click");
                expect(wrapper.vm.store.getters.isBusy).toBeTruthy();
                expect((searchButton.element as HTMLInputElement).disabled).toBe(true);
                expect(submitIdentitySearchMock).toHaveBeenCalledTimes(0);
            });

        });
    });
}); 
