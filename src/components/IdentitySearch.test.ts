import {shallowMount} from "@vue/test-utils";
import IdentitySearch from "@/components/IdentitySearch.vue";

describe("SearchIdentities.vue", () => {

    it("Trigger submit event on submit", async () => {
        const wrapper = shallowMount(IdentitySearch);

        await wrapper.find("form").trigger("submit.prevent");
        expect(wrapper.emitted()).toHaveProperty("submit");

    });


});

