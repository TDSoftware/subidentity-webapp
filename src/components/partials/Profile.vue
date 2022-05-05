<template>
    <div class="d-flex pt-4">
        <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            height="100"
            width="100"
            class="rounded-circle p-0 mx-0"
            alt="Cinque Terre"
        />
        <div class="mx-4">
            <h4>Micheal Muller</h4>
            <div class="d-flex flex-row">
                <p class="fw-light text-muted">
                    Address: 5FEJV93P94SerQhOq4Be9AAR2hZtC...
                </p>
                <a class="text-decoration-none link-primary mx-2" href="#">
                    <ion-icon size="small" name="copy-outline"></ion-icon>
                </a>
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

                    <div class="mx-1">Polkadot</div>
                </div>
                <p class="text-success m-0 mx-3">Verified by 9 registrars</p>
            </div>
        </div>
        <!-- <div class="ms-auto">
            <button
                class="btn btn-primary fw-bold w-100 text-white"
                type="submit"
            >
                SEND Token
            </button>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {}
})
export default class Profile extends Vue {}
</script>

<style scoped>
.text-success {
    line-height: 40px;
}

.tag {
    line-height: 30px;
}
</style>