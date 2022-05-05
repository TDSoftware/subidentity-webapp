<template>
    <div v-if="!loaded" class="spinner-wrapper">
        <Spinner color="#D0D0D0" :size="40" :width="3" />
    </div>
    <div v-else class="d-flex pt-4 fade-in">
        <polkadot-web-identicon
            size="100"
            :address="identity.basicInfo.address"
            theme="polkadot"
        />
        <div class="mx-4">
            <h4>{{ identity.basicInfo.display }}</h4>
            <div class="d-flex flex-row">
                <p class="fw-light text-muted">
                    Address: {{ identity.basicInfo.address }}
                </p>
                <span class="text-decoration-none link-primary mx-2">
                    <!-- TODO: add copy to clip board feature -->

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
            >
                SEND Token
            </button>
        </div> -->
    </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { Identity } from "@npmjs_tdsoftware/subidentity";
import { Options, Vue } from "vue-class-component";
import { useRoute } from "vue-router";
import Spinner from "../common/Spinner.vue";

@Options({
    components: {
        Spinner
    }
})
export default class Profile extends Vue {
    route = useRoute();
    store = useStore();

    address = this.route.params.address as string;
    chain = (this.route.params.chain as string).toLowerCase();
    loaded = false;
    identity?: Identity;

    created() {
        this.loadIdentity();
    }

    async loadIdentity() {
        this.identity = await this.store.dispatch("LOAD_IDENTITY", {
            chain: this.chain,
            address: this.address
        });

        console.log("Got identity: ", this.identity);
        this.loaded = true;
    }
}
</script>

<style lang="scss" scoped>
.spinner-wrapper {
    width: 100%;
    text-align: center;
    padding: 2rem 0;
}
.text-success {
    line-height: 40px;
}

.tag {
    line-height: 30px;
}
</style>