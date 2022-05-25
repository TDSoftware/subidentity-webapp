<template>
    <div class="bg-secondary">
        <div class="container-medium">
            <div class="d-flex justify-content-center pt-3 text-white-50">
                <p>
                    <i
                        >This project was carried out as part of the
                        Web3Foundations grant program.</i
                    >
                    <br />
                    client: {{ version }} | server: {{ apiVersion }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "@/store";

@Options({})
export default class Footer extends Vue {
    store = useStore();

    get version() {
        return (
            process.env.VUE_APP_VERSION +
            " (" +
            process.env.VUE_APP_GIT_COMMIT_HASH +
            ")"
        );
    }

    get apiVersion() {
        return this.store.state.apiVersion;
    }
}
</script>

<style lang="scss" scoped>
p {
    text-align: center;
    font-size: 80%;
    line-height: 16px;
}
</style>
