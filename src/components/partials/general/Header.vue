<template>
    <header>
        <img
            alt="..."
            class=""
            src="../../../assets/logo.png"
            @click="$router.push('/')"
        />
        <h1 @click="$router.push('/')">SubIdentity</h1>
        <h1 class="mobile-header" @click="$router.push('/')">{{ title }}</h1>
    </header>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        title: {
            type: String,
            required: true
        }
    }
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
header {
    background-color: $secondary;
    height: $headerHeightMobile;
    width: 100%;
    color: white;
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;

    img {
        height: 28px;
        margin: 15px;
        &:hover {
            cursor: pointer;
        }
    }

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 28px;
        margin: 15px 0;
        display: none;

        &:hover {
            cursor: pointer;
        }
    }

    .mobile-header {
        display: block;
    }

    @include media-breakpoint-up(lg) {
        color: $secondary;
        background-color: transparent;
        height: $headerHeight;
        top: 0;

        img {
            height: 38px;
            margin: 28px 15px 28px 22px;
        }

        .mobile-header {
            display: none;
        }
    }

    @media screen and (min-width: 1350px) {
        h1 {
            display: inline-block;
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 38px;
            margin: 28px 0;
        }
    }
}
</style>