<template>
    <div class="logo align-items-end h-50">
        <Logo/>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Logo from "@/components/partials/Logo.vue";

@Options({
    components: {
        Logo
    }
})
export default class HomeView extends Vue {


}
</script>
