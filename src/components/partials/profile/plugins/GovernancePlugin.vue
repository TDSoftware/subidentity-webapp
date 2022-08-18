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
                        :activity="renderProfileActivity(governance)"
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
import { formatProfileActivity } from "@/util/formatProfileActivity";
import { AccountActivity } from "@/interfaces/AccountActivity";

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

    renderProfileActivity(governance: AccountActivity) {
        return formatProfileActivity(governance);
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