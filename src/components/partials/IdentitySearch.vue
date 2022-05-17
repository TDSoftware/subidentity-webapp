<template>
    <form @submit.prevent="submitIdentitySearch">
        <div class="bg-white shadow text-dark p-0 rounded">
            <div class="row align-items-center">
                <div class="col-lg-6 col-12">
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
                <div class="col-lg-2 col-12 d-grid mx-auto">
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
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CustomSelect from "@/components/common/CustomSelect.vue";
import { useStore } from "../../store";
import Spinner from "../common/Spinner.vue";
import { SearchData } from "../../interfaces/SearchData";
import { ChainInfo, chains } from "../../util/chains";
import { UISelectOption } from "@/interfaces/UISelectOption";

@Options({
    components: {
        CustomSelect,
        Spinner
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

    created() {
        const searchParams = new URLSearchParams(window.location.search);
        this.searchTerm = searchParams.get("query") ?? "";
        this.selectedChainKey = searchParams.get("chain") ?? "";
    }

    get submitButtonDisabled() {
        return !this.searchTerm || this.busy || !this.implementsPallet;
    }

    get chainOptions(): UISelectOption[] {
        return chains.map((chainInfo: ChainInfo) => {
            return {
                key: chainInfo.key,
                displayValue: "In " + chainInfo.name
            };
        });
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
            alert(
                "Sorry, the selected node is not available or does not implement the identity pallet"
            );
        }
        this.busy = false;
    }

    submitIdentitySearch() {
        this.busy = true;
        const searchData: SearchData<void> = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey,
            results: [],
            timestamp: Date.now()
        };

        this.$emit("search", searchData);
        this.busy = false;
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
</style>