<template>
  <div class="subidentity-container">
    <router-view/>
  </div>
  <Footer/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Footer from "@/components/partials/Footer.vue";

@Options({
    components: {
        Footer
    }
})
export default class DefaultLayout extends Vue {

}
</script>
<style scoped>
.subidentity-container {
  background-image: url("../../assets/logo-blurr.png"), url("../../assets/mainbg.png");
  background-position: top center;
  background-repeat: no-repeat, no-repeat;
  background-size: 700px, cover;
  height: 93.6vh;

}
</style>