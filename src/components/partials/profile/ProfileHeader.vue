<template>
    <div class="d-flex pt-4 fade-in row">
        <div class="col-sm-1 col-xs-12 icon-wrapper">
            <polkadot-web-identicon
                size="100"
                :address="identity.basicInfo.address"
                theme="polkadot"
            />
        </div>
        <div class="mx-4 col">
            <h4>{{ identity.basicInfo.display }}</h4>
            <div class="d-flex flex-row">
                <p class="fw-light text-muted" style="overflow-wrap: anywhere">
                    Address: {{ identity.basicInfo.address }}
                </p>
                <!-- TODO: add copy to clip board feature -->
                <!-- <span class="text-decoration-none link-primary mx-2">                    
                    <ion-icon size="small" name="copy-outline"></ion-icon>
                </span> -->
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
                        fw-light
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

                <!-- <p class="text-success m-0 mx-3">Verified by 9 registrars</p> -->
                <!-- TODO: add this info from getIdentity -->
            </div>
        </div>
        <!-- <div class="ms-auto">
            <button
                class="btn btn-primary fw-bold w-100 text-white"
                type="submit"
                @click="sendToken"
            >
                SEND Token
            </button>
        </div> -->
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

    sendToken() {
        alert("Feature will come soon :)");
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
.text-success {
    line-height: 40px;
}

.tag {
    line-height: 30px;
}
.icon-wrapper {
    justify-content: center;
    display: flex;
    @include media-breakpoint-up(sm) {
        display: block;
    }
}
</style>