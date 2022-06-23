<template>
    <div
        class="d-flex align-items-center p-2"
        :class="[isError ? 'alert-danger' : 'alert-success']"
        role="alert"
    >
        <img
            :src="
                isError
                    ? require(`@/assets/icons/warning-outline.svg`)
                    : require(`@/assets/icons/checkmark-circle-outline.svg`)
            "
            class="mx-2 icon"
        />
        <div class="text-body fw-light" v-html="message"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        message: {
            type: String,
            required: true
        },
        isError: {
            type: Boolean,
            default: false
        }
    }
})
export default class Alert extends Vue {}
</script>
<style lang="scss" scoped>
.icon {
    width: 20px;
}
.alert-danger {
    background-color: #ffeaf5;
    border-color: #ffeaf5;
}
</style>