<template>
    <span
        class="spinner"
        :style="{
            'border-width': width + 'px',
            'border-color': color,
            width: size + 'px',
            height: size + 'px'
        }"
    >
    </span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        color: {
            type: String,
            default: "white"
        },
        size: {
            type: Number,
            default: 14
        },
        width: {
            type: Number,
            default: 2
        }
    }
})
export default class Spinner extends Vue {
    color!: string;
    size!: number;
    width!: number;
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
    border-bottom-color: transparent !important;
    border-radius: 50%;
    animation: rotate 1s linear 0s infinite;
    margin: 0 4px;
}
</style>