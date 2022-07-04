import { mount } from "@vue/test-utils";
import SendTokenModal from "@/components/partials/profile/SendTokenModal.vue";

import { key, store } from "@/store";

describe("SendTokenModal.vue", () => {

    const wrapper = mount(SendTokenModal, {
        props: {
            open: true,
            web3Accounts: [{ address: "dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd", meta: { genesisHash: null, name: "account name", source: "polkadot-js" }, type: "wh489" }, { address: "jsnsji3344mazsnxdskmjk2938snksnsjdknskdnds", meta: { genesisHash: null, name: "account name", source: "polkadot-js" }, type: "wh489" }],
            identity: {
                balance: { total: "878.23", symbol: "WND" },
                basicInfo: { display: "name", address: "jeeijriejjksnd8439sdjnsnksnjfkndkfj", riot: "@email.com", twitter: "@name", web: "https://web.com" },
                chain: "chain",
                judgements: ["Reasonable"]
            }
        },
        global: {
            plugins: [[store, key]]
        },
        attachTo: document.body
    });
    describe("when number of accounts are geater than 1", () => {
        const accountsInput = wrapper.find(".form-check-input");
        it("should show radio buttons for account selection", async () => {
            expect(accountsInput.exists()).toBeTruthy();
        });

        it("should trigger change event on account selection and set selected account with the selected account's address", async () => {
            const onSelectAccountMock = jest.spyOn(wrapper.vm, "onSelectAccount");

            await accountsInput.setValue("dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd");
            await wrapper.vm.$nextTick();
            await accountsInput.trigger("change");

            expect(onSelectAccountMock).toBeCalled();
            expect(wrapper.vm.selectedAccount).toBe("dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd");
        });
    });
    describe("when clicking transfer button", () => {
        it("should dispatch SEND_TOKEN action with correct token amount and correct account address", async () => {
            wrapper.vm.selectedAccount = "dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd";
            wrapper.vm.tokenAmount = "1";
            wrapper.vm.store.dispatch = jest.fn();
            const sendTokenMock = jest.spyOn(wrapper.vm, "sendToken");

            const sendTokenButton = wrapper.find({
                ref: "sendTokenButton"
            });

            await wrapper.vm.$nextTick();
            await sendTokenButton.trigger("click");

            expect(sendTokenMock).toBeCalled();
            expect(wrapper.vm.store.dispatch).toBeCalledWith(
                "SEND_TOKEN",
                {
                    chain: "chain",
                    senderAddress: "dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd",
                    receiverAddress: "jeeijriejjksnd8439sdjnsnksnjfkndkfj",
                    amount: "1"
                }
            );
        });

        it("should not dispatch SEND_TOKEN action when amount is not positive float and account address is empty", async () => {
            wrapper.vm.selectedAccount = "";
            wrapper.vm.tokenAmount = "-1";
            wrapper.vm.store.dispatch = jest.fn();
            const sendTokenMock = jest.spyOn(wrapper.vm, "sendToken");

            const sendTokenButton = wrapper.find({
                ref: "sendTokenButton"
            });

            await wrapper.vm.$nextTick();
            await sendTokenButton.trigger("click");

            expect(sendTokenMock).toBeCalled();
            expect(wrapper.vm.store.dispatch).not.toBeCalledWith(
                "SEND_TOKEN",
                {
                    chain: "chain",
                    senderAddress: "",
                    receiverAddress: "jeeijriejjksnd8439sdjnsnksnjfkndkfj",
                    amount: "-1"
                }
            );
        });
    });
    describe("when clicking cancel button", () => {
        const cancelButton = wrapper.find({
            ref: "cancelButton"
        });

        it("should set tokenAmount and error variables values to empty ", async () => {
            wrapper.vm.selectedAccount = "dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd";
            wrapper.vm.tokenAmount = "1";
            const closeSendTokenMock = jest.spyOn(wrapper.vm, "closeSendToken");

            await wrapper.vm.$nextTick();
            await cancelButton.trigger("click");

            expect(closeSendTokenMock).toBeCalled();
            expect(wrapper.vm.tokenAmount).toBe("");
            expect(wrapper.vm.error).toBe("");
        });

        it("should emit update:open event to close SendTokenModal", async () => {
            const closeSendTokenMock = jest.spyOn(wrapper.vm, "closeSendToken");

            await wrapper.vm.$nextTick();
            await cancelButton.trigger("click");

            expect(closeSendTokenMock).toBeCalled();
            expect(wrapper.emitted()["update:open"]).toBeTruthy();
            const eventArgs = (wrapper.emitted()["update:open"][0] as string[]);
            expect(eventArgs[0]).toBe(false);
        });

        it("should change 'isTransferTokenSuccess' and 'transferTokenError' store values", async () => {
            wrapper.vm.store.commit = jest.fn();
            const closeSendTokenMock = jest.spyOn(wrapper.vm, "closeSendToken");

            await wrapper.vm.$nextTick();
            await cancelButton.trigger("click");

            expect(closeSendTokenMock).toBeCalled();
            expect(wrapper.vm.store.commit).toBeCalledWith(
                "setTransferTokenSuccessStatus",
                false
            );
            expect(wrapper.vm.store.commit).toBeCalledWith(
                "setTransferTokenError",
                ""
            );
        });
    });
    describe("when component is mounted and number of account is one", () => {
        const wrapper = mount(SendTokenModal, {
            props: {
                open: true,
                web3Accounts: [{ address: "jsnsji3344mazsnxdskmjk2938snksnsjdknskdnds", meta: { genesisHash: null, name: "account name", source: "polkadot-js" }, type: "wh489" }],
                identity: {
                    balance: { total: "878.23", symbol: "WND" },
                    basicInfo: { display: "name", address: "dsnjsmdsndjiue4j34idnjnjkdnkjdfjk349dnkd", riot: "@email.com", twitter: "@name", web: "https://web.com" },
                    chain: "chain",
                    judgements: ["Reasonable"]
                }
            },
            global: {
                plugins: [[store, key]]
            },
            attachTo: document.body
        });

        it("should set selected account value with the account's address from props", async () => {
            expect(wrapper.vm.selectedAccount).toBe("jsnsji3344mazsnxdskmjk2938snksnsjdknskdnds");
        });
    });
});
