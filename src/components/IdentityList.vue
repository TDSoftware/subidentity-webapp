<template>
    <div class="bg-white p-0">
        <div v-if="!isMobile" class="row mx-0 p-2 pt-5 text-muted fw-bold">
            <h6 class="col-2">Name</h6>
            <h6 class="col-3">E-MAIL</h6>
            <h6 class="col-4">ADDRESS</h6>
            <h6 class="col-2">CHAIN</h6>
            <h6 class="col-1">PROFILE</h6>
        </div>
        <IdentityListItem v-for="(identity, i) of identities" :key="i" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentityListItem from "@/components/partials/IdentityListItem.vue";

@Options({
    components: {
        IdentityListItem
    }
})
export default class IdentityList extends Vue {
    isMobile = false;
    private identities = [
        {
            id: 1
        },
        {
            id: 2
        }
    ];
}
</script>