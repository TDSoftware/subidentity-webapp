<template>
    <div class="logo align-items-end vh-50">
        <Logo/>
    </div>
    <div class="pt-5">
        <IdentitySearch :recentSearches="recentSearches"/>
    </div>
    <div v-if="recentSearches" ref="recentSearch" class="subidentity-container mt-5 pb-5 bg-white">
        <div class="container-medium pt-5 p-0">
            <p class="h4">Recent Searches</p>
        </div>
        <RecentSearch :recentSearches="recentSearches" class="mb-5 pb-1 p-0"/>
    </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Logo from "@/components/partials/Logo.vue";
import IdentitySearch from "@/components/IdentitySearch.vue";
import RecentSearch from "@/components/partials/RecentSearch.vue";
import {RecentSearchHistory} from "@/interfaces/RecentSearchHistory";


@Options({
    components: {
        Logo,
        IdentitySearch,
        RecentSearch
    }
})
export default class SearchView extends Vue {

    recentSearches: Array<RecentSearchHistory> = [];

    created() {
        const recentSearchHistory = window.localStorage.getItem("recentSearchHistory");
        if (recentSearchHistory) {
            const recentSearch = JSON.parse(recentSearchHistory);
            recentSearch.forEach((el: RecentSearchHistory) => {
                this.recentSearches.push(el);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.vh-50 {
    min-height: 44vh;
}
</style>
