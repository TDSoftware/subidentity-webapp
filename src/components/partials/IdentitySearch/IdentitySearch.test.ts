import { mount } from "@vue/test-utils";
import IdentitySearch from "@/components/partials/IdentitySearch/IdentitySearch.vue";
import CustomNodeModal from "@/components/partials/IdentitySearch/CustomNodeModal.vue";
import CustomSelect from "@/components/common/CustomSelect.vue";
import { key, store } from "@/store";
import Vuex from "vuex";
import { get } from "@/util/storage";
import { mocked } from "jest-mock";
import { ChainInfo, chains } from "@/util/chains";

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
            attachTo: document.body,
            shallow: true
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

        it("should set chainOptions", async () => {

            expect(wrapper.vm.chainOptions).toEqual(chains.map((chainInfo: ChainInfo) => {
                return {
                    key: chainInfo.key,
                    displayValue: chainInfo.name,
                    subText: ""
                };
            }));

        });

        describe("when typing in search input", () => {
            it("should set searchTerm on keyup event", async () => {

                const onInputKeyUpMock = jest.spyOn(wrapper.vm, "onInputKeyUp");
                const searchInput = wrapper.find(".search-input");

                expect(searchInput.exists()).toBeTruthy();
                await searchInput.setValue("a");

                const myEvent = new KeyboardEvent("keyup");
                await searchInput.element.dispatchEvent(myEvent);

                expect(onInputKeyUpMock).toBeCalled();
                expect(wrapper.vm.searchTerm).toBe("a");
            });
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

        describe("When search button is not disabled", () => {
            beforeEach(() => {
                jest
                    .useFakeTimers()
                    .setSystemTime(new Date("2020-01-01"));
            });

            const searchButton = wrapper.find({
                ref: "searchButton"
            });

            it("should call submitIdentitySearch function and emit search event with correct search data", async () => {
                const busyMock = jest.fn();
                busyMock.mockReturnValue(false);
                wrapper.vm.store = new Vuex.Store({
                    getters: {
                        isBusy: busyMock
                    }
                });
                wrapper.vm.searchTerm = "test";
                wrapper.vm.selectedChainKey = "polkadot";
                wrapper.vm.implementsPallet = true;
                const submitIdentitySearchMock = jest.spyOn(wrapper.vm, "submitIdentitySearch");

                await wrapper.vm.$nextTick();
                await searchButton.trigger("click");

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
        describe("when 'update:selectedKey' event is emitted and selectedChainKey value is changed ", () => {
            it("should dispatch 'IDENTITY_PALLET_EXISTS' action ", async () => {
                wrapper.vm.store.dispatch = jest.fn();
                const checkIdentityPalletExistsMock = jest.spyOn(wrapper.vm, "checkIdentityPalletExists");

                const customSelect = wrapper.findComponent(CustomSelect);

                await wrapper.vm.$nextTick();
                await customSelect.vm.$emit("update:selectedKey");

                expect(checkIdentityPalletExistsMock).toBeCalled();
                expect(wrapper.vm.store.dispatch).toBeCalledWith(
                    "IDENTITY_PALLET_EXISTS",
                    wrapper.vm.selectedChainKey
                );
            });
        });
        describe("when clicking edit or add custom node ", () => {
            it("should open custom node modal", async () => {
                wrapper.vm.editCustomNodeModalOpen = false;
                const customNode = wrapper.find({
                    ref: "customNode"
                });

                const onEditCustomNodeClickMock = jest.spyOn(wrapper.vm, "onEditCustomNodeClick");

                await wrapper.vm.$nextTick();
                await customNode.trigger("click");

                expect(onEditCustomNodeClickMock).toBeCalled();
                expect(wrapper.vm.editCustomNodeModalOpen).toBe(true);

            });
        });

        describe("when save event is emitted", () => {
            it("should close custom node modal", async () => {
                wrapper.vm.editCustomNodeModalOpen = true;
                const customNodeModal = wrapper.findComponent(CustomNodeModal);

                await wrapper.vm.$nextTick();
                await customNodeModal.vm.$emit("save");

                expect(wrapper.vm.editCustomNodeModalOpen).toBe(false);
            });
        });
    });
});
