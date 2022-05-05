<template>
    <div class="row pt-5">
        <div
            class="col-xl-4 col-md-6 col-12"
            v-for="(plugin, i) of plugins"
            :key="i"
        >
            <Accordion />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/common/Accordion.vue";

@Options({
    components: {
        Accordion
    }
})
export default class Plugins extends Vue {
    private plugins = [
        {
            id: 1
        }
    ];
}
</script>
