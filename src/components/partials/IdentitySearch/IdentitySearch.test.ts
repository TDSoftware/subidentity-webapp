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
            it("should not call submitIdntitySearch function", async () => {
                wrapper.vm.searchTerm = "";
                wrapper.vm.implementsPallet = false;
                const submitIdentitySearchMock = jest.spyOn(wrapper.vm, "submitIdentitySearch");

                const searchButton = wrapper.find({
                    ref: "searchButton"
                });
                await searchButton.trigger("click");
                expect(wrapper.vm.store.getters.isBusy).toBeTruthy();
                expect((searchButton.element as HTMLInputElement).disabled).toBe(true);
                expect(submitIdentitySearchMock).toHaveBeenCalledTimes(0);
            });

        });

        describe("When search button is not disabled", () => {
            // This works only if "attachTo: document.body" is passed in mount() as option.
            beforeEach(() => {
                jest
                    .useFakeTimers()
                    .setSystemTime(new Date("2020-01-01"));
            });

            const searchButton = wrapper.find({
                ref: "searchButton"
            });

            it("should call submitIdentitySearch function and emit search event with correct search data", async () => {
                wrapper.vm.searchTerm = "test";
                wrapper.vm.selectedChainKey = "polkadot";
                wrapper.vm.implementsPallet = true;
                const submitIdentitySearchMock = jest.spyOn(wrapper.vm, "submitIdentitySearch");

                await wrapper.vm.$nextTick();
                await searchButton.trigger("click");
                // console.log(wrapper.vm.store.getters.isBusy);
                // expect(wrapper.vm.store.getters.isBusy).toBeFalsy();


                expect((searchButton.element as HTMLInputElement).disabled).toBeFalsy();
                expect(submitIdentitySearchMock).toBeCalled();
                expect(wrapper.emitted()["search"]).toBeTruthy();
                const eventArgs = (wrapper.emitted()["search"][0] as string[]);
                expect(eventArgs).toStrictEqual([{
                    searchTerm: "test",
                    selectedChainKey: "polkadot",
                    results: [],
                    totalItemCount: 0,
                    timestamp: 1577836800000
                }]);
            });
        });
    });
}); 