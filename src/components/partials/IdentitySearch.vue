<template>
    <form @submit.prevent="submitIdentitySearch">
        <div class="bg-white shadow text-dark p-0 rounded">
            <div class="row align-items-center">
                <div class="col-lg col-12">
                    <div class="input-group">
                        <span class="input-group-text fw-light text-muted">
                            <ion-icon
                                class="fw-light text-muted"
                                name="search-outline"
                            ></ion-icon>
                        </span>
                        <input
                            :disabled="busy"
                            autofocus
                            v-model="searchTerm"
                            class="form-control text-muted search-input"
                            placeholder="Search for a Name, E-Mail, Address"
                            type="text"
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
                    <ion-icon
                        class="fw-normal"
                        :name="
                            customNode ? 'create-outline' : 'add-circle-outline'
                        "
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
    <Modal v-model:open="editCustomNodeModalOpen">
        <template #title>
            {{ customNode ? "Edit" : "Add" }} your custom node
        </template>
        <template #body>
            <div class="mb-3">
                <label class="form-label">Address</label>
                <input
                    v-model="newCustomNodeAddress"
                    type="text"
                    class="form-control"
                    placeholder="e.g.: ws://127.0.0.1:9944"
                />
            </div>
            <!-- TODO: show node name -->
            <div class="row">
                <button
                    class="btn btn-primary text-white col-md col-12"
                    :disabled="!newCustomNodeAddress"
                    @click="saveCustomNode"
                >
                    SAVE NODE
                </button>
                <button
                    class="offset-md-1 btn btn-dark col-md col-12"
                    @click="editCustomNodeModalOpen = false"
                >
                    CANCEL
                </button>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomSelect from "@/components/common/CustomSelect.vue";
import { useStore } from "../../store";
import Spinner from "../common/Spinner.vue";
import { SearchData } from "../../interfaces/SearchData";
import { ChainInfo, chains } from "../../util/chains";
import { UISelectOption } from "@/interfaces/UISelectOption";
import Modal from "../common/Modal.vue";
import { set, get, StoreKey } from "@/util/storage";

@Options({
    components: {
        CustomSelect,
        Spinner,
        Modal
    },
    watch: {
        selectedChainKey() {
            this.checkIdentityPalletExists();
        }
    }
})
export default class IdentitySearch extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";
    busy = false;
    implementsPallet = false;
    editCustomNodeModalOpen = false;
    newCustomNodeAddress = "";
    customNode?: ChainInfo;

    created() {
        const searchParams = new URLSearchParams(window.location.search);
        this.searchTerm = searchParams.get("query") ?? "";
        this.selectedChainKey = searchParams.get("chain") ?? "";
        this.loadCustomNodeFromStorage();

        //  On page load/reload submit the search if a searchTerm is
        //  given in the URL params
        const shouldSubmitSearch =
            this.searchTerm &&
            this.selectedChainKey &&
            this.store.getters.lastSearchTerm !== this.searchTerm;
        if (shouldSubmitSearch) {
            this.submitIdentitySearch();
        }
    }

    // The custom node is stored in the local storage, but deleted after 24 hours
    loadCustomNodeFromStorage() {
        const node = get<ChainInfo>(StoreKey.CustomNode);
        if (
            !node ||
            (node.modifiedAt &&
                Date.now() - node.modifiedAt > 1000 * 60 * 60 * 24)
        ) {
            return console.warn(
                "[IdentitySearch] Custom node in local storage too old or not existing."
            );
        }
        this.customNode = node;
    }

    get submitButtonDisabled() {
        return !this.searchTerm || this.busy || !this.implementsPallet;
    }

    get chainOptions(): UISelectOption[] {
        const chainOptions = chains.map((chainInfo: ChainInfo) => {
            return {
                key: chainInfo.key,
                displayValue: "In " + chainInfo.name
            };
        });
        if (this.customNode) {
            chainOptions.push({
                key: this.customNode.key,
                displayValue: this.customNode.name
            });
        }
        return chainOptions;
    }

    /**
     *  If the selected blockchain does not implement the identity pallet,
     *  we cannot search for identities...
     */
    async checkIdentityPalletExists() {
        this.busy = true;
        this.implementsPallet = await this.store.dispatch(
            "IDENTITY_PALLET_EXISTS",
            this.selectedChainKey
        );
        if (!this.implementsPallet) {
            // TODO: show nice error partial component instead of standard alert
            alert(
                "Sorry, the selected node is not available or does not implement the identity pallet"
            );
        }
        this.busy = false;
    }

    async submitIdentitySearch() {
        this.busy = true;
        const searchData: SearchData<void> = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey,
            results: [],
            timestamp: Date.now()
        };
        await this.store.dispatch("SEARCH_IDENTITIES", searchData);
        this.$emit("search", searchData);
        this.busy = false;
    }

    onEditCustomNodeClick() {
        this.editCustomNodeModalOpen = true;
    }

    saveCustomNode() {
        this.customNode = {
            key: "customNode",
            name: "Retrieve that...",
            address: this.newCustomNodeAddress,
            modifiedAt: Date.now()
        };
        set<ChainInfo>(StoreKey.CustomNode, this.customNode);
        this.editCustomNodeModalOpen = false;
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

ion-icon {
    font-size: 20px;
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

.search-button-col {
    .btn.btn-primary {
        border-radius: 0 0 0.25rem 0.25rem;
    }

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

    ion-icon {
        margin: 0 24px 0 13px;
        transform: translateY(4px);
    }

    @include media-breakpoint-up(lg) {
        flex: 0 0 205px;
        border-right: 1px solid #dee2e6;
        padding: 0 1.25rem;

        ion-icon {
            margin: 0 8px 0 0;
        }
    }
}
</style>