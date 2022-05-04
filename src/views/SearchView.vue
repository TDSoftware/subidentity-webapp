<template>
    <div class="logo align-items-end vh-50">
        <Logo />
    </div>
    <div class="pt-5 p-0 container-medium">
        <IdentitySearch @search="onSearch" />
    </div>
    <div
        v-if="showRecentSearch"
        ref="recentSearch"
        class="subidentity-container mt-5 pb-5 bg-white"
    >
        <div class="container-medium pt-5 p-0">
            <p class="h4">Recent Searches</p>
        </div>
        <RecentSearch class="mb-5 pb-2 p-0" @item-clicked="recallSearch" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Logo from "@/components/partials/Logo.vue";
import IdentitySearch from "@/components/partials/IdentitySearch.vue";
import RecentSearch from "@/components/partials/RecentSearch.vue";
import { SearchData } from "@/interfaces/SearchData";
import router from "@/router";
import { useStore } from "@/store";

@Options({
    components: {
        Logo,
        IdentitySearch,
        RecentSearch
    }
})
export default class SearchView extends Vue {
    store = useStore();

    get showRecentSearch(): boolean {
        return this.store.state.recentSearches.length > 0;
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

    recallSearch(searchData: SearchData<void>) {
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
