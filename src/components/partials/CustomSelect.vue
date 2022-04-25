<template>
    <div :tabindex="tabindex" class="custom-select" @blur="open = false">
        <span class="icon fw-light text-muted">$</span>
        <div :class="{ open: open }" class="selected fw-light text-muted" @click="open = !open">
            {{ selected }}
        </div>
        <div :class="{ selectHide: !open }" class="items">
            <div
                v-for="(option, i) of options"
                :key="i"
                class="fw-light text-muted"
                @click="
          selected = option;
          open = false;
          $emit('change', option);
        ">
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
    name: "CustomSelect",
    props: {
        options: {
            type: Array,
            required: true
        },
        defaultValue: {
            type: String,
            required: false,
            default: null
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0
        }
    }
})
export default class CustomSelect extends Vue {
    private defaultValue!: string;
    private options!: Array<string>;
    private selected: string | null = "";
    private open = false;

    created() {
        console.log(this.options.length);
        this.selected = this.defaultValue ? this.defaultValue : this.options.length > 0 ? this.options[0] : null;
        this.$emit("change", this.selected);


    }


}
</script>

<style lang="scss" scoped>
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
        padding-left: 3em;
        cursor: pointer;
        user-select: none;

        &.open {
            border: 1px solid #fff;
        }

        &:after {
            border-bottom: 1px solid #707070;
            border-right: 1px solid #707070;
            position: absolute;
            content: "";
            top: 25px;
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
        top: 2px;
        left: 5%;
    }

    .items {
        color: #000;
        overflow: hidden;
        border-right: 1px solid #EEEEEE;
        border-left: 1px solid #EEEEEE;
        border-bottom: 1px solid #EEEEEE;
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
                background-color: #EEEEEE;
            }
        }
    }
}

.selectHide {
    display: none;
}
</style>