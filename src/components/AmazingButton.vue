<template>
    <button @click="onClick">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
})
export default class AmazingButton extends Vue {

    private disabled!: boolean;

    onClick() {
        if(!this.disabled) {
            this.$emit("customEvent");
        }
    }
}
</script>
