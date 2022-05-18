<template>
    <div class="sid-wrapper">
        <div class="search-container">
            <div class="search container-medium p-0 fade-in">
                <IdentitySearch @search="onSearch" />
            </div>
        </div>
        <div class="subidentity-container">
            <div class="container-medium p-0">
                <IdentityList @onPagechange="onPageChange" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentitySearch from "@/components/partials/IdentitySearch/IdentitySearch.vue";
import IdentityList from "@/components/partials/IdentityList.vue";
import router from "@/router";
import { SearchData } from "@/interfaces/SearchData";
import { useStore } from "../store";

@Options({
    components: {
        IdentitySearch,
        IdentityList
    },
    watch: {
        $route() {
            this.dispatchSearchIdentities();
        }
    }
})
export default class ListView extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";

    async created() {
        this.dispatchSearchIdentities();
    }

    async dispatchSearchIdentities() {
        const searchParams = new URLSearchParams(window.location.search);
        this.searchTerm = searchParams.get("query") ?? "";
        this.selectedChainKey = searchParams.get("chain") ?? "";
        const page = parseInt(searchParams.get("page") ?? "");

        const searchData: SearchData<void> = {
            searchTerm: this.searchTerm,
            selectedChainKey: this.selectedChainKey,
            results: [],
            totalItemCount: 0,
            timestamp: Date.now()
        };

        await this.store.dispatch("SEARCH_IDENTITIES", {
            searchData,
            currentPage: page
        });
    }

    async onPageChange(page: number) {
        router.push({
            path: "/search",
            query: {
                query: this.searchTerm,
                chain: this.selectedChainKey,
                page: page
            }
        });
    }

    onSearch(searchData: SearchData<void>) {
        router.push({
            path: "/search",
            query: {
                query: searchData.searchTerm,
                chain: searchData.selectedChainKey,
                page: 1
            }
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