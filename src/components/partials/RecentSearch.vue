<template>
    <div class="container-medium pt-4">
        <div class="row">
            <div
                v-for="(recentSearch, i) of recentSearches"
                :key="i"
                class="col-xl-4 col-md-6 col-12"
            >
                <div
                    class="card mb-4 recent-search-item"
                    @click="$emit('itemClicked', recentSearch)"
                >
                    <div class="card-body">
                        <div class="d-flex mb-3">
                            <span class="fw-light text-muted pt-1">
                                <img
                                    src="../../assets/icons/search-outline-muted.svg"
                                    style="width: 19px"
                                />
                            </span>
                            <div
                                class="
                                    chain-name-badge
                                    d-flex
                                    flex-row
                                    badge
                                    text-capitalize
                                    bg-light
                                    mx-2
                                "
                            >
                                <div class="fw-light text-muted">
                                    <img
                                        src="../../assets/icons/git-network-outline-muted.svg"
                                        style="width: 16px; margin-top: -4px"
                                    />
                                </div>
                                <div
                                    class="text-nowrap text-truncate mx-2"
                                    style="max-width: 179px"
                                >
                                    {{ recentSearch.selectedChainKey }}
                                </div>
                            </div>
                            <div
                                class="
                                    time-badge
                                    ms-auto
                                    fw-light
                                    text-muted text-nowrap text-truncate
                                "
                            >
                                <TimeAgo
                                    :date="new Date(recentSearch.timestamp)"
                                />
                            </div>
                        </div>
                        <p class="h6">{{ recentSearch.searchTerm }}</p>
                        <span
                            class="
                                text-decoration-none
                                link-primary
                                result-count
                            "
                        >
                            {{ recentSearch.totalItemCount }} results
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button
                type="button"
                class="btn btn-light"
                @click="clearRecentSearches"
            >
                <img
                    src="../../assets/icons/trash.svg"
                    style="width: 18px; margin-top: -5px"
                />
                Clear Recent Searches
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TimeAgo from "../common/TimeAgo.vue";
import { useStore } from "@/store";
import { SearchData } from "@/interfaces/SearchData";
import { Identity } from "@npmjs_tdsoftware/subidentity";

@Options({
    components: {
        TimeAgo
    }
})
export default class RecentSearch extends Vue {
    store = useStore();

    get recentSearches() {
        const retVal = [...this.store.state.recentSearches];
        retVal.sort((a: SearchData<Identity>, b: SearchData<Identity>) => {
            return b.timestamp - a.timestamp;
        });
        return retVal;
    }

    clearRecentSearches() {
        this.store.commit("clearRecentSearches");
    }
}
</script>

<style lang="scss" scoped>
.chain-name-badge {
    line-height: 19px;
    padding-bottom: 0;
    padding-top: 0.4rem;
}
.time-badge {
    line-height: 32px;
    font-size: 14px;
}
.result-count {
    font-size: 14px;
}
.recent-search-item {
    transition: transform 0.3s ease-out;
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
    &:active {
        transform: scale(1);
    }
}
</style>