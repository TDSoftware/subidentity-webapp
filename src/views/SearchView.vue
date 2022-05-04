<template>
    <div class="logo align-items-end vh-50">
        <Logo />
    </div>
    <div class="pt-5 container-medium">
        <IdentitySearch @search="onSearch" />
    </div>
    <div
        v-if="recentSearches.length !== 0"
        ref="recentSearch"
        class="subidentity-container mt-5 pb-5 bg-white"
    >
        <div class="container-medium pt-5 p-0">
            <p class="h4">Recent Searches</p>
        </div>
        <RecentSearch :recentSearches="recentSearches" class="mb-5 pb-2 p-0" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Logo from "@/components/partials/Logo.vue";
import IdentitySearch from "@/components/partials/IdentitySearch.vue";
import RecentSearch from "@/components/partials/RecentSearch.vue";
import { RecentSearchHistory } from "@/interfaces/RecentSearchHistory";
import { get } from "@/util/storage";
import { SearchData } from "@/interfaces/SearchData";
import router from "@/router";

@Options({
    components: {
        Logo,
        IdentitySearch,
        RecentSearch
    }
})
export default class SearchView extends Vue {
    recentSearches: Array<RecentSearchHistory> = [];

    getRecentSearchHistory() {
        this.recentSearches =
            get<RecentSearchHistory[] | undefined>("recentSearchHistory") || [];
    }

    created() {
        this.getRecentSearchHistory();
    }

    onSearch(searchData: SearchData) {
        router.push({
            path: "/search",
            query: {
                query: searchData.searchTerm,
                chain: searchData.selectedChainKey
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.vh-50 {
    min-height: 42vh;
}
</style>
