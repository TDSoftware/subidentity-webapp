<template>
    <form @submit.prevent="onSubmitSearchIdentity">
        <div class="bg-white text-dark container-medium rounded">
            <div class="row align-items-center">
                <div class="col-md-6 border-end p-2">
                    <div class="input-group">
                        <span class="input-group-text fw-light text-muted">$</span>
                        <input v-model="searchTerm"
                               class="form-control fw-light text-muted"
                               placeholder="Search for a Name, E-Mail, Address"
                               type="text">
                    </div>

                </div>
                <div class="col-md-4 border-end p-2">
                    <CustomSelect
                        :default-value="'All Chains'"
                        :options="['All Chains','In Polkadot', 'Kusama']"
                        class="select"
                        @change="onSelectedChange"
                    />
                </div>
                <div class="col-md-2 d-grid mx-auto">
                    <button class="btn btn-primary fw-normal text-white " type="button">SEARCH</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import CustomSelect from "@/components/partials/CustomSelect.vue";

@Options({
    components: {
        CustomSelect
    }
})
export default class IdentitySearch extends Vue {

    private searchTerm = "";
    private selectedChain = "";

    private onSelectedChange(selected: string) {
        this.selectedChain = selected;
    }

    private onSubmitSearchIdentity() {
        //search identity logic goes here
    }

}
</script>