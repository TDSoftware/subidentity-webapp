<template>
    <form @submit.prevent="onSubmitIdentitySearch">
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
                <div class="col-lg-3 col-12 border-start border-end p-2">
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
    }

    // TODO: Move to config file

    get chainOptions(): UISelectOption[] {
        return chains.map((chainInfo: ChainInfo) => {
            return {
                key: chainInfo.key,
                displayValue: "In " + chainInfo.name
            };
        });
    }

    async onSubmitIdentitySearch() {
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

    // onChainSelectChanged(selectedChainKey: string) {
    //     this.selectedChainKey = selectedChainKey;
    // }
}
</script>
<style>
ion-icon {
    font-size: 21px;
}
</style>