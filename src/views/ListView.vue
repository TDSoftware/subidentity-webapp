<template>
    <div class="sid-wrapper">
        <div class="search-container">
            <div class="search container-medium p-0 fade-in">
                <IdentitySearch @search="onSearch" @error="error = $event" />
            </div>
        </div>
        <div class="subidentity-container">
            <div class="container-medium p-0" :class="busy ? 'is-blur' : ''">
                <div class="spinner-wrapper fade-in" v-if="busy">
                    <Spinner color="#EA268E" :size="40" :width="3" />
                </div>
                <IdentityList
                    @onPagechange="onPageChange"
                    :pageError="pageError"
                    :error="error"
                />
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
import Spinner from "@/components/common/Spinner.vue";

@Options({
    components: {
        IdentitySearch,
        IdentityList,
        Spinner
    },
    watch: {
        $route() {
            this.dispatchSearchIdentities();
        }
    },
    emits: ["onPagechange"]
})
export default class ListView extends Vue {
    store = useStore();
    searchTerm = "";
    selectedChainKey = "";
    pageError = "";
    error = "";

    async created() {
        this.dispatchSearchIdentities();
    }

    async dispatchSearchIdentities() {
        this.pageError = "";
        this.error = "";
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
        try {
            await this.store.dispatch("SEARCH_IDENTITIES", {
                searchData,
                currentPage: page
            });
        } catch (e) {
            this.store.dispatch("DECREMENT_BUSY");
            this.error = e.message;
        }

        if (page > this.pagination.totalPageCount) {
            this.pageError =
                "Sorry, there are no results on the selected page - Please try again";
        }
        if (this.pagination.totalPageCount === 0) {
            this.pageError = "";
        }
    }

    get pagination() {
        return this.store.state.identitySearchPagination;
    }

    get busy() {
        return this.store.getters.isBusy;
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
    padding-top: 150px;

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
.is-blur {
    background: white;
    opacity: 0.4;
}

.spinner-wrapper {
    padding: 6rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 70%;
    height: 50%;
}
</style>