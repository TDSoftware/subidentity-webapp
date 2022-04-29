<template>
  <div>
    <div class="bg-secondary d-flex align-items-center justify-content-between px-4 py-3">
      <div>
        <img src="../../assets/logo.png" />
        <span class="text-white text-uppercase fw-bold mx-2">Start</span>
      </div>
      <MobileMenuButton v-if="navigationItems.length > 0" @click="isMenuOpen = !isMenuOpen" :open="isMenuOpen" class="mobile-menu-button" />
    </div>
    <div class="mobile-menu">
      <div class="mobile-menu-container px-4 py-3" :class="{'open': isMenuOpen}">
        <p class="text-white fw-bold">Menu</p>
        <div class="navigation-links d-flex flex-column mt-5">
          <template v-for="navItem in navigationItems">
            <router-link :key="navItem.id" v-if="navItem.internal" :to="navItem.link" class="text-white px-3 py-2">{{ navItem.title }}</router-link>
            <a v-else :key="navItem.id" :href="navItem.link" target="_blank">{{ navItem.title }}</a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import MobileMenuButton from "./MobileMenuButton.vue";
import {useRoute} from "vue-router";

@Options({
    components: {MobileMenuButton}
})
export default class Header extends Vue {
  private isMenuOpen = false;
  route = useRoute()
  get navigationItems() {
      return this.route.meta.navigation || [];
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  img {
    height: 25px
  }

  .mobile-menu-button {
    position: relative;
    z-index: 100;
  }

  .mobile-menu{
    max-width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;

    .mobile-menu-container {
      position: relative;
      background-color: #394858;
      width: 90vw;
      height: 100%;
      right: -90vw;
      z-index: 99;
      transition: right .3s ease-in-out;

      a {
        text-decoration: none;
        border-radius: 4px;

        &.router-link-active {
          background-color: $secondary;
        }
      }

      &.open {
        right: 0;
      }
    }
  }
</style>
