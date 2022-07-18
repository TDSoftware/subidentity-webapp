<template>
    <Accordion icon="file-tray-full-outline.svg">
        <template #title>GOVERNANCE</template>
        <template #body>
            <div class="mb-3" v-for="(governance, i) in governance" :key="i">
                <div v-if="i < limitBy">
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
                        Block #{{ governance.block }}
                    </p>
                    <div
                        v-if="governance.type === 'PRO_VOTE'"
                        class="d-flex flex-row avatar"
                    >
                        <div class="img-wrapper">
                            <img
                                src="../../../../assets/icons/happy-outline.svg"
                                class="icon border rounded-circle p-1"
                            />
                        </div>
                        <p class="mb-0 fw-bold w-100">
                            {{ governance.activity }} on
                            {{ governance.primaryObject }}
                            <span class="text-decoration-none link-primary">
                                #{{ governance.primaryObjectNumber }}
                            </span>
                            for {{ governance.secondaryObject }}
                            <span class="text-decoration-none link-primary">
                                #{{ governance.secondaryObjectNumber }}
                            </span>
                        </p>
                    </div>

                    <div
                        v-if="governance.type === 'TREASURY'"
                        class="d-flex flex-row avatar"
                    >
                        <div class="img-wrapper">
                            <img
                                src="../../../../assets/icons/wallet.svg"
                                class="icon border rounded-circle p-1"
                            />
                        </div>
                        <p class="mb-0 fw-bold">
                            {{ governance.activity }} on
                            {{ governance.primaryObject }} with reason "{{
                                governance.additionalInfoType
                            }}"
                        </p>
                    </div>

                    <div
                        v-if="governance.type === 'CON_VOTE'"
                        class="d-flex flex-row avatar"
                    >
                        <div class="img-wrapper">
                            <img
                                src="../../../../assets/icons/sad-outline.svg"
                                class="icon border rounded-circle p-1"
                            />
                        </div>
                        <p class="mb-0 fw-bold w-100">
                            {{ governance.activity }} on
                            {{ governance.primaryObject }}
                            <span class="text-decoration-none link-primary">
                                #{{ governance.primaryObjectNumber }}
                            </span>
                            for {{ governance.secondaryObject }}
                            <span class="text-decoration-none link-primary">
                                #{{ governance.secondaryObjectNumber }}
                            </span>
                        </p>
                    </div>

                    <div
                        v-if="governance.type === 'COUNCILOR_MISSED'"
                        class="d-flex flex-row avatar"
                    >
                        <div class="img-wrapper">
                            <img
                                src="../../../../assets/icons/warning-outline.svg"
                                class="icon border rounded-circle p-2 bg-light"
                            />
                        </div>
                        <p class="mb-0 fw-bold w-100">
                            {{ governance.activity }} on
                            {{ governance.primaryObject }}
                            <span class="text-decoration-none link-primary">
                                #{{ governance.primaryObjectNumber }}
                            </span>
                            for {{ governance.secondaryObject }}
                            <span class="text-decoration-none link-primary">
                                #{{ governance.secondaryObjectNumber }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div
                v-if="governance.length > 10"
                class="d-flex flex-row pt-4 link-primary"
            >
                <p
                    class="mx-2"
                    @click="toggleData(defaultLimit, governance.length)"
                >
                    {{ limitBy === 10 ? "Show more" : "  Show less" }}
                </p>
                <img
                    src="../../../../assets/icons/arrow-forward-outline-primary.svg"
                    class="arrow"
                />
            </div>
        </template>
    </Accordion>
</template>

<script lang="ts">
import Accordion from "@/components/common/Accordion.vue";
import { Options, Vue } from "vue-class-component";
import { DetailedIdentity } from "@/interfaces/DetailedIdentity";

@Options({
    components: {
        Accordion
    },
    props: {
        identity: {
            type: Object,
            required: true
        }
    }
})
export default class GovernancePlugin extends Vue {
    identity!: DetailedIdentity;
    defaultLimit = 10;
    limitBy = 10;

    get governance() {
        return this.identity.governance;
    }

    toggleData(defaultLimit: number, dataLength: number) {
        this.limitBy =
            this.limitBy === defaultLimit ? dataLength : defaultLimit;
    }
}
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