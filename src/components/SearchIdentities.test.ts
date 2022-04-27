import {shallowMount} from "@vue/test-utils";
import SearchIdentities from "@/components/SearchIdentities.vue";

describe("SearchIdentities.vue", () => {

    it("Trigger submit event on submit", async () => {
        const wrapper = shallowMount(SearchIdentities);

        await wrapper.find("form").trigger("submit.prevent");
        expect(wrapper.emitted()).toHaveProperty("submit");

    });


});

