<template>
    <div :tabindex="tabindex" class="custom-select" @blur="open = false">
        <span class="icon fw-light text-muted">
            <ion-icon
                class="fw-light text-muted"
                name="git-network-outline"
            ></ion-icon>
        </span>
        <div
            :class="{ open: open }"
            class="selected fw-light text-muted"
            @click="onSelectClick"
        >
            {{ selected?.displayValue }}
        </div>
        <div :class="{ selectHide: !open }" class="items">
            <div
                v-for="(option, i) of options"
                :key="i"
                ref="select-option"
                class="select-option fw-light text-body"
                @click="setOption(option)"
            >
                {{ option.displayValue }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ChainOption } from "@/interfaces/ChainOptions";

@Options({
    name: "CustomSelect",
    props: {
        options: {
            type: Array,
            required: true
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0
        }
    }
})
export default class CustomSelect extends Vue {
    private options!: Array<ChainOption>;
    private selected: ChainOption | null = {
        key: "",
        displayValue: ""
    };
    private open = false;

    created() {
        this.selected = this.options.length > 0 ? this.options[0] : null;
        this.$emit("change", this.selected?.key);
    }

    private onSelectClick() {
        this.open = !this.open;
    }

    private setOption(option: ChainOption) {
        this.selected = option;
        this.open = false;
        this.$emit("change", this.selected?.key);
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;

    .selected {
        background-color: #fff;
        border-radius: 6px;
        border: 1px solid #fff;
        color: #000;
        padding-left: 4rem;
        padding-right: 2rem;
        user-select: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;

        @include media-breakpoint-up(lg) {
            padding-left: 3rem;
        }

        &:hover {
            cursor: pointer;
        }

        &.open {
            border: 1px solid #fff;
        }

        &:after {
            border-bottom: 1px solid #707070;
            border-right: 1px solid #707070;
            position: absolute;
            content: "";
            top: 23px;
            right: 1em;
            width: 10px;
            height: 10px;
            transform: rotate(45deg) translateY(-50%);
            transform-origin: right;
        }
    }

    .icon {
        position: absolute;
        content: "";
        top: 14%;
        left: 5%;
    }

    .items {
        color: #000;
        overflow: hidden;
        border-right: 1px solid #eeeeee;
        border-left: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        position: absolute;
        background-color: #fff;
        left: 0;
        right: 0;
        top: 56px;
        z-index: 1;

        div {
            color: #000;
            padding-left: 1em;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: #eeeeee;
            }
        }
    }
}

.selectHide {
    display: none;
}
</style>