<template>
    <Header />
    <div class="subidentity-container has-bg-image">
        <router-view />
    </div>
    <Footer />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Footer from "@/components/partials/Footer.vue";
import Header from "../partials/Header.vue";

@Options({
    components: {
        Footer,
        Header
    }
})
export default class SecondaryLayout extends Vue {}
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
.has-bg-image {
    min-height: calc(100vh - $footerHeight);
    background-color: white;
    background-image: url("../../assets/logo-blurr.png"),
        url("../../assets/headerbg.png");
    background-position: top center;
    background-repeat: no-repeat, no-repeat;
    background-size: 700px, cover;
}
</style>