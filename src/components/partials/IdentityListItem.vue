<template>
    <div
        class="row mx-0 py-3 px-2 rounded border identity-list-item"
        @click="$router.push('/identity/' + identity.basicInfo.address)"
    >
        <div class="col-12 col-md-2">
            <div class="d-flex flex-row avatar">
                <div class="img-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                        class="rounded-circle"
                        alt="Cinque Terre"
                    />
                </div>
                <h6>{{ identity.basicInfo.display }}</h6>
            </div>
        </div>
        <div class="col-12 col-md-3 text-muted vertical-centered-column">
            {{ identity.basicInfo.email || "-" }}
        </div>
        <div class="col text-muted vertical-centered-column">
            {{ identity.basicInfo.address }}
        </div>
        <div class="col-12 col-md-2 vertical-centered-column">
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
                    <ion-icon
                        size="small"
                        class="fw-light text-muted"
                        name="git-network-outline"
                    ></ion-icon>
                </div>
                <div class="mx-2">{{ identity.chain }}</div>
            </div>
        </div>
        <div class="col vertical-centered-column" style="flex: 0 0 100px">
            <span class="text-decoration-none link-primary">
                <div class="d-flex flex-row">
                    <span>Details</span>
                    <ion-icon
                        class="mx-1 icon"
                        name="arrow-forward-outline"
                    ></ion-icon>
                </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Identity } from "@npmjs_tdsoftware/subidentity";

@Options({
    components: {},
    props: {
        identity: {
            type: Object,
            required: true
        }
    }
})
export default class IdentityListItem extends Vue {
    identity!: Identity;
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.chain-name-badge {
    padding-bottom: 0.15rem;
    padding-top: 0.3rem;
}
.icon {
    padding-top: 3px;
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

        & > * {
            margin-bottom: 0;
        }
    }
}

.vertical-centered-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-wrap: anywhere;
}
</style>