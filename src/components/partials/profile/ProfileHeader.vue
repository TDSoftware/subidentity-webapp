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
                <div
                    class="d-flex flex-row"
                    @click="copy(identity.basicInfo.address)"
                >
                <p
                        class="fw-light text-muted"
                        style="overflow-wrap: anywhere"
                    >
                        Address: {{ identity.basicInfo.address }}
                    </p>
                    <span class="text-decoration-none link-primary mx-2">
                        <ion-icon size="small" name="copy-outline"></ion-icon>
                    </span>
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
                        <ion-icon
                            size="small"
                            class="fw-light text-muted pt-1"
                            name="git-network-outline"
                        ></ion-icon>

                        <div class="mx-1">{{ identity.chain }}</div>
                    </div>
                    <div v-if="checkJudgements() > 1" class="verified">Verified by {{checkJudgements()}} registrars</div>
                    <div v-else-if="checkJudgements() === 1" class="verified">Verified by {{checkJudgements()}} registrar</div>
                    <div v-else-if="checkJudgements() === 0" class="not-verified text-muted"> <ion-icon name="information-circle-outline" class="info-pink" size="small"></ion-icon> Not verified</div>
                    <div v-else-if="checkJudgements() < 0" class="pending text-muted">Judgement in progress</div>
                </div>
            </div>
            <!-- <div class="ms-auto">
            <button
                class="btn btn-primary fw-bold w-100 text-white"
                type="submit"
                @click="sendToken"
            >
                SEND TOKEN
            </button>
        </div> -->
        </div>
    </div>
    <div class="mobile-profile mb-4 pt-3">
        <div class="row">
            <div class="col-3">
                <polkadot-web-identicon
                    size="80"
                    :address="identity.basicInfo.address"
                    theme="polkadot"
                />
            </div>
            <div class="col pt-2">
                <h4>{{ identity.basicInfo.display }}</h4>
            </div>
        </div>
        <div
            class="d-flex flex-row address"
            @click="copy(identity.basicInfo.address)"
        >
            <p class="fw-light text-muted" style="overflow-wrap: anywhere">
                Address: {{ identity.basicInfo.address }}
            </p>
            <span class="text-decoration-none link-primary mx-2">
                <ion-icon size="small" name="copy-outline"></ion-icon>
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
                <ion-icon
                    size="small"
                    class="fw-light text-muted pt-1"
                    name="git-network-outline"
                ></ion-icon>

                <div class="mx-1">{{ identity.chain }}</div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Identity } from "@npmjs_tdsoftware/subidentity";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        identity: {
            type: Object,
            required: true
        }
    }
})
export default class ProfileHeader extends Vue {
    identity!: Identity;
    checkJudgements(){
        if(this.identity){
            if(this.identity.judgements){
                const keys = this.identity.judgements?.keys();
                let count = 0;
                let pending = 0;
                for (let x of keys!){
                    if (this.identity.judgements![x] !== undefined){
                        if (this.identity.judgements![x] !== "FeePaid"){
                            count ++;
                        }
                        else{
                            pending ++;
                        }
                    }
                }
                if (count !== 0){
                    return count;
                }
                else if(pending !== 0){
                    return -pending;
                }
                else{
                    return count;
                }
            }
        }

    }

    sendToken() {
        alert("Feature will come soon :)");
    }
    async copy(s: string) {
        if (!s) return;
        await navigator.clipboard.writeText(s);
        //this.$toastr.success("Copied!", true);
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
.info-pink{
  color: $primary;
  margin-right: 2px;
}
.verified{
  margin-left: 15px;
  color: #198754;
}
.not-verified{
  margin-left: 15px;
  display: flex;
  align-items: center;
  //color: $primary;
}
.pending{
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
</style>
