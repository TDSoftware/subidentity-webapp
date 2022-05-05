<template>
    <div class="sid-wrapper">
        <div class="subidentity-container pb-5">
            <div class="container-medium">
                <router-link class="text-decoration-none" to="-1"
                    ><div class="d-flex flex-row pt-4" @click="$router.go(-1)">
                        <ion-icon
                            class="icon"
                            name="arrow-back-outline"
                        ></ion-icon>
                        <p class="mx-2">Back to results</p>
                    </div></router-link
                >
                <Profile />
                <Plugins />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Profile from "@/components/partials/Profile.vue";
import Plugins from "@/components/partials/Plugins.vue";

@Options({
    components: {
        Profile,
        Plugins
    }
})
export default class IdentityView extends Vue {}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.logo {
    cursor: pointer;
}
.icon {
    padding-top: 2px;
}
.sid-wrapper {
    padding-top: 230px;

    @include media-breakpoint-up(lg) {
        padding-top: $headerHeight;
    }
}
</style>