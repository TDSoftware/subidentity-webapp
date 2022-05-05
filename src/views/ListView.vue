<template>
    <div class="sid-wrapper">
        <div class="search-container">
            <div class="search container-medium p-0 fade-in">
                <IdentitySearch />
            </div>
        </div>
        <div class="subidentity-container pb-5">
            <div class="container-medium p-0">
                <IdentityList />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentitySearch from "@/components/partials/IdentitySearch.vue";
import IdentityList from "@/components/partials/IdentityList.vue";

@Options({
    components: {
        IdentitySearch,
        IdentityList
    }
})
export default class ListView extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.sid-wrapper {
    padding-top: 230px;

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
        top: 60px;
    }
}

.subidentity-container {
    padding-top: 30px;

    @include media-breakpoint-up(lg) {
        padding-top: $headerHeight;
    }
}
</style>