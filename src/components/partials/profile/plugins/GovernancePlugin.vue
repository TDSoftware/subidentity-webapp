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
                    <ProfileActivity
                        v-if="governance.type === 'PRO_VOTE'"
                        icon="happy-outline.svg"
                        message="voted yay on council motion #100 for treasury spend #90"
                    />

                    <ProfileActivity
                        v-if="governance.type === 'TREASURY'"
                        icon="wallet.svg"
                        message="tipped on treasury tip with reason 'reason'"
                    />
                    <ProfileActivity
                        v-if="governance.type === 'CON_VOTE'"
                        icon="sad-outline.svg"
                        message="voted nay on council motion #99 for treasury spend #89"
                    />
                    <ProfileActivity
                        v-if="governance.type === 'COUNCILOR_MISSED'"
                        icon="warning-outline.svg"
                        message="did not vote on council motion #96 for treasury spend #84"
                    />
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
import ProfileActivity from "../ProfileActivity.vue";

@Options({
    components: {
        Accordion,
        ProfileActivity
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
.arrow {
    width: 16px;
    height: 16px;
    margin-top: 5px;
}
</style>