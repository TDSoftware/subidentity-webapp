<template>
    <div v-if="open" class="modal">
        <div class="modal-inner">
            <div class="header row mb-3">
                <h3 class="col"><slot name="title"></slot></h3>
                <button
                    class="col btn btn-link text-muted"
                    :style="{ flex: '0 0 50px' }"
                    @click="close"
                >
                    <ion-icon
                        name="close-circle-outline"
                        size="large"
                    ></ion-icon>
                </button>
            </div>
            <div class="body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: "Modal",
    props: {
        open: {
            type: Boolean,
            required: true
        }
    }
})
export default class Modal extends Vue {
    close() {
        this.$emit("update:open", false);
    }
}
</script>

<style lang="scss" scoped>
@keyframes modal-fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes modal-drive-in {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.51);
    z-index: 10;
    display: flex;
    animation: modal-fade-in 0.2s ease-out;

    .modal-inner {
        animation: modal-drive-in 0.3s ease-out;
        width: 100%;
        max-width: 712px;
        background: white;
        margin: auto;
        border-radius: 4px;
        padding: 32px 40px;

        .header {
            button {
                padding: 0;
            }
        }
    }
}
</style>