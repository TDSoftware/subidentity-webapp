<template>
    <div class="alert alert-danger d-flex align-items-center p-2" role="alert">
        <ion-icon class="icon mx-2 text-body" name="warning-outline"></ion-icon>
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
        }
    }
})
export default class Alert extends Vue {}
</script>
<style lang="scss" scoped>
.icon {
    font-size: 20px;
}
.alert {
    background-color: #ffeaf5;
    border-color: #ffeaf5;
}
</style>