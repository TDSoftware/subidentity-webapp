<template>
    <Modal :open="open" @update:open="$emit('update:open', $event)">
        <template #title>
            {{ customNode ? "Edit" : "Add" }} your custom node
        </template>
        <template #body>
            <div class="row">
                <div class="mb-3 col">
                    <label class="form-label">Address</label>
                    <input
                        v-model="newCustomNodeAddress"
                        type="text"
                        class="form-control"
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
                    <label class="form-label">Name</label>
                    <input
                        v-model="customNode.name"
                        type="text"
                        class="form-control"
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
                        :disabled="!newCustomNodeAddress || busy"
                        @click="saveCustomNode"
                    >
                        <Spinner v-if="busy" />
                        SAVE NODE
                    </button>
                </div>
                <div class="">
                    <button
                        class="btn btn-dark d-block"
                        :disabled="busy"
                        @click="$emit('update:open', false)"
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
import { set, StoreKey } from "@/util/storage";
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
            required: true
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

    async saveCustomNode() {
        this.busy = true;
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
</script>


<style lang="scss" scoped>
@import "../../../styles/variables";

input {
    border: solid 1px #dee2e6 !important;
}

.buttons {
    margin-top: 1rem;
    & > div {
        &:first-child {
            margin-bottom: 0.75rem;
        }
        button {
            display: block;
            width: 100%;
        }
    }
    @include media-breakpoint-up(md) {
        display: flex;
        flex-direction: row;
        & > div {
            margin-right: 1rem;
            button {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
            }
        }
    }
}
</style>
