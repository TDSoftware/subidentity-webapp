<template>
    <div class="accordion">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button">
                    <ion-icon
                        size=""
                        class="icon"
                        name="information-circle-outline"
                    ></ion-icon>
                    <span class="fw-bold mx-2">
                        <slot name="title" />
                    </span>
                </button>
            </h2>
            <div class="accordion-collapse collapse">
                <div class="accordion-body">
                    <slot name="body"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {}
})
export default class Accordion extends Vue {}
</script>
<style scoped>
.icon {
    font-size: 26px;
}
</style>
