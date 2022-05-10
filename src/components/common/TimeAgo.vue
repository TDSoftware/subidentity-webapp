<template>
    <span>
        {{ formattedTime }}
    </span>
</template>

<script lang="ts">
import { timeBetween } from "@/util/timeBetween";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        date: {
            type: Date,
            required: true
        }
    }
})
export default class TimeAgo extends Vue {
    date!: Date;
    intervalTimer?: ReturnType<typeof setInterval>;
    formattedTime = "";

    created() {
        this.intervalTimer = setInterval(this.renderDate, 1000);
        this.renderDate();
    }

    beforeUnmount() {
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
    }

    renderDate() {
        this.formattedTime = timeBetween(this.date, new Date());
    }
}
</script>