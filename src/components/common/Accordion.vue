<template>
    <div class="accordion">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button"
                    :class="{ collapsed: collapsed }"
                    type="button"
                    @click="onCollapseClick"
                >
                    <img src="../../assets/icons/information-circle-outline.svg" class="icon">
                    <span class="fw-bold mx-2">
                        <slot name="title" />
                    </span>
                </button>
            </h2>
            <div class="accordion-collapse fade-in" v-if="!collapsed">
                <div class="accordion-body">
                    <slot name="body"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Accordion extends Vue {
    collapsed = false;

    onCollapseClick() {
        this.collapsed = !this.collapsed;
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.icon {
    width: 26px;
}
.accordion-button:not(.collapsed) {
    color: #212529;
    background-color: #eeeeee;
    &::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23212529%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e");
    }
}
</style>
