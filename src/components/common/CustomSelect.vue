<template>
    <div
        :tabindex="tabindex"
        class="custom-select"
        :style="
            hasBorder
                ? { border: 'solid 1px #dee2e6', borderRadius: '0.25rem' }
                : ''
        "
        @blur="open = false"
    >
        <span v-if="icon" class="icon fw-light text-muted">
            <img
                :src="require(`@/assets/icons/${icon}`)"
                class="fw-light text-muted"
                style="width: 16px"
            />
        </span>
        <div
            :class="{ open: open }"
            class="selected fw-light text-muted"
            :style="!icon ? { paddingLeft: '12px' } : ''"
            @click="onSelectClick"
        >
            {{
                hasInPrefix
                    ? `In ${selected?.displayValue}`
                    : selected?.displayValue
            }}
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
                <p
                    v-if="option.subText"
                    class="fw-light text-muted subtext mb-0 pb-2"
                >
                    {{ option.subText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UISelectOption } from "@/interfaces/UISelectOption";

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
        },
        selectedKey: {
            type: String,
            required: true
        },
        hasBorder: {
            type: Boolean,
            default: false
        },
        hasInPrefix: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ""
        }
    },
    watch: {
        // If the selected key gets changed from the parent component,
        // we listen and update the selected item internally too
        selectedKey() {
            this.selected =
                this.options.find(
                    ({ key }: UISelectOption) => key === this.selectedKey
                ) ?? this.options[0];
        },
        options() {
            this.selected =
                this.options.find(
                    ({ key }: UISelectOption) => key === this.selectedKey
                ) ?? this.options[this.options.length - 1];
            this.$emit("update:selectedKey", this.selected?.key);
        }
    }
})
export default class CustomSelect extends Vue {
    options!: Array<UISelectOption>;
    selectedKey!: string;
    selected?: UISelectOption = {
        key: "",
        displayValue: "",
        subText: ""
    };
    open = false;

    created() {
        this.selected =
            this.options.find(({ key }) => key === this.selectedKey) ??
            this.options[0];
        this.$emit("update:selectedKey", this.selected?.key);
    }

    onSelectClick() {
        this.open = !this.open;
    }

    setOption(option: UISelectOption) {
        this.selected = option;
        this.open = false;
        this.$emit("update:selectedKey", this.selected?.key);
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
img {
    margin-top: -9px;
    height: 16px;
    width: auto !important;
}

.custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 50px;
    line-height: 47px;

    .selected {
        background-color: #fff;
        border-radius: 6px;
        border: none;
        color: #000;
        padding-left: 3.7rem;
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
            right: 1.5rem;
            width: 10px;
            height: 10px;
            transform: rotate(45deg) translateY(-50%);
            transform-origin: right;
        }
    }

    .icon {
        position: absolute;
        content: "";
        top: 5%;
        left: 15px;
        vertical-align: middle;
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
        top: 48px;
        z-index: 1;
        box-shadow: 14px 14px 20px 2px rgba(0, 0, 0, 0.1);

        div {
            color: #000;
            padding-left: 1em;
            cursor: pointer;
            user-select: none;

            .subtext {
                margin-top: -8px;
                line-height: 20px;
            }

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