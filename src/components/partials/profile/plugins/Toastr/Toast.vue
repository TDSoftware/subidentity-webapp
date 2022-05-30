<template>
    <transition :name="toast.subtle ? 'slide-fade' : 'fade'">
        <div class="tds-toast-wrapper" :class="{subtle: toast.subtle}" v-if="show" @click="closeToast">
            <div class="tds-toast-container">
                <div class="tds-toast" :class="toast.type" @click.stop="toastClicked">
                    <div>
                        <div v-html="toast.text"></div>
                        <div class="closeBtn" @click="closeToast" v-if="!toast.subtle"></div>
                    </div>
                    <!--          <TDSButton button-style="link" @click="closeToast" v-if="!toast.subtle">Close</TDSButton>-->
                    <!--          <button class="btn btn-link mt-2" type="button" @click="closeToast" v-if="!toast.subtle">Close</button>-->
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TDSButton from "@/components/common/TDSButton.vue";

interface ToastType {
    text: string;
    type: string;
    subtle: boolean;
}

export default class Toast extends Vue {
    private toast!: ToastType;
    private show: boolean = false;
    private autoHide: boolean = false;
    private duration: number = 3000;

    mounted() {
        this.$nextTick(() => {
            this.show = true;
            if (this.autoHide) setTimeout(() => this.closeToast(), this.duration);
        });
    }

    private closeToast() {
        this.show = false;
        setTimeout(() => {
            this.$emit("close");
        }, 500);
    }

    private toastClicked() {
        this.$emit("clickedToast");
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease-in-out;
}

.slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
{
    transform: translateY(24px);
    opacity: 0;
}

.slide-fade-leave-to {
    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

/deep/ .tds-button-link {
    padding: 0;
    margin-top: 8px;
    height: auto;
}

.tds-toast-wrapper {
    position: fixed;
    bottom: 24px;
    z-index: 1010;
    width: 100vw;

    &:not(.subtle) {
        top: 0;
        left: 0;
        height: 100vh;
        background-color: rgba(white, 0.9);
    }

    &:hover {
        cursor: pointer;
    }

    .tds-toast-container {
        height: 80vh;
        width: 80%;
        max-width: 400px;
        margin: 20vh auto 0 auto;

        .tds-toast {
            background-color: white;
            padding: 24px 24px 24px 72px;
            border-radius: 5px;
            border: solid 1px $greyShade3;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.09), 0 0 3px rgba(0, 0, 0, 0.09);
            background-position: 24px 24px;
            background-size: 32px;
            background-repeat: no-repeat;
            margin: 0 0 4px 0;
            line-height: 32px;

            &:hover {
                cursor: initial;
            }

            &.info {
                background-image: url("../../../../../assets/light-on-red.svg");
            }

            &.error {
                background-image: url("../../../../../assets/alarm-warning-red.svg");
            }

            &.success {
                background-image: url("../../../../../assets/check-circle-green.svg");
            }

            > div {
                display: flex;

                > div:first-child {
                    flex: 1;
                }
            }

            .btn.btn-link {
                color: $fullGrey;
                padding: 0;

                &:hover {
                    cursor: pointer;
                }
            }

            .closeBtn {
                background: transparent url("../../../../../assets/close-circle-grey71.svg") no-repeat center;
                position: relative;
                z-index: 99;
                margin-left: 8px;
                height: 24px;
                width: 24px;
                display: inline-block;

                &:hover {
                    cursor: pointer;
                }

                float: right;
            }
        }
    }

    &.subtle .tds-toast-container {
        width: fit-content;
        height: auto;
        margin: 0 auto;

        .tds-toast {
            padding: 12px 60px 12px 80px;
            background-size: 20px;
            background-position: 52px 50%;

            //&.success {
            //  background-color: $greenShade1;
            //  color: $greenShade2;
            //  border-color: $greenShade2;
            //}
        }
    }
}

/deep/ pre {
    overflow: hidden;
    line-break: normal;
    white-space: normal;
    margin-top: 8px;
}
</style>
