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
                    {{ version }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Footer extends Vue {
    get version() {
        return (
            process.env.VUE_APP_VERSION +
            " (" +
            process.env.VUE_APP_GIT_COMMIT_HASH +
            ")"
        );
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
