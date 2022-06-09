<template>
    <div
        class="pb-5 desktop-header"
        v-if="!pageError && !error"
        @click="checkError"
    >
        <p class="h4">
            {{ lastTotalItemCount }} Search
            <span v-if="lastTotalItemCount > 1">Results</span>
            <span v-else>Result</span> for "{{ lastSearchTerm }}" in "{{
                chainName
            }}"
        </p>
    </div>
    <div v-if="!pageError && !error" class="pb-4 mobile-header">
        <p class="h4 mb-2 pt-3">
            {{ lastTotalItemCount }} Search
            <span v-if="lastTotalItemCount > 1">Results</span>
            <span v-else>Result</span>
        </p>
        <p class="text-muted">
            for "{{ lastSearchTerm }}" in "{{ chainName }}"
        </p>
    </div>
    <Alert v-if="error" class="list-alert" :message="error"></Alert>
    <Alert
        v-else-if="pageError"
        class="list-alert"
        :message="pageError"
    ></Alert>
    <Alert
        v-else-if="!busy && lastTotalItemCount === 0"
        class="list-alert"
        message="Sorry, there are no results for your search term - Please try again"
    />

    <div
        class="bg-white p-0 fade-in"
        v-if="
            searchResults.length > 0 &&
            pagination.totalPageCount !== 0 &&
            !error
        "
    >
        <div class="row mx-0 p-2 text-muted fw-bold labels">
            <h6 class="col">NAME</h6>
            <h6 class="col">E-MAIL</h6>
            <h6 class="col address-col">ADDRESS</h6>
            <h6 class="col" style="flex: 0 0 150px">CHAIN</h6>
            <h6 class="col" style="flex: 0 0 100px">PROFILE</h6>
        </div>
        <div
            class="fade-in"
            ref="identityList"
            v-if="searchResults.length > 0 && pagination.totalPageCount > 0"
        >
            <template v-for="(identity, i) of searchResults" :key="i">
                <IdentityListItem :identity="identity" />
            </template>
        </div>
    </div>

    <div
        class="container-medium pt-5 fade-in"
        v-if="
            searchResults.length >= 1 && pagination.totalPageCount > 1 && !error
        "
    >
        <div class="d-flex justify-content-center pt-3 pb-2 text-white-50">
            <Pagination
                :totalPages="pagination.totalPageCount"
                :currentPage="pagination.currentPage"
                :previous="pagination.previous"
                :next="pagination.next"
                @onPagechange="onPageChange"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentityListItem from "@/components/partials/IdentityListItem.vue";
import { useStore } from "@/store";
import { getChainName } from "@/util/chains";
import Pagination from "@/components/common/Pagination.vue";
import Alert from "@/components/common/Alert.vue";

@Options({
    components: {
        IdentityListItem,
        Pagination,
        Alert
    },
    emits: ["onPagechange"],
    props: {
        pageError: {
            type: String
        },
        error: {
            type: String
        }
    }
})
export default class IdentityList extends Vue {
    store = useStore();

    get searchResults() {
        return this.store.getters.lastSearchResults;
    }

    get lastSearchTerm() {
        return this.store.getters.lastSearchTerm;
    }

    get chainName() {
        return getChainName(this.store.getters.lastSearchChainKey);
    }

    get pagination() {
        return this.store.state.identitySearchPagination;
    }
    get lastTotalItemCount() {
        return this.store.getters.lastTotalItemCount;
    }

    get busy() {
        return this.store.getters.isBusy;
    }

    async onPageChange(page: number) {
        this.$emit("onPagechange", page);
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.list-alert {
    @include media-breakpoint-up(md) {
        margin-top: -27px;
    }
}

h6 {
    font-size: 0.85rem;
}

.labels {
    display: none;
    @include media-breakpoint-up(md) {
        display: flex;
    }
}

.address-col {
    @media screen and (min-width: 1600px) {
        flex: 0 0 455px;
    }
}

.mobile-header {
    display: none;
}

@include media-breakpoint-down(lg) {
    .mobile-header {
        display: block;
    }
    .desktop-header {
        display: none;
    }
}
</style>