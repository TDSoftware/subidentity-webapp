<template>
    <div class="d-flex flex-row avatar">
        <div v-if="activity?.iconName" class="img-wrapper">
            <img :src="require(`@/assets/icons/${activity.iconName}`)" class="icon border rounded-circle p-2" />
        </div>
        <p class="mb-0 fw-bold w-100" v-html="activity?.text"></p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        activity: {
            type: Object,
            required: true
        }
    }
})
export default class ProfileActivity extends Vue { }
</script>

<style lang="scss">
@import "../../../styles/variables";

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
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-wrap: anywhere;
    }

    p>a {
        display: contents;
    }

    p>span {
        color: $primary;
        display: contents;
    }
}
</style>