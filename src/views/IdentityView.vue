<template>
    <div class="sid-wrapper">
        <div class="subidentity-container pb-5">
            <div class="container-medium">
                <div
                    v-if="error || backToHome"
                    class="d-flex flex-row pt-4 link-primary"
                    @click="$router.push('/')"
                >
                    <img
                        src="../assets/icons/arrow-back-outline-primary.svg"
                        class="back-arrow"
                    />
                    <p class="mx-2">Back to home</p>
                </div>
                <div
                    v-else
                    class="d-flex flex-row pt-4 link-primary"
                    @click="$router.go(-1)"
                >
                    <img
                        src="../assets/icons/arrow-back-outline-primary.svg"
                        class="back-arrow"
                    />

                    <p class="mx-2">Back to results</p>
                </div>
                <span v-if="loaded && error">
                    <Alert :message="error" :isError="true" />
                </span>
                <div v-if="!loaded" class="spinner-wrapper">
                    <Spinner color="#D0D0D0" :size="40" :width="3" />
                </div>
                <ProfileHeader
                    v-if="loaded && !error"
                    :identity="identity"
                    :web3Accounts="web3Accounts"
                />

                <div v-if="loaded && !error" class="plugins fade-in">
                    <BasicInfoPlugin :identity="identity" />
                    <TreasuryPlugin />
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
import Alert from "@/components/common/Alert.vue";
import TreasuryPlugin from "@/components/partials/profile/plugins/TreasuryPlugin.vue";

@Options({
    components: {
        Spinner,
        ProfileHeader,
        BasicInfoPlugin,
        Alert,
        TreasuryPlugin
    }
})
export default class IdentityView extends Vue {
    route = useRoute();
    store = useStore();

    address = this.route.params.address as string;
    chain = this.route.params.chain as string;
    loaded = false;
    identity?: Identity;
    error = "";
    backToHome = false;
    web3Accounts? = [];

    created() {
        this.loadWeb3Accounts();
        this.loadIdentity();
        if (window.history.state.back === "/") {
            this.backToHome = true;
        }
    }

    async loadIdentity() {
        try {
            this.identity = await this.store.dispatch("LOAD_IDENTITY", {
                chain: this.chain,
                address: this.address
            });
            this.loaded = true;
        } catch (error) {
            this.loaded = true;
            if (error instanceof Error) {
                this.error = error.message;
            } else {
                this.error = "An unexpected error occurred";
            }
        }
    }

    async loadWeb3Accounts() {
        try {
            this.web3Accounts = await this.store.dispatch(
                "LOAD_WEB3_ACCOUNTS",
                this.chain
            );
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            } else {
                this.error = "An unexpected error occurred";
            }
        }
    }

    handleError(message: string) {
        this.error = message;
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.logo {
    cursor: pointer;
}
.back-arrow {
    width: 16px;
    height: 16px;
    margin-top: 5px;
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