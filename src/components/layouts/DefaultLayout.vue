<template>
    <Header v-if="isMobileScreen" />
    <div class="subidentity-container has-bg-image" :class="{'px-4 py-3': isMobileScreen}">
        <router-view/>
    </div>
    <Footer v-if="!isMobileScreen" />
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Header from "@/components/partials/Header.vue";
import Footer from "@/components/partials/Footer.vue";
import {useStore} from "../../store";

@Options({
    components: {
        Header,
        Footer
    }
})
export default class DefaultLayout extends Vue {
  store = useStore()
  get isMobileScreen() {
      return this.store.state.isMobileScreen;
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";

.has-bg-image {
    min-height: calc(100vh - $footerHeight);
    background-color: white;
    background-image: url("../../assets/logo-blurr.png"), url("../../assets/mainbg.png");
    background-position: top center;
    background-repeat: no-repeat, no-repeat;
    background-size: 700px, cover;
}


</style>
