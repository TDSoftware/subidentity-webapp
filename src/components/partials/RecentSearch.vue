<template>
    <div class="container-medium pt-4 ">
        <div class="row">
            <div
                v-for="(recentSearch, i) of recentSearches"
                :key="i"
                class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex mb-3">
                            <span class="fw-light text-muted pt-1">
                             <ion-icon class="fw-light text-muted" name="search-outline"></ion-icon>
                             </span>
                            <div class="d-flex flex-row badge text-capitalize bg-light mx-2">
                                  <div class="fw-light text-muted">
                                         <ion-icon size="small" class="fw-light text-muted" name="git-network-outline"></ion-icon>
                                     </div>
                                <div class="mx-2">{{ recentSearch.chainName }}</div>
                                </div>
                            <div class="ms-auto fw-light text-muted">
                                <TimeAgo :date="new Date(recentSearch.searchDate)"/>
                            </div>
                        </div>
                        <p class="h6">{{ recentSearch.searchTerm }}</p>
                        <a class="text-decoration-none link-primary" href="#">{{ recentSearch.searchResult }} results</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {timeBetween} from "@/util/timeBetween";
import TimeAgo from "./TimeAgo.vue";

@Options({
    components: {
        TimeAgo
    },
    props: {
        recentSearches: {
            type: Array,
            required: true
        }
    }
})
export default class RecentSearch extends Vue {

    timeAgo(searchDate: string){
        return timeBetween(new Date(searchDate), new Date());
    }

}
</script>