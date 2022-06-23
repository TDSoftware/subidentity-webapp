<template>
    <Modal :open="open" @update:open="closeSendToken()">
        <template #title> Transfer Token </template>
        <template v-if="isTransferSuccessful || isTransferFail" #body>
            <div v-if="isTransferSuccessful" class="mb-4">
                <Alert
                    :isError="false"
                    :message="`${identity.balance.symbol} ${tokenAmount} were send
                successfully to ${identity.basicInfo.display}`"
                />
            </div>
            <div v-if="isTransferFail" class="mb-4">
                <Alert :message="error" :isError="true" />
            </div>
            <div class="buttons">
                <button
                    class="btn btn-dark d-block"
                    :disabled="busy"
                    @click="closeSendToken"
                >
                    Close
                </button>
            </div>
        </template>
        <template v-else #body>
            <div class="row inputs">
                <div class="mb-3 col">
                    <span v-if="web3Accounts.length > 1">
                        <label class="form-label fw-bold"
                            >Choose your account</label
                        >
                        <div
                            v-for="(account, i) of web3Accounts"
                            :key="i"
                            class="form-check"
                        >
                            <input
                                class="form-check-input"
                                type="radio"
                                name="flexRadio"
                                :id="account.address"
                                :value="account.address"
                                @change="onSelectAccount"
                            />
                            <label class="form-check-label">
                                {{ account.meta.name }}
                            </label>
                        </div>
                    </span>

                    <div class="mb-3 col" v-else>
                        <label class="form-label fw-bold">Your account</label>
                        <div v-for="(account, i) of web3Accounts" :key="i">
                            {{ account.meta.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row inputs">
                <div class="mb-3 col">
                    <label class="form-label fw-bold"
                        >Amount in {{ identity.balance.symbol }}</label
                    >
                    <input
                        v-model="tokenAmount"
                        type="text"
                        class="form-control input-address"
                        placeholder="0.00"
                        @keypress.enter="sendToken"
                    />
                </div>
                <div class="mb-3 col">
                    <label class="form-label fw-bold">Receiver</label>
                    <div>{{ identity.basicInfo.display }}</div>
                    <div class="text-muted" style="overflow-wrap: anywhere">
                        {{ identity.basicInfo.address }}
                    </div>
                </div>
            </div>
            <Alert
                class="mt-3 mb-3"
                v-if="error"
                :message="error"
                :isError="true"
            />

            <div class="buttons">
                <div>
                    <button
                        class="btn btn-primary text-white d-block"
                        :disabled="busy"
                        @click="sendToken"
                    >
                        <Spinner v-if="busy" />
                        TRANSFER
                    </button>
                </div>
                <div class="">
                    <button
                        class="btn btn-dark d-block"
                        :disabled="busy"
                        @click="closeSendToken"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "../../common/Modal.vue";
import Spinner from "@/components/common/Spinner.vue";
import Alert from "@/components/common/Alert.vue";
import { Identity } from "@npmjs_tdsoftware/subidentity";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useStore } from "../../../store";

@Options({
    components: {
        Modal,
        Spinner,
        Alert
    },
    props: {
        open: {
            type: Boolean,
            required: true
        },
        identity: {
            type: Object,
            required: true
        },
        web3Accounts: {
            type: Array,
            required: true
        }
    },
    watch: {
        web3Accounts() {
            this.setWeb3Account();
        }
    }
})
export default class SendTokenModal extends Vue {
    identity!: Identity;
    open!: boolean;
    tokenAmount = "";
    error = "";
    selectedAccount = "";
    web3Accounts!: InjectedAccountWithMeta[];
    store = useStore();

    created() {
        this.setWeb3Account();
    }

    setWeb3Account() {
        if (this.web3Accounts.length === 1) {
            this.selectedAccount = this.web3Accounts[0].address;
        } else this.selectedAccount = "";
    }

    onSelectAccount(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        this.selectedAccount = target.value;
    }

    async sendToken() {
        this.error = "";
        if (this.validate()) {
            try {
                await this.store.dispatch("SEND_TOKEN", {
                    chain: this.identity.chain?.toLowerCase(),
                    senderAddress: this.selectedAccount,
                    receiverAddress: this.identity.basicInfo.address,
                    //--TODO -- calculate correct amount based on chain decimals
                    amount: this.tokenAmount
                });
            } catch (error) {
                if (error.message === "Error: Cancelled") {
                    this.error = "The transaction was cancelled";
                } else if (
                    error.message ===
                    "RpcError: 1010: Invalid Transaction: Inability to pay some fees , e.g. account balance too low"
                ) {
                    this.error =
                        "The transaction was unsuccessful: Inability to pay some fees";
                } else {
                    this.error =
                        "The transaction was unsuccessful, please try again";
                }
            }
        }
    }

    closeSendToken() {
        this.tokenAmount = "";
        this.error = "";
        this.$emit("update:open", false);
        this.store.commit("setTransferTokenSuccessStatus", false);
        this.store.commit("setTransferTokenErrorStatus", false);
    }

    get busy() {
        return this.store.getters.isBusy;
    }

    get isTransferSuccessful() {
        return this.store.state.isTransferTokenSuccess;
    }

    get isTransferFail() {
        return this.store.state.isTransferTokenError;
    }

    validate() {
        //TODO-- check the balance of the sender account.
        const positiveFloat = new RegExp(
            "^(?=.+)(?:[1-9]\\d*)?(?:(\\.\\d+)|(0\\.\\d*[1-9]+\\d*))?$"
        );
        if (!positiveFloat.test(this.tokenAmount)) {
            this.error = "Please insert a positive float as token amount.";
            return false;
        }
        if (this.selectedAccount === "") {
            this.error = "Please choose an account to transfer token from";
            return false;
        }
        return true;
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/variables";
.input-address {
    border: solid 1px #dee2e6 !important;
}

.input-name {
    border-style: none;
    background: none;
    padding-left: 0;
}

.buttons {
    display: flex;
    flex-direction: row;
    & > div {
        margin-right: 1rem;
    }
}

@include media-breakpoint-down(lg) {
    .buttons {
        margin-top: 1rem;
        & > div {
            width: 100%;
            &:first-child {
                margin-bottom: 0.75rem;
            }
            button {
                width: 100%;
                display: flex;
                flex-direction: row;
            }
        }
    }
}

@include media-breakpoint-down(lg) {
    .inputs {
        display: flex;
        flex-direction: column;
    }
}
</style>

