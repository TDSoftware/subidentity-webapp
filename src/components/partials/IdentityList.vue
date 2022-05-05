<template>
    <p v-if="!isMobile" class="h4">
        {{ searchResults.length }} Search Results for ‘{{ searchTerm }}’ in
        ‘Polkadot’
    </p>
    <span v-if="isMobile">
        <p class="h4">{{ searchResults.length }} Search Results</p>
        <p class="fw-light text-muted">for ‘{{ searchTerm }}’ in ‘Polkadot’</p>
    </span>
    <div class="bg-white p-0 fade-in">
        <div v-if="!isMobile" class="row mx-0 p-2 pt-5 text-muted fw-bold">
            <h6 class="col-2">Name</h6>
            <h6 class="col-3">E-MAIL</h6>
            <h6 class="col-4">ADDRESS</h6>
            <h6 class="col-2">CHAIN</h6>
            <h6 class="col-1">PROFILE</h6>
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