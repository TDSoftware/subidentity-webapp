<template>
    <Modal :open="open" @update:open="$emit('update:open', $event)">
        <template #title>
            {{ customNode ? "Edit" : "Add" }} your custom node
        </template>
        <template #body>
            <div class="row inputs">
                <div class="mb-3 col">
                    <label class="form-label fw-bold">Address</label>
                    <input
                        v-model="newCustomNodeAddress"
                        type="text"
                        class="form-control input-address"
                        placeholder="e.g.: wss://127.0.0.1:9944"
                        @keypress.enter="saveCustomNode"
                    />
                    <Alert class="mt-3" v-if="error" :message="error" />
                </div>
                <div
                    class="mb-3 col"
                    v-if="
                        customNode &&
                        newCustomNodeAddress === customNode.address
                    "
                >
                    <label class="form-label fw-bold">Name</label>
                    <input
                        v-model="customNode.name"
                        type="text"
                        class="form-control input-name"
                        placeholder="Name..."
                        disabled
                        readonly
                    />
                </div>
            </div>
            <div class="buttons">
                <div>
                    <button
                        class="btn btn-primary text-white d-block"
                        :disabled="busy"
                        @click="saveCustomNode"
                        ref="saveNode"
                    >
                        <Spinner v-if="busy" />
                        SAVE NODE
                    </button>
                </div>
                <div class="">
                    <button
                        class="btn btn-dark d-block"
                        :disabled="busy"
                        ref="cancelButton"
                        @click="closeCustomNode"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </template>
    </Modal>
</template>


<script lang="ts">
import { ChainInfo } from "@/util/chains";
import { set, remove, StoreKey } from "@/util/storage";
import { Options, Vue } from "vue-class-component";
import Modal from "../../common/Modal.vue";
import { getChainName } from "@npmjs_tdsoftware/subidentity";
import Spinner from "@/components/common/Spinner.vue";
import Alert from "@/components/common/Alert.vue";

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
        customNode: {
            type: Object,
            required: false
        }
    },
    watch: {
        newCustomNodeAddress() {
            this.error = "";
        }
    }
})
export default class CustomNodeModal extends Vue {
    customNode!: ChainInfo;
    open!: boolean;
    newCustomNodeAddress = "";
    busy = false;
    error = "";

    created() {
        this.newCustomNodeAddress = this.customNode?.address ?? "";
    }

    validateCustomNodeAddress() {
        return (
            this.newCustomNodeAddress.startsWith("wss://") ||
            this.newCustomNodeAddress.startsWith("ws://")
        );
    }

    closeCustomNode() {
        this.newCustomNodeAddress = this.customNode?.address ?? "";
        this.$emit("update:open", false);
    }

    async saveCustomNode() {
        this.busy = true;
        if (!this.newCustomNodeAddress) {
            try {
                remove(StoreKey.CustomNode);
                this.$emit("delete");
            } catch (e) {
                this.error =
                    "We had a problem deleting the custom node, please try again.";
            } finally {
                this.busy = false;
            }
        } else {
            try {
                if (!this.validateCustomNodeAddress()) {
                    throw new Error("InvalidAddressError");
                }

                const chainName = await getChainName(this.newCustomNodeAddress);
                const customNode = {
                    key: `customNode-${chainName}`,
                    name: chainName,
                    address: this.newCustomNodeAddress,
                    modifiedAt: Date.now()
                };
                set<ChainInfo>(StoreKey.CustomNode, customNode);
                this.$emit("save", customNode);
            } catch (e) {
                if (e.message === "InvalidAddressError")
                    this.error =
                        "The address is invalid. It should start with 'wss://'.";
                else
                    this.error =
                        "Could not reach your entered address. Please check again and enter a valid address.";
            } finally {
                this.busy = false;
            }
        }
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
