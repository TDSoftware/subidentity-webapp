<template>
    <form @submit.prevent="onSubmitIdentitySearch">
        <div class="bg-white text-dark container-medium rounded">
            <div class="row align-items-center">
                <div class="col-md-6 border-end p-2">
                    <div class="input-group">
                        <span class="input-group-text fw-light text-muted">$</span>
                        <input v-model="searchTerm"
                               class="form-control fw-light text-muted"
                               placeholder="Search for a Name, E-Mail, Address"
                               type="text">
                    </div>

                </div>
                <div class="col-md-4 border-end p-2">
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

@Options({
    components: {
        CustomSelect
    },
    prop: {
        recentSearches: {
            type: Array
        }
    }
})
export default class IdentitySearch extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";
    recentSearches: Array<RecentSearchHistory> = [];

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


    // TODO -- add change listener for an accurate search history
    private onSubmitIdentitySearch() {
        this.store.dispatch("SEARCH_IDENDITIES", {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey
        });
        const recentSearchHistory = {
            id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
            chainName: this.selectedChainKey,
            searchTerm: this.searchTerm,
            searchResult: 23,
            dateOfSearch: new Date().toUTCString()
        };
        this.recentSearches.push(recentSearchHistory);
        window.localStorage.setItem("recentSearchHistory", JSON.stringify(this.recentSearches));
    }

    private onChainSelectChanged(selectedChainKey: string) {
        this.selectedChainKey = selectedChainKey;
    }
}
</script>