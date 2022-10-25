<template>
    <div class="upper-part pb-5">
        <div class="logo-container align-items-end">
            <Logo />
        </div>
        <div class="pt-5 p-0 container-medium fade-in">
            <IdentitySearch @search="onSearch" @error="handleError" />
        </div>
        <Alert v-if="error" class="p-0 container-medium fade-in mt-4" :message="error" :isError="true"></Alert>
    </div>
    <div v-if="showRecentSearch" ref="recentSearch" class="subidentity-container pb-5 bg-white recent-search-container">
        <div class="container-medium pt-5 p-0">
            <p class="h4">Recent Searches</p>
        </div>
        <RecentSearch class="mb-5 pb-2 p-0 fade-in" @item-clicked="recallSearch" />
    </div>
    <div v-else class="contact">
        <div class="contact-col">
            <button class="btn btn-primary fw-normal text-white" type="submit"
                onclick="location.href='mailto:subidentity@tdsoftware.de?subject=Get Listed'">
                Get Listed
            </button>
            <div class="contactText"> We add your chain to subidentity.io </div>
        </div>
        <div class="contact-col">
            <button class="btn btn-primary fw-normal text-white" type="submit"
                onclick="location.href='mailto:subidentity@tdsoftware.de?subject=Custom Development'">
                Custom Development
            </button>
            <div class="contactText"> Need help? We support you with custom blockchain development. </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Logo from "@/components/partials/general/Logo.vue";
import IdentitySearch from "@/components/partials/IdentitySearch/IdentitySearch.vue";
import RecentSearch from "@/components/partials/RecentSearch.vue";
import { SearchData } from "@/interfaces/SearchData";
import router from "@/router";
import { useStore } from "@/store";
import { Identity } from "@npmjs_tdsoftware/subidentity";
import Alert from "@/components/common/Alert.vue";

@Options({
    components: {
        Logo,
        IdentitySearch,
        RecentSearch,
        Alert
    }
})
export default class SearchView extends Vue {
    store = useStore();
    error = "";

    get showRecentSearch(): boolean {
        return this.store.state.recentSearches.length > 0;
    }

    get searchResults() {
        return this.store.getters.lastSearchResults;
    }

    async onSearch(searchData: SearchData<void>) {
        this.error = "";
        try {
            await this.store.dispatch("SEARCH_IDENTITIES", {
                searchData,
                currentPage: 1
            });
        } catch (e: unknown) {
            this.error = "An error occurred, please try again later: ";
            if (e instanceof Error) {
                this.error = this.error + e.message;
            }
        } finally {
            this.store.commit("decrementBusyCounter");
        }

        if (this.searchResults.length === 1) {
            this.searchResults.forEach((identity: Identity) => {
                const url = `/chain/${searchData.selectedChainKey}/identity/${identity.basicInfo.address}`;
                return router.push(url);
            });
        } else {
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

    recallSearch(searchData: SearchData<Identity>) {
        if (searchData?.results?.length === 1) {
            const identity = searchData.results[0];
            const url = `/chain/${searchData.selectedChainKey}/identity/${identity.basicInfo.address}`;
            return router.push(url);
        }

        router.push({
            path: "/search",
            query: {
                query: searchData.searchTerm,
                chain: searchData.selectedChainKey,
                page: 1
            }
        });
    }
    handleError(message: string) {
        this.error = message;
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.logo-container {
    padding-top: 8%;
}

.recent-search-container {
    min-height: calc(100vh - $headerHeight - 29.5rem);
}

.upper-part {
    @include media-breakpoint-down(lg) {
        margin-bottom: 100px;
    }
}

.contact {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;

    .contact-col {
        margin: 25px;
        height: 80px;
        justify-content: center;
        align-items: center;

        .btn {
            width: 250px;
            height: 35px;
            font-size: 14px;
            position: relative;
        }

        .contactText {
            width: 250px;
            height: 35px;
            font-size: 13px;
            margin-top: 8px;
            text-align: center;
            color: #6c757d;
        }
    }
}
</style>
