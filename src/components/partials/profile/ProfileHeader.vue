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
                        id="basic-copy"
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
            @click="copy(identity.basicInfo.address, 'mobile-copy')"
            id="mobile-copy"
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

            <!-- <p class="text-success m-0 mx-3">Verified by 9 registrars</p> -->
            <!-- TODO: add this info from getIdentity -->
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

    sendToken() {
        alert("Feature will come soon :)");
    }
    async copy(s: string, id: string) {
        if (!s) return;
        await navigator.clipboard.writeText(s);
        console.log("Copied from id: " + id);
        let element  = document.getElementById(id) as HTMLElement;
        console.log(element);
        if (element.classList.contains("flash")) return;
        element.className += " flash";
        setTimeout(function() {
            element.classList.remove("flash");
        }, 500);

        //this.$toastr.success("Copied!", true);
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
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

.copy{
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
  -webkit-animation-name: flash-animation;
  -webkit-animation-duration: 0.6s;

  animation-name: flash-animation;
  animation-duration: 0.6s;
  animation-duration: 0.6s;
  animation-duration: 0.6s;
}

@-webkit-keyframes flash-animation {
  from { background: $primary; }
  to   { background: white; }
}

@keyframes flash-animation {
  from { background: $primary; }
  to   { background: white; }
}
</style>