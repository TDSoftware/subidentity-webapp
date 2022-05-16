<template>
    <!-- <p class="h4">
        {{ searchResults.length }} Search Results for ‘{{ searchTerm }}’ in
        ‘Polkadot’
    </p> -->
    <div class="mb-4 pb-1">
        <p class="h4 mb-2">{{ searchResults.length }} Search Results</p>
        <p class="text-muted">
            for "{{ lastSearchTerm }}" in "{{ chainName }}"
        </p>
    </div>

    <div
        class="bg-white p-0 fade-in"
        v-if="searchResults.length > 0 && pagination.totalPageCount !== 0"
    >
        <div class="row mx-0 p-2 text-muted fw-bold labels">
            <h6 class="col">Name</h6>
            <h6 class="col">E-MAIL</h6>
            <h6 class="col address-col">ADDRESS</h6>
            <h6 class="col" style="flex: 0 0 150px">CHAIN</h6>
            <h6 class="col" style="flex: 0 0 100px">PROFILE</h6>
        </div>
        <template v-for="(identity, i) of searchResults" :key="i">
            <IdentityListItem :identity="identity" />
        </template>
    </div>

    <div class="container-medium pt-5">
        <div class="d-flex justify-content-center pt-3 pb-2 text-white-50">
            <div
                v-if="
                    pagination.totalPageCount === 0 &&
                    searchResults.length !== 0
                "
                class="spinner-wrapper"
            >
                <Spinner color="#D0D0D0" :size="40" :width="3" />
            </div>
            <Pagination
                v-if="
                    searchResults.length !== 0 &&
                    pagination.totalPageCount !== 0
                "
                :totalPages="pagination.totalPageCount"
                :currentPage="pagination.currentPage"
                :previous="pagination.previous"
                :next="pagination.next"
                @onPagechange="onPageChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentityListItem from "@/components/partials/IdentityListItem.vue";
import { useStore } from "@/store";
import { getChainName } from "@/util/chains";
import Pagination from "@/components/common/Pagination.vue";
import Spinner from "@/components/common/Spinner.vue";

@Options({
    components: {
        IdentityListItem,
        Pagination,
        Spinner
    }
})
export default class IdentityList extends Vue {
    searchTerm = "";
    selectedChainKey = "";
    store = useStore();

    get searchResults() {
        return this.store.getters.lastSearchResults;
    }

    get lastSearchTerm() {
        return this.store.getters.lastSearchTerm;
    }

    get chainName() {
        return getChainName(this.store.getters.lastSearchChainKey);
    }

    get pagination() {
        return this.store.state.identitySearchPagination;
    }

    async onPageChange(page: number) {
        this.$emit("onPagechange", page);
    }

    isMobile = false;

    // TODO: add logic for isMobile
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
h6 {
    font-size: 0.85rem;
}
.labels {
    display: none;
    @include media-breakpoint-up(md) {
        display: flex;
    }
}
.address-col {
    @media screen and (min-width: 1600px) {
        flex: 0 0 455px;
    }
}
</style>