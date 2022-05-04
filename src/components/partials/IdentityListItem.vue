<template>
    <div class="row mx-0 p-1 rounded border identity-list">
        <div class="col-2">
            <div class="d-flex flex-row avatar">
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                    height="50"
                    width="50"
                    class="rounded-circle p-0 mx-0"
                    alt="Cinque Terre"
                />
                <h6 class="pt-3 mx-auto">Micheal Muller</h6>
            </div>
        </div>
        <div class="col-3 m-0 pt-3 fw-light text-muted">
            michael.mueller@example.de
        </div>
        <div class="col-4 m-0 pt-3 fw-light text-muted">
            5FEJV93P94SerQhOq4Be9AAR2hZtC...
        </div>
        <div class="col-2 m-0 pt-3">
            <div class="d-flex flex-row badge w-75 text-capitalize bg-light">
                <div class="fw-light text-muted">
                    <ion-icon
                        size="small"
                        class="fw-light text-muted"
                        name="git-network-outline"
                    ></ion-icon>
                </div>
                <div class="mx-2">Polkadot</div>
            </div>
        </div>
        <div class="col-1 m-0 pt-3">
            <a class="text-decoration-none link-primary" href="#">
                <div class="d-flex flex-row">
                    <p>Details</p>
                    <ion-icon
                        class="mx-1 icon"
                        name="arrow-forward-outline"
                    ></ion-icon>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {}
})
export default class IdentityItem extends Vue {
    isMobile = false;
}
</script>

<style lang="scss" scoped>
.icon {
    padding-top: 3px;
}
.avatar {
    padding-top: 2px;
}
.identity-list {
    cursor: pointer;
    &:hover {
        background-color: #f7f7f7;
    }
}
</style>