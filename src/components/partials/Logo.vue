<template>
  <div class="pt-5" :class="isMobileScreen ? 'subidentity-container' : 'container-small'">
    <div class="text-center">
      <img alt="..." class="" src="../../assets/logo.png">
      <p class="h4 pt-3">SubIdentity</p>
      <p class="text-muted">Search identities on Substrate chains</p>
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {useStore} from "@/store";

@Options({})
export default class Logo extends Vue {
  store = useStore()
  get isMobileScreen() {
      return this.store.state.isMobileScreen;
  }
}
</script>
