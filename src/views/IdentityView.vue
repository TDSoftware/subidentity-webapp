<template>
    <div class="sid-wrapper">
        <div class="subidentity-container pb-5">
            <div class="container-medium">
                <div
                    class="d-flex flex-row pt-4 link-primary"
                    @click="$router.go(-1)"
                >
                    <ion-icon
                        class="icon back-arrow"
                        name="arrow-back-outline"
                    />
                    <p class="mx-2">Back to results</p>
                </div>
                <div v-if="!loaded" class="spinner-wrapper">
                    <Spinner color="#D0D0D0" :size="40" :width="3" />
                </div>
                <ProfileHeader
                    v-if="loaded"
                    class="mb-5"
                    :identity="identity"
                />
                <div v-if="loaded" class="plugins fade-in">
                    <BasicInfoPlugin :identity="identity" />
                    <!--

                        ADD MORE PLUGINS HERE 

                    -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProfileHeader from "@/components/partials/profile/ProfileHeader.vue";
import BasicInfoPlugin from "@/components/partials/profile/plugins/BasicInfoPlugin.vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { Identity } from "@npmjs_tdsoftware/subidentity";
import Spinner from "@/components/common/Spinner.vue";

@Options({
    components: {
        Spinner,
        ProfileHeader,
        BasicInfoPlugin
    }
})
export default class IdentityView extends Vue {
    route = useRoute();
    store = useStore();

    address = this.route.params.address as string;
    chain = (this.route.params.chain as string).toLowerCase();
    loaded = false;
    identity?: Identity;

    created() {
        this.loadIdentity();
    }

    async loadIdentity() {
        // TODO: Error handling for identity not found or no network etc.

        this.identity = await this.store.dispatch("LOAD_IDENTITY", {
            chain: this.chain,
            address: this.address
        });
        this.loaded = true;
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.logo {
    cursor: pointer;
}
.back-arrow {
    padding-top: 5px;
    padding-right: 4px;
}
.sid-wrapper {
    padding-top: $headerHeightMobile;

    & > * {
        min-height: calc(100vh - $footerHeight - $headerHeightMobile);
    }

    @include media-breakpoint-up(lg) {
        padding-top: $headerHeight;

        & > * {
            min-height: calc(100vh - $footerHeight - $headerHeight);
        }
    }
}
.plugins {
    display: flex;
    flex-direction: row;
    & > * {
        width: 100%;

        @include media-breakpoint-up(sm) {
            width: 50%;
            margin-right: 2rem;
        }

        @include media-breakpoint-up(md) {
            width: 33%;
            margin-right: 2rem;
        }

        &:last-child {
            margin-right: 0;
        }
    }
}
.spinner-wrapper {
    width: 100%;
    text-align: center;
    padding: 2rem 0;
}

.container-medium {
    @media screen and (max-width: 575px) {
        padding: 0;
    }
}
</style>