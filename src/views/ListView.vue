<template>
  <div class="d-flex flex-row">
    <div class="d-flex flex-row w-auto p-4 pt-4 logo" @click="$router.push('/')">
      <img width="40" height="40" class="" src="../assets/logo.png" />
      <p class="h4 mx-2 pt-1">SubIdentity</p>
    </div>

    <div class="pt-5 w-75 p-5">
      <IdentitySearch />
    </div>
  </div>
  <div class="subidentity-container">
    <div class="container-medium p-0">
      <p class="h4">158 Search Results for ‘Michael Müller’ in ‘Polkadot’</p>
        <IdentityList/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IdentitySearch from "@/components/IdentitySearch.vue";
import IdentityList from "@/components/IdentityList.vue";

@Options({
    components: {
        IdentitySearch,
        IdentityList
    }
})
export default class SearchView extends Vue {}
</script>
<style scoped>
.logo{
    cursor: pointer;
}
</style>