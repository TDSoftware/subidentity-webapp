<template>
  <div class="bg-secondary text-white">
    <div class="container-medium">
      <div class="d-flex justify-content-evenly py-4 text-white-50">
        <span v-if="navigationItems.length === 0">This project was carried out as part of the Web3Foundations grant program.</span>
        <template v-else v-for="navItem in navigationItems">
          <router-link :key="navItem.id" v-if="navItem.internal" :to="navItem.link">{{ navItem.title }}</router-link>
          <a v-else :key="navItem.id" :href="navItem.link" target="_blank">{{ navItem.title }}</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {useRoute} from "vue-router";

@Options({})
export default class Footer extends Vue {
    route = useRoute()
    get navigationItems() {
        return this.route.meta.navigation || [];
    }
}
</script>

<style lang="scss" scoped>
span {
  border-bottom: 1px solid transparent;
}

// TODO find the bootstrap variable for white-text-50
a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all .3s ease-in-out;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
