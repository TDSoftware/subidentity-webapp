<template>
    <div
        class="row mx-0 py-3 px-2 identity-list-item"
        @click="$router.push(profileAddress)"
    >
        <div class="col-md col-sm-12">
            <div class="d-flex flex-row avatar">
                <div class="img-wrapper" v-if="showPolkadotIcon">
                    <polkadot-web-identicon
                        size="50"
                        :address="identity.basicInfo.address"
                        theme="polkadot"
                    />
                </div>
                <h6>{{ identity.basicInfo.display }}</h6>
            </div>
        </div>
        <div class="col-md col-sm-12 text-muted vertical-centered-column">
            {{ identity.basicInfo.email || "-" }}
        </div>
        <div
            class="
                col
                text-muted
                vertical-centered-column
                font-monospace
                address-col
            "
        >
            {{ identity.basicInfo.address }}
        </div>
        <div class="col-md col-sm-12 vertical-centered-column chain-col">
            <div
                class="
                    d-flex
                    flex-row
                    chain-name-badge
                    badge
                    text-capitalize
                    bg-light
                    text-truncate
                "
            >
                <div class="text-muted">
                    <img
                        src="../../assets/icons/git-network-outline-muted.svg"
                        style="width: 16px; margin-top: -4px"
                    />
                </div>
                <div class="mx-2">{{ identity.chain }}</div>
            </div>
        </div>
        <div
            class="col-md col-sm-12 vertical-centered-column"
            style="flex: 0 0 100px"
        >
            <span class="text-decoration-none link-primary">
                <div class="d-flex flex-row">
                    <span>Details</span>
                    <img
                        src="../../assets/icons/arrow-forward-outline-primary.svg"
                        style="
                            width: 16px;
                            height: 16px;
                            margin-top: 4px;
                            margin-left: 10px;
                        "
                    />
                </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Identity } from "@npmjs_tdsoftware/subidentity";

@Options({
    props: {
        identity: {
            type: Object,
            required: true
        }
    },
    watch: {
        identity() {
            this.triggerPolkadotIconUpdate();
        },
        $route() {
            const searchParams = new URLSearchParams(window.location.search);
            this.chain = searchParams.get("chain") ?? "";
        }
    }
})
export default class IdentityListItem extends Vue {
    identity!: Identity;
    showPolkadotIcon = true;
    chain = "";

    created() {
        const searchParams = new URLSearchParams(window.location.search);
        this.chain = searchParams.get("chain") ?? "";
    }

    get profileAddress() {
        return (
            "/chain/" +
            this.chain +
            "/identity/" +
            this.identity.basicInfo.address
        );
    }

    //  manually remove and add the polkadot icon, else the icon isn't
    //  auto updating based on the passed address...
    triggerPolkadotIconUpdate() {
        this.showPolkadotIcon = false;
        this.$nextTick(() => {
            this.showPolkadotIcon = true;
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.chain-name-badge {
    padding-bottom: 0.15rem;
    padding-top: 0.3rem;
}
.icon {
    padding-top: 4px;
}
.avatar {
    height: 100%;
    .img-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            object-fit: cover;
            margin-right: 15px;
            height: 40px;
            width: 40px;
        }
    }
    h6 {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-wrap: anywhere;
    }
}
.identity-list-item {
    cursor: pointer;
    margin-bottom: 18px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;

    &:last-child {
        border-bottom: 1px solid #d8d8d8;
    }

    &:hover {
        background-color: #f7f7f7;
    }

    & > * {
        margin-bottom: 8px;

        &:last-child {
            margin-top: 16px;
            margin-bottom: 0;
        }
    }

    @include media-breakpoint-up(md) {
        margin-bottom: 0;
        border-bottom: none;

        & > * {
            margin-bottom: 0;

            &:last-child {
                margin-top: 0;
            }
        }
    }
}

.vertical-centered-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-wrap: anywhere;
}

.address-col {
    font-size: 0.9rem;
    @media screen and (min-width: 1600px) {
        flex: 0 0 455px;
    }
}

.chain-col {
    @include media-breakpoint-up(md) {
        flex: 0 0 150px;
    }
}

.chain-name-badge {
    @include media-breakpoint-down(md) {
        width: 120px;
    }
}

polkadot-web-identicon {
    transform: translateY(9px);
}
</style>