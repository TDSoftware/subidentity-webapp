<template>
    <div class="bg-secondary">
        <div class="container-medium">
            <div class="d-flex justify-content-center pt-3 text-white-50" id="footer-content">
                <p>
                    Development powered by <a href="https://tdsoftware.de" target="_blank">TDSoftware</a>
                    <br />
                    <span>
                        client: {{ version }}
                        <span v-if="apiVersion">| server: {{ apiVersion }}</span>
                    </span>
                </p>
                <a href="https://tdsoftware.de" target="_blank">
                    <img src="../../../assets/tdsoftware.svg" alt="TDSoftware Logo" />
                </a>
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

span {
    opacity: 0.5;
}

img {
    width: 1.5rem;
    margin-left: 1rem;
    transition: transform 0.5s ease-out;
}

img:hover {
    transform: scale(1.2);
}

a:link,
a:visited {
    color: rgb(171, 171, 171);
}

#footer-content {
    margin-right: -2.5rem;
}
</style>
