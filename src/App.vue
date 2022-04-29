<template>
    <router-view></router-view>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import "./styles/app.scss";
import {useStore} from "./store";

@Options({})
export default class App extends Vue {
    store = useStore();
    mounted() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }

    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    }

    private handleResize() {
        const root = document.querySelector(":root");
        if(!root) return;
        const breakPointString = getComputedStyle(root)?.getPropertyValue("--breakPoint");
        if(!breakPointString) return;
        const breakPoint = parseInt(breakPointString.replace("px", ""));
        this.store.commit("SET_IS_MOBILE_SCREEN", (document.documentElement.clientWidth <= breakPoint));
    }
}
</script>

