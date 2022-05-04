<template>
    <span class="spinner"> </span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Spinner extends Vue {
    hello = "World";
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.spinner {
    background-color: transparent;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: solid 2px white;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotate 1s linear 0s infinite;
    margin: 0 4px;
}
</style>