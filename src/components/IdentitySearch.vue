<template>
    <form @submit.prevent="onSubmitIdentitySearch">
        <div class="bg-white text-dark container-medium rounded">
            <div class="row align-items-center">
                <div class="col-md-6 p-2">
                    <div class="input-group">
                        <span class="input-group-text fw-light text-muted">
                            <ion-icon class="fw-light text-muted" name="search-outline"></ion-icon>
                        </span>
                        <input v-model="searchTerm"
                               class="form-control fw-light text-muted"
                               placeholder="Search for a Name, E-Mail, Address"
                               type="text"/>
                    </div>

                </div>
                <div class="col-md-4 border-start border-end p-2">
                    <CustomSelect
                        :options="chainOptions"
                        class="select"
                        @change="onChainSelectChanged"
                    />
                </div>
                <div class="col-md-2 d-grid mx-auto">
                    <button ref="searchButton"
                            :disabled="!searchTerm"
                            class="btn btn-primary fw-normal text-white"
                            type="submit">
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import CustomSelect from "@/components/partials/CustomSelect.vue";
import {useStore} from "../store";
import {RecentSearchHistory} from "@/interfaces/RecentSearchHistory";
import {set, get} from "@/util/storage";


@Options({
    components: {
        CustomSelect
    }
})
export default class IdentitySearch extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";
    searchResult = 23;
    searchDate = new Date().toUTCString()

    private chainOptions = [
        {
            key: "polkadot",
            displayValue: "In Polkadot"
        },
        {
            key: "kusama",
            displayValue: "In Kusama"
        }
    ]


    saveRecentSearchToLocalStorage() {
        const recentSearchHistory = {
            chainName: this.selectedChainKey,
            searchTerm: this.searchTerm,
            searchResult: this.searchResult,
            searchDate: this.searchDate
        };
        const fetchedRecentSearchHistory = get<RecentSearchHistory[] | undefined>("recentSearchHistory") || [];

        if (fetchedRecentSearchHistory.length === 3) {
            fetchedRecentSearchHistory.shift();
        }
        fetchedRecentSearchHistory.push(recentSearchHistory);
        set("recentSearchHistory", fetchedRecentSearchHistory);
    }


    private onSubmitIdentitySearch() {
        this.store.dispatch("SEARCH_IDENTITIES", {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey
        });

        this.saveRecentSearchToLocalStorage();
    }

    private onChainSelectChanged(selectedChainKey: string) {
        this.selectedChainKey = selectedChainKey;
    }
}
</script>
<style>
ion-icon {
  font-size: 21px;
}
</style>