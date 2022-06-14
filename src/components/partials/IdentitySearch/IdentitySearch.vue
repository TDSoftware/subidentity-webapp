<template>
    <form @submit.prevent="submitIdentitySearch">
        <div class="bg-white shadow text-dark p-0 rounded search-container">
            <div class="row align-items-center">
                <div class="col-lg col-12">
                    <div class="input-group">
                        <span class="input-group-text fw-light text-muted">
                            <img
                                src="../../../assets/icons/search-outline-muted.svg"
                                class="fw-light text-muted"
                            />
                        </span>
                        <input
                            :disabled="busy"
                            autofocus
                            class="form-control text-muted search-input"
                            placeholder="Search for a Name, E-Mail, Address"
                            type="text"
                            :value="searchTerm"
                            @keyup="onInputKeyUp"
                        />
                    </div>
                </div>
                <div
                    class="col-lg-3 col-12 custom-select-container"
                    :class="{ disabled: busy }"
                >
                    <CustomSelect
                        :options="chainOptions"
                        class="select"
                        v-model:selected-key="selectedChainKey"
                    />
                </div>
                <div
                    class="col-lg col-12 edit-node-button-col"
                    @click="onEditCustomNodeClick"
                    :class="{ disabled: busy }"
                >
                    <img
                        v-if="customNode"
                        src="../../../assets/icons/create-outline-primary.svg"
                        class="custom-icon"
                    />
                    <img
                        v-else
                        src="../../../assets/icons/add-circle-outline-sub.svg"
                        class="custom-icon"
                    />
                    <span> {{ customNode ? "Edit" : "" }} Custom Node </span>
                </div>
                <div class="col d-grid mx-auto search-button-col">
                    <button
                        ref="searchButton"
                        :disabled="submitButtonDisabled"
                        class="btn btn-primary fw-normal text-white"
                        type="submit"
                    >
                        <Spinner v-if="busy" />
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    </form>
    <CustomNodeModal
        v-model:open="editCustomNodeModalOpen"
        :custom-node="customNode"
        @save="onCustomNodeSaved"
        @delete="onCustomNodeSaved"
    />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomSelect from "@/components/common/CustomSelect.vue";
import { useStore } from "../../../store";
import Spinner from "../../common/Spinner.vue";
import { SearchData } from "../../../interfaces/SearchData";
import { ChainInfo, chains } from "../../../util/chains";
import { UISelectOption } from "@/interfaces/UISelectOption";
import { get, StoreKey } from "@/util/storage";
import CustomNodeModal from "./CustomNodeModal.vue";

@Options({
    components: {
        CustomSelect,
        Spinner,
        CustomNodeModal
    },
    watch: {
        selectedChainKey() {
            this.checkIdentityPalletExists();
            this.$emit("error", "");
        }
    },
    emits: ["search", "error"]
})
export default class IdentitySearch extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";
    implementsPallet = false;
    editCustomNodeModalOpen = false;
    customNode?: ChainInfo;
    chainOptions: UISelectOption[] = [];

    created() {
        const searchParams = new URLSearchParams(window.location.search);
        this.searchTerm = searchParams.get("query") ?? "";
        this.selectedChainKey = searchParams.get("chain") ?? "";
        this.loadCustomNodeFromStorage();
        this.setChainOptions();
    }

    onInputKeyUp(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        this.searchTerm = target.value.trim();
    }

    loadCustomNodeFromStorage() {
        this.customNode = get<ChainInfo>(StoreKey.CustomNode);
    }

    get busy() {
        return this.store.getters.isBusy;
    }

    get submitButtonDisabled() {
        return !this.searchTerm || this.busy || !this.implementsPallet;
    }

    setChainOptions() {
        const options = chains.map((chainInfo: ChainInfo) => {
            return {
                key: chainInfo.key,
                displayValue: chainInfo.name,
                subText: ""
            };
        });
        if (this.customNode) {
            options.push({
                key: this.customNode.key,
                displayValue: this.customNode.name,
                subText: this.customNode.address
            });
        }
        this.chainOptions = options;
    }

    /**
     *  If the selected blockchain does not implement the identity pallet,
     *  we cannot search for identities...
     */
    async checkIdentityPalletExists() {
        try {
            this.implementsPallet = await this.store.dispatch(
                "IDENTITY_PALLET_EXISTS",
                this.selectedChainKey
            );
            if (!this.implementsPallet) {
                const message =
                    "Sorry, the selected node is not available or does not implement the identity pallet";
                this.$emit("error", message);
            }
        } catch (e) {
            const message =
                "Sorry, the connection to the node could not be established";
            this.$emit("error", message);
            this.implementsPallet = false;
            await this.store.dispatch("DECREMENT_BUSY");
        }
    }

    submitIdentitySearch() {
        this.$emit("error", "");
        const searchData: SearchData<void> = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey,
            results: [],
            totalItemCount: 0,
            timestamp: Date.now()
        };
        try {
            this.$emit("search", searchData);
        } catch (e) {
            this.$emit(
                "error",
                "Sorry, but we have a problem processing your search"
            );
            this.store.dispatch("DECREMENT_BUSY");
        }
        (this.$refs.searchButton as HTMLButtonElement).blur();
    }

    onEditCustomNodeClick() {
        this.editCustomNodeModalOpen = true;
    }

    onCustomNodeSaved() {
        this.loadCustomNodeFromStorage();
        this.setChainOptions();
        this.editCustomNodeModalOpen = false;
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";

.custom-icon {
    margin-top: -12px !important;
}

img {
    //font-size: 20px;
    width: 22px;
}

input {
    transition: opacity 0.3s ease-out;
}

input:disabled.search-input.form-control {
    opacity: 0.5;
    background: white !important;
}

.custom-select-container {
    transition: opacity 0.3s ease-out;

    @include media-breakpoint-up(lg) {
        border-left: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;
        padding: 0;
        margin: 0;
    }

    &.disabled {
        cursor: default;
        pointer-events: none;
        opacity: 0.5;
    }
}

.input-group {
    @include media-breakpoint-down(lg) {
        border-bottom: 1px solid #dee2e6;
    }
}

.search-button-col {
    @include media-breakpoint-up(lg) {
        flex: 0 0 150px;
        padding: 0 18px 0 6px;

        .btn.btn-primary {
            border-radius: 0.25rem;
        }
    }
}

.edit-node-button-col {
    color: $primary;
    user-select: none;
    line-height: 47px;

    &:hover {
        cursor: pointer;
    }

    &.disabled {
        cursor: default;
        pointer-events: none;
        opacity: 0.5;
    }

    img {
        margin: -12px 24px 0 13px;
        transform: translateY(4px);
    }

    @include media-breakpoint-up(lg) {
        flex: 0 0 205px;
        border-right: 1px solid #dee2e6;
        padding: 0 1.25rem;

        img {
            margin: 0 8px 0 0;
        }
    }
}

.search-container {
    @include media-breakpoint-down(lg) {
        height: 72px;
    }
}
</style>