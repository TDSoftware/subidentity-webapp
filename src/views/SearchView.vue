<template>
    <div class="logo align-items-end vh-50">
        <Logo/>
    </div>
    <div class="pt-5">
        <IdentitySearch/>
    </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Logo from "@/components/partials/Logo.vue";
import IdentitySearch from "@/components/IdentitySearch.vue";

@Options({
    components: {
        Logo,
        IdentitySearch
    }
})
export default class SearchView extends Vue {


}
</script>

<style lang="scss" scoped>
.vh-50 {
    min-height: 49vh;
}
</style>
