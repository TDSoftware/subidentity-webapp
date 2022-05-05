<template>
    <!-- <p class="h4">
        {{ searchResults.length }} Search Results for ‘{{ searchTerm }}’ in
        ‘Polkadot’
    </p> -->
    <div class="mb-4 pb-1">
        <p class="h4 mb-2">{{ searchResults.length }} Search Results</p>
        <p class="text-muted">for "{{ searchTerm }}"" in "Polkadot"</p>
    </div>
    <div class="bg-white p-0 fade-in" v-if="searchResults.length > 0">
        <div class="row mx-0 p-2 text-muted fw-bold labels">
            <h6 class="col">Name</h6>
            <h6 class="col">E-MAIL</h6>
            <h6 class="col" style="flex: 0 0 455px">ADDRESS</h6>
            <h6 class="col" style="flex: 0 0 150px">CHAIN</h6>
            <h6 class="col" style="flex: 0 0 100px">PROFILE</h6>
        </div>
        <template v-for="(identity, i) of searchResults" :key="i">
            <IdentityListItem :identity="identity" />
        </template>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentityListItem from "@/components/partials/IdentityListItem.vue";
import { useStore } from "@/store";

@Options({
    components: {
        IdentityListItem
    }
})
export default class IdentityList extends Vue {
    store = useStore();

    get searchResults() {
        return this.store.getters.lastSearchResults;
    }

    get searchTerm() {
        return this.store.getters.lastSearchTerm;
    }

    isMobile = false;

    // TODO: add logic for isMobile
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
h6 {
    font-size: 0.85rem;
}
.labels {
    display: none;
    @include media-breakpoint-up(md) {
        display: flex;
    }
}
</style>