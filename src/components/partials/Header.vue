<template>
    <header>
        <img
            alt="..."
            class=""
            src="../../assets/logo.png"
            @click="$router.push('/')"
        />
        <h1 @click="$router.push('/')">SubIdentity</h1>
    </header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
header {
    background-color: $secondary;
    height: 58px;
    width: 100vw;
    color: white;
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;

    img {
        height: 28px;
        margin: 15px;
    }

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 28px;
        margin: 15px 0;
        display: inline-block;

        &:hover {
            cursor: pointer;
        }
    }

    @include media-breakpoint-up(lg) {
        color: $secondary;
        background-color: transparent;
        height: 82px;

        img {
            height: 38px;
            margin: 22px 22px 22px 30px;
        }

        h1 {
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 38px;
            margin: 22px 0;
        }
    }
}
</style>