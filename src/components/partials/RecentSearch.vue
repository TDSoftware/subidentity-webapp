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
                            <span class="fw-light text-muted">$</span>
                            <span class="badge bg-light mx-3">
                                 <span class="fw-light text-muted">$</span>
                                {{ recentSearch.chainName }}</span>
                            <!-- TODO calculate time  -->
                            <div class="ms-auto fw-light text-muted">12 hours ago</div>
                        </div>
                        <p class="h6">{{ recentSearch.searchTerm }}</p>
                        <a class="text-decoration-none link-primary" href="#">{{ recentSearch.searchResult }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
    props: {
        recentSearches: {
            type: Array,
            required: true
        }
    }
})
export default class RecentSearchHistory extends Vue {
}
</script>