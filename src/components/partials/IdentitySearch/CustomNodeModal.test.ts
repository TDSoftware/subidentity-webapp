import { mount } from "@vue/test-utils";
import CustomNodeModal from "@/components/partials/IdentitySearch/CustomNodeModal.vue";
import { set } from "@/util/storage";
import { getChainName } from "@npmjs_tdsoftware/subidentity";
import { mocked } from "jest-mock";


jest.mock("@/util/storage");
jest.mock("@npmjs_tdsoftware/subidentity");

const mockedSet = mocked(set);
const mockedGetChainName = mocked(getChainName);

describe("CustomNodeModal.vue", () => {
    const wrapper = mount(CustomNodeModal, {
        props: {
            open: true,
            customNode: { key: "customNode", name: "custom node name", address: "wss://fake.io", modifiedAt: 1653917024783 }
        },
        global: {
            stubs: {
                IonIcon: true
            }
        },
        attachTo: document.body
    });

    const saveNodeButton = wrapper.find({
        ref: "saveNode"
    });
    describe("when clicking save node button", () => {
        beforeEach(() => {
            mockedGetChainName.mockResolvedValue("fake-chain");
            jest
                .useFakeTimers()
                .setSystemTime(new Date("2020-01-01"));
        });

        it("should check if custom node address starts with ws:// or wss://", async () => {
            wrapper.vm.newCustomNodeAddress = "wss://fake.io";
            const validateCustomNodeMock = jest.spyOn(wrapper.vm, "validateCustomNodeAddress");

            await wrapper.vm.$nextTick();
            await saveNodeButton.trigger("click");

            expect(validateCustomNodeMock).toBeCalled();
            expect(validateCustomNodeMock).toHaveLastReturnedWith(true);

        });

        it("should get the chain name and set the custom node to localstorage", async () => {
            await wrapper.vm.$nextTick();
            await saveNodeButton.trigger("click");
            expect(mockedSet).toHaveBeenCalledWith("CustomNode", {
                key: "customNode-fake-chain",
                name: "fake-chain",
                address: "wss://fake.io",
                modifiedAt: 1577836800000
            });
        });

        it("should emit save event", async () => {
            await wrapper.vm.$nextTick();
            await saveNodeButton.trigger("click");
            expect(wrapper.emitted()["save"]).toBeTruthy();
            const eventArgs = (wrapper.emitted()["save"][0] as string[]);
            expect(eventArgs).toStrictEqual([{
                key: "customNode-fake-chain",
                name: "fake-chain",
                address: "wss://fake.io",
                modifiedAt: 1577836800000
            }]);
        });

    });

    describe("when clicking save node button and address is invalid", () => {
        it("should set error to -> The address is invalid. It should start with 'wss://'", async () => {
            wrapper.vm.newCustomNodeAddress = "asbj";
            const validateCustomNodeMock = jest.spyOn(wrapper.vm, "validateCustomNodeAddress");
            await wrapper.vm.$nextTick();
            await saveNodeButton.trigger("click");
            expect(validateCustomNodeMock).toBeCalled();
            expect(wrapper.vm.error).toEqual("The address is invalid. It should start with 'wss://'.");
        });
    });

    describe("when clicking save node button and address is not found", () => {
        it("should set error to -> Could not reach your entered address. Please check again and enter a valid address.", async () => {
            wrapper.vm.newCustomNodeAddress = "wss://";
            const validateCustomNodeMock = jest.spyOn(wrapper.vm, "validateCustomNodeAddress");
            mockedGetChainName.mockRejectedValue(new Error());
            await wrapper.vm.$nextTick();
            await saveNodeButton.trigger("click");
            expect(validateCustomNodeMock).toBeCalled();
            expect(wrapper.vm.error).toEqual("Could not reach your entered address. Please check again and enter a valid address.");
        });
    });
    describe("when custom node modal is created", () => {
        it("should set the current custom node address value from the props if exists.", async () => {
            const wrapper = mount(CustomNodeModal, {
                props: {
                    open: true,
                    customNode: { key: "customNode", name: "custom node name", address: "wss://fake.io", modifiedAt: 1653917024783 }
                },
                global: {
                    stubs: {
                        IonIcon: true
                    }
                },
                attachTo: document.body
            });
            expect(wrapper.vm.newCustomNodeAddress).toBe("wss://fake.io");
        });
    });
    describe("when clicking cancel button", () => {
        it("should emit event to close the modal.", async () => {
            const cancelButton = wrapper.find({
                ref: "cancelButton"
            });
            await wrapper.vm.$nextTick();
            await cancelButton.trigger("click");

            expect(wrapper.emitted()["update:open"]).toBeTruthy();
            const eventArgs = (wrapper.emitted()["update:open"][0] as string[]);
            expect(eventArgs[0]).toBe(false);
        });
    });
});