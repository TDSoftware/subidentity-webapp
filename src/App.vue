<template>
    <router-view></router-view>
</template>

<script lang="ts">
import "../node_modules/polkadot-web-identicon/main.js";
import "../node_modules/polkadot-web-identicon/polyfills.js";
import "../node_modules/polkadot-web-identicon/runtime.js";
import { Options, Vue } from "vue-class-component";
import "./styles/app.scss";

@Options({})
export default class App extends Vue {}
</script>

