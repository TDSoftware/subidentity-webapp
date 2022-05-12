<template>
    <div class="sid-wrapper">
        <div class="search-container">
            <div class="search container-medium p-0 fade-in">
                <IdentitySearch @search="onSearch" />
            </div>
        </div>
        <div class="subidentity-container pb-5">
            <div class="container-medium p-0">
                <IdentityList />
            </div>
            <div
                v-if="searchResults.length !== 0"
                class="container-medium pt-5 p-0"
            >
                <div
                    class="
                        d-flex
                        justify-content-center
                        pt-3
                        pb-2
                        text-white-50
                    "
                >
                    <Pagination
                        :totalPages="pagination.totalPageCount"
                        :currentPage="pagination.currentPage"
                        :previous="pagination.previous"
                        :next="pagination.next"
                        @onPagechange="onPageChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentitySearch from "@/components/partials/IdentitySearch.vue";
import IdentityList from "@/components/partials/IdentityList.vue";
import { SearchData } from "@/interfaces/SearchData";
import router from "@/router";
import Pagination from "@/components/common/Pagination.vue";
import { useStore } from "@/store";

@Options({
    components: {
        IdentitySearch,
        IdentityList,
        Pagination
    }
})
export default class ListView extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";

    created() {
        const searchParams = new URLSearchParams(window.location.search);
        this.searchTerm = searchParams.get("query") ?? "";
        this.selectedChainKey = searchParams.get("chain") ?? "";
    }

    onSearch(searchData: SearchData<void>) {
        router.push({
            path: "/search",
            query: {
                query: searchData.searchTerm,
                chain: searchData.selectedChainKey
            }
        });
    }

    get searchResults() {
        return this.store.getters.lastSearchResults;
    }

    get pagination() {
        return this.store.state.pagination;
    }

    async onPageChange(page: number) {
        const searchData: SearchData<void> = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey,
            results: [],
            timestamp: Date.now()
        };
        await this.store.dispatch("SEARCH_IDENTITIES", {
            searchData,
            currentPage: page
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.sid-wrapper {
    padding-top: 230px;

    @include media-breakpoint-up(lg) {
        padding-top: $headerHeight;
    }
}

.search-container {
    position: absolute;
    z-index: 2;
    top: 75px;
    width: 100%;
    @include media-breakpoint-up(lg) {
        top: 68px;
    }
}

.subidentity-container {
    padding-top: 30px;
    min-height: calc(100vh - $footerHeight - 94px);

    @include media-breakpoint-up(lg) {
        padding-top: $headerHeight;
    }
}
</style>