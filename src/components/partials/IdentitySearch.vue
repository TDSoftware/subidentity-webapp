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
                            autofocus
                            v-model="searchTerm"
                            class="form-control fw-light text-muted"
                            placeholder="Search for a Name, E-Mail, Address"
                            type="text"
                        />
                    </div>
                </div>
                <div class="col-lg-3 col-12 custom-select-container">
                    <CustomSelect
                        :options="chainOptions"
                        class="select"
                        v-model:selected-key="selectedChainKey"
                    />
                </div>
                <div class="col-lg-2 col-12 d-grid mx-auto">
                    <button
                        ref="searchButton"
                        :disabled="!searchTerm || searchInProgress"
                        class="btn btn-primary fw-normal text-white"
                        type="submit"
                    >
                        <Spinner v-if="searchInProgress" />
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
    }
})
export default class IdentitySearch extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";
    searchResult = 23;
    searchDate = new Date().toUTCString();
    searchInProgress = false;

    created() {
        const searchParams = new URLSearchParams(window.location.search);
        this.searchTerm = searchParams.get("query") ?? "";
        this.selectedChainKey = searchParams.get("chain") ?? "";

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

    get chainOptions(): UISelectOption[] {
        return chains.map((chainInfo: ChainInfo) => {
            return {
                key: chainInfo.key,
                displayValue: "In " + chainInfo.name
            };
        });
    }

    async submitIdentitySearch() {
        this.searchInProgress = true;
        const searchData: SearchData<void> = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey,
            results: [],
            timestamp: Date.now()
        };
        await this.store.dispatch("SEARCH_IDENTITIES", searchData);
        this.$emit("search", searchData);
        this.searchInProgress = false;
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

ion-icon {
    font-size: 20px;
}

.custom-select-container {
    @include media-breakpoint-up(lg) {
        border-left: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;
        padding: 0;
        margin: 0;
    }
}
</style>