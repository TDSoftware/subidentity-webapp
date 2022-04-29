<template>
  <div class="menu" :class="{ open }">
    <span class="bit-1"></span>
    <span class="bit-2"></span>
    <span class="bit-3"></span>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
    props: {
        open: {
            type: Boolean,
            required: true
        }
    }
})
export default class MobileMenuButton extends Vue {
  private open!: boolean;
}
</script>

<style lang="scss" scoped>
$duration: 0.3s;

.menu {
  width: 18px;
  height: 12px;
  position: relative;
  z-index: 0;
  display: block;

  .bit-1 {
    &:before {
      content: '';
      left: 0;
      top: 0;
      position: absolute;
      width: 9px;
      transform-origin: left bottom;
      height: 1px;
      background: wHITE;
      transition: transform $duration, top $duration;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 9px;
      transform-origin: right bottom;
      height: 1px;
      background: wHITE;
      transition: transform $duration, top $duration;
    }
  }

  .bit-2 {
    position: absolute;
    width: 18px;
    top: 50%;
    left: 50%;
    height: 1px;
    background: wHITE;
    transform: translate(-50%, -50%);
    transition: transform $duration $duration, width $duration;
  }

  .bit-3 {
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 9px;
      transform-origin: left top;
      height: 1px;
      background: wHITE;
      transition: transform $duration, bottom $duration;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 9px;
      transform-origin: right top;
      height: 1px;
      background: wHITE;
      transition: transform $duration, bottom $duration;
    }
  }

  &.open {
    .bit-1 {
      &:before {
        top: -3px;
        width: 12px;
        transform: rotate(45deg);
        transform-origin: left bottom;
        transition: transform $duration, width $duration, top $duration;
      }

      &:after {
        top: -3px;
        width: 12px;
        transform: rotate(-45deg);
        transform-origin: right bottom;
        transition: transform $duration, width $duration, top $duration;
      }
    }

    .bit-2 {
      width: 0px;
      transform: translate(-50%, -50%);
      transition: transform $duration $duration, width $duration;
    }

    .bit-3 {
      &:before {
        bottom: -3px;
        width: 12px;
        transform: rotate(-45deg);
        transform-origin: left top;
        transition: transform $duration, width $duration, bottom $duration;
      }

      &:after {
        bottom: -3px;
        width: 12px;
        transform: rotate(45deg);
        transform-origin: right top;
        transition: transform $duration, width $duration, bottom $duration;
      }
    }
  }
}
</style>
