<template>
    <Accordion icon="wallet-outline.svg">
        <template #title>TREASURY</template>
        <template #body>
            <div class="mb-3">
                <p
                    class="
                        fw-light
                        text-muted
                        border border-1
                        rounded-2
                        p-2
                        w-50
                    "
                >
                    Block #84094033
                </p>
                <div class="d-flex flex-row avatar">
                    <div class="img-wrapper">
                        <img
                            src="../../../../assets/icons/happy-outline.svg"
                            class="icon border rounded-circle p-1"
                        />
                    </div>
                    <p class="mb-0 fw-bold w-100 pt-2">
                        voted yay on Referenda
                        <span class="text-decoration-none link-primary">
                            #24
                        </span>
                    </p>
                </div>
            </div>
            <div class="mb-3">
                <p
                    class="
                        fw-light
                        text-muted
                        border border-1
                        rounded-2
                        p-2
                        w-50
                    "
                >
                    Block #84094033
                </p>
                <div class="d-flex flex-row avatar">
                    <div class="img-wrapper">
                        <img
                            src="../../../../assets/icons/information-circle-outline.svg"
                            class="icon border rounded-circle p-1"
                        />
                    </div>
                    <p class="mb-0 fw-bold">
                        tipped on treasury tip with reason "Treasury tip reason"
                    </p>
                </div>
            </div>
            <div class="mb-3">
                <p
                    class="
                        fw-light
                        text-muted
                        border border-1
                        rounded-2
                        p-2
                        w-50
                    "
                >
                    Block #84094033
                </p>
                <div class="d-flex flex-row avatar">
                    <div class="img-wrapper">
                        <img
                            src="../../../../assets/icons/sad-outline.svg"
                            class="icon border rounded-circle p-1"
                        />
                    </div>
                    <p class="mb-0 fw-bold w-100 pt-2">
                        voted nay on Referenda
                        <span class="text-decoration-none link-primary">
                            #20
                        </span>
                    </p>
                </div>
            </div>
            <div class="mb-3">
                <p
                    class="
                        fw-light
                        text-muted
                        border border-1
                        rounded-2
                        p-2
                        w-50
                    "
                >
                    Block #84094033
                </p>
                <div class="d-flex flex-row avatar">
                    <div class="img-wrapper">
                        <img
                            src="../../../../assets/icons/wallet.svg"
                            class="icon border rounded-circle p-1"
                        />
                    </div>
                    <p class="mb-0 fw-bold w-100 pt-2">
                        tipped on treasury tip with reason "Treasury tip reason"
                    </p>
                </div>
            </div>
            <div class="mb-3">
                <p
                    class="
                        fw-light
                        text-muted
                        border border-1
                        rounded-2
                        p-2
                        w-50
                    "
                >
                    Block #84094033
                </p>
                <div class="d-flex flex-row avatar">
                    <div class="img-wrapper">
                        <img
                            src="../../../../assets/icons/warning-outline.svg"
                            class="icon border rounded-circle p-2 bg-light"
                        />
                    </div>
                    <p class="mb-0 fw-bold w-100">
                        did not vote on council motion
                        <span class="text-decoration-none link-primary">
                            #20
                        </span>
                        despite being a councilor
                    </p>
                </div>

                <div class="d-flex flex-row pt-4 link-primary">
                    <p class="mx-2">Show More</p>
                    <img
                        src="../../../../assets/icons/arrow-forward-outline-primary.svg"
                        class="arrow"
                    />
                </div>
            </div>
        </template>
    </Accordion>
</template>

<script lang="ts">
import Accordion from "@/components/common/Accordion.vue";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
        Accordion
    }
})
export default class TreasuryPlugin extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../../styles/variables";

.avatar {
    height: 100%;
    .img-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            object-fit: scale-down;
            margin-right: 10px;
            height: 45px;
            width: 45px;
        }
    }
    p {
        margin: 0;
        justify-content: center;
        overflow-wrap: anywhere;
    }
}

.arrow {
    width: 16px;
    height: 16px;
    margin-top: 5px;
}
</style>