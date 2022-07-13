<template>
    <div class="profile">
        <div class="d-flex pt-4 fade-in row">
            <div class="col-sm-1 col-xs-12 icon-wrapper mb-4">
                <polkadot-web-identicon
                    size="130"
                    :address="identity.basicInfo.address"
                    theme="polkadot"
                />
            </div>
            <div class="mx-4 col">
                <h4>{{ identity.basicInfo.display }}</h4>
                <div>
                    <div
                        class="d-flex flex-row copy"
                        @click="copy(identity.basicInfo.address, 'basic-copy')"
                    >
                        <p
                            class="fw-light text-muted"
                            style="overflow-wrap: anywhere"
                            id="basic-copy"
                        >
                            Address: {{ identity.basicInfo.address }}
                        </p>
                        <span class="text-decoration-none link-primary mx-2">
                            <img
                                src="../../../assets/icons/copy-outline-primary.svg"
                                style="width: 18px"
                            />
                        </span>
                    </div>
                </div>
                <div class="d-flex flex-row" style="align-items: center">
                    <div
                        class="
                            d-flex
                            flex-row
                            text-capitalize
                            bg-light
                            border
                            rounded
                            p-1
                            tag
                            text-muted
                        "
                    >
                        <img
                            src="../../../assets/icons/git-network-outline-muted.svg"
                            style="width: 16px"
                        />

                        <div class="mx-1">{{ identity.chain }}</div>
                    </div>
                    <div v-if="checkJudgements() > 1" class="verified">
                        Verified by {{ checkJudgements() }} registrars
                    </div>
                    <div v-else-if="checkJudgements() === 1" class="verified">
                        Verified by {{ checkJudgements() }} registrar
                    </div>
                    <div
                        v-else-if="checkJudgements() === 0"
                        class="not-verified text-muted"
                    >
                        <img
                            src="../../../assets/icons/information-circle-outline-primary.svg"
                            style="width: 18px; margin-right: 4px"
                        />
                        Not verified
                    </div>
                    <div
                        v-else-if="checkJudgements() < 0"
                        class="pending text-muted"
                    >
                        Judgement in progress
                    </div>
                </div>
            </div>
            <div class="ms-auto" style="width: 181px; padding-top: 24px">
                <button
                    class="btn btn-primary fw-bold w-100 text-white"
                    type="submit"
                    :disabled="web3Accounts.length === 0"
                    @click="sendToken"
                >
                    SEND TOKEN
                </button>
            </div>
        </div>
    </div>
    <div class="mobile-profile mb-4 pt-3">
        <div class="row">
            <div class="col-2">
                <polkadot-web-identicon
                    size="80"
                    :address="identity.basicInfo.address"
                    theme="polkadot"
                />
            </div>
            <div class="col pt-2 mx-1">
                <h4>{{ identity.basicInfo.display }}</h4>
            </div>
        </div>
        <div
            class="d-flex flex-row address"
            @click="copy(identity.basicInfo.address, 'mobile-copy')"
        >
            <p
                class="fw-light text-muted"
                style="overflow-wrap: anywhere"
                id="mobile-copy"
            >
                Address: {{ identity.basicInfo.address }}
            </p>
            <span class="text-decoration-none link-primary mx-2">
                <img
                    src="../../../assets/icons/copy-outline-primary.svg"
                    style="width: 18px"
                />
            </span>
        </div>
        <div class="d-flex flex-row">
            <div
                class="
                    d-flex
                    flex-row
                    text-capitalize
                    bg-light
                    border
                    rounded
                    p-1
                    tag
                    text-muted
                "
            >
                <img
                    src="../../../assets/icons/git-network-outline-muted.svg"
                    style="width: 16px"
                />

                <div class="mx-1">{{ identity.chain }}</div>
            </div>
            <div style="display: flex; align-items: center">
                <div v-if="checkJudgements() > 1" class="verified">
                    Verified by {{ checkJudgements() }} registrars
                </div>
                <div v-else-if="checkJudgements() === 1" class="verified">
                    Verified by {{ checkJudgements() }} registrar
                </div>
                <div
                    v-else-if="checkJudgements() === 0"
                    class="not-verified text-muted"
                >
                    <img
                        src="../../../assets/icons/information-circle-outline-primary.svg"
                        style="width: 18px; margin-right: 4px"
                    />
                    Not verified
                </div>
                <div
                    v-else-if="checkJudgements() < 0"
                    class="pending text-muted"
                >
                    Judgement in progress
                </div>
            </div>
        </div>
        <!-- <div class="ms-auto" style="padding-top: 24px">
            <button
                class="btn btn-primary fw-bold w-100 text-white"
                type="submit"
                :disabled="web3Accounts.length === 0"
                @click="sendToken"
            >
                SEND TOKEN
            </button>
        </div> -->
    </div>
    <SendTokenModal
        v-model:open="sendTokenModalOpen"
        :identity="identity"
        :web3Accounts="web3Accounts"
    />
</template>

<script lang="ts">
import { Identity } from "@npmjs_tdsoftware/subidentity";
import { Options, Vue } from "vue-class-component";
import SendTokenModal from "./SendTokenModal.vue";

@Options({
    components: {
        SendTokenModal
    },
    props: {
        identity: {
            type: Object,
            required: true
        },
        web3Accounts: {
            type: Array,
            required: true
        }
    }
})
export default class ProfileHeader extends Vue {
    identity!: Identity;
    sendTokenModalOpen = false;
    web3Accounts!: [];

    checkJudgements() {
        if (this.identity) {
            if (this.identity.judgements) {
                const keys = this.identity.judgements?.keys();
                let count = 0;
                let pending = 0;
                for (let x of keys!) {
                    if (this.identity.judgements![x] !== undefined) {
                        if (this.identity.judgements![x] !== "FeePaid") {
                            count++;
                        } else {
                            pending++;
                        }
                    }
                }
                if (count !== 0) {
                    return count;
                } else if (pending !== 0) {
                    return -pending;
                } else {
                    return count;
                }
            }
        }
    }

    sendToken() {
        this.sendTokenModalOpen = true;
    }
    async copy(s: string, id: string) {
        if (!s) return;
        await navigator.clipboard.writeText(s);
        let element = document.getElementById(id) as HTMLElement;
        if (element.classList.contains("flash")) return;
        element.className += " flash";
        setTimeout(function () {
            element.classList.remove("flash");
        }, 500);
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
.verified {
    margin-left: 15px;
    color: #198754;
}
.not-verified {
    margin-left: 15px;
    display: flex;
    align-items: center;
    //color: $primary;
}
.pending {
    margin-left: 15px;
}
.text-success {
    line-height: 40px;
}
p {
    white-space: nowrap;
    width: 20em;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tag {
    line-height: 25px;
}
.icon-wrapper {
    justify-content: center;
    display: flex;
    & > * {
        transform: translateX(20px);
    }
    @include media-breakpoint-up(sm) {
        display: block;
        & > * {
            transform: none;
        }
    }
}

.mobile-profile {
    display: none;
}

.copy {
    max-width: fit-content;
}

@include media-breakpoint-down(lg) {
    .mobile-profile {
        display: block;
        .address {
            margin-top: -20px;
        }
    }
    .profile {
        display: none;
    }
}
.flash {
    color: $primary !important;
}
</style>

