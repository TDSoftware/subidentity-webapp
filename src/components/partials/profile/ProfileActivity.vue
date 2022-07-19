<template>
    <div class="d-flex flex-row avatar">
        <div class="img-wrapper">
            <img
                :src="require(`@/assets/icons/${icon}`)"
                class="icon border rounded-circle p-2"
            />
        </div>
        <p class="mb-0 fw-bold w-100">
            {{ message }}
        </p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        icon: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
})
export default class ProfileActivity extends Vue {}
</script>

<style lang="scss">
.avatar {
    height: 100%;
    .img-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
            object-fit: scale-down;
            margin-right: 10px;
            height: 45px;
            width: 45px;
        }
    }
    p {
        margin: 0;
        justify-content: center;
        overflow-wrap: anywhere;
    }
}
</style>