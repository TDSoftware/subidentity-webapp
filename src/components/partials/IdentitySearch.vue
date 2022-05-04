<template>
    <form @submit.prevent="onSubmitIdentitySearch">
        <div class="bg-white shadow text-dark p-1 rounded">
            <div class="row align-items-center">
                <div class="col-md-6">
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
                <div class="col-md-3 border-start border-end p-2">
                    <CustomSelect
                        :options="chainOptions"
                        class="select"
                        @change="onChainSelectChanged"
                    />
                </div>
                <div class="col-md-2 d-grid mx-auto">
                    <button
                        ref="searchButton"
                        :disabled="!searchTerm || searchInProgress"
                        class="btn btn-primary fw-normal text-white"
                        type="submit"
                    >
                        SEARCH
                        <Spinner v-if="searchInProgress" />
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
import { RecentSearchHistory } from "@/interfaces/RecentSearchHistory";
import { set, get } from "@/util/storage";
import Spinner from "../common/Spinner.vue";
import { SearchData } from "../../interfaces/SearchData";

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

    chainOptions = [
        {
            key: "polkadot",
            displayValue: "In Polkadot"
        },
        {
            key: "kusama",
            displayValue: "In Kusama"
        }
    ];

    saveRecentSearchToLocalStorage() {
        // TODO: move this to the store: on search, just store the recent searches from the store action

        const recentSearchHistory = {
            chainName: this.selectedChainKey,
            searchTerm: this.searchTerm,
            searchResult: this.searchResult,
            searchDate: this.searchDate
        };
        const fetchedRecentSearchHistory =
            get<RecentSearchHistory[] | undefined>("recentSearchHistory") ?? [];

        if (fetchedRecentSearchHistory.length === 3) {
            fetchedRecentSearchHistory.shift();
        }
        fetchedRecentSearchHistory.push(recentSearchHistory);
        set("recentSearchHistory", fetchedRecentSearchHistory);
    }

    async onSubmitIdentitySearch() {
        this.searchInProgress = true;

        const searchData: SearchData = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey
        };

        await this.store.dispatch("SEARCH_IDENTITIES", searchData);

        this.saveRecentSearchToLocalStorage();

        this.searchInProgress = false;

        this.$emit("search", searchData);
    }

    onChainSelectChanged(selectedChainKey: string) {
        this.selectedChainKey = selectedChainKey;
    }
}
</script>
<style>
ion-icon {
    font-size: 21px;
}
</style>