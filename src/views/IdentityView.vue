<template>
    <div
        class="d-flex flex-row w-auto p-4 pt-4 logo"
        @click="$router.push('/')"
    >
        <img width="40" height="40" class="" src="../assets/logo.png" />
        <p class="h4 mx-2 pt-1">SubIdentity</p>
    </div>

    <div class="subidentity-container">
        <div class="container-medium">
            <a class="text-decoration-none link-primary" href="#">
                <div class="d-flex flex-row pt-4">
                    <ion-icon class="icon" name="arrow-back-outline"></ion-icon>
                    <p class="mx-2">Back to results</p>
                </div>
            </a>
            <profile />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Profile from "@/components/partials/Profile.vue";

@Options({
    components: {
        Profile
    }
})
export default class IdentityView extends Vue {}
</script>
<style scoped>
.logo {
    cursor: pointer;
}
.icon {
    padding-top: 5px;
}
</style>