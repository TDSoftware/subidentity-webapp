import {shallowMount} from "@vue/test-utils";
import CustomSelect from "@/components/partials/CustomSelect.vue";

describe("CustomSelect.vue", () => {

    it("Emit event on click", async () => {
        const wrapper = shallowMount(CustomSelect, {
            props: {
                options: ["All Chains", "In Polkadot", "Kusama"]
            }
        });
        await wrapper.trigger("click");

        // check if event is emitted
        expect(wrapper.emitted().change).toBeTruthy();
    });

});