
import Accordion from "@/components/common/Accordion.vue";
import { shallowMount } from "@vue/test-utils";

describe("Accordion.vue", () => {

    it("should collapse the accordion on click", async () => {
        const wrapper = shallowMount(Accordion, {
            global: {
                stubs: {
                    IonIcon: true
                }
            }
        });

        expect(wrapper.find(".accordion-body").exists()).toBeTruthy();

        const buttonEl = wrapper.find("button");
        expect(buttonEl.exists()).toBeTruthy();

        buttonEl.trigger("click");
        await wrapper.vm.$nextTick();
        expect(wrapper.find(".accordion-body").exists()).toBeFalsy();

        buttonEl.trigger("click");
        await wrapper.vm.$nextTick();
        expect(wrapper.find(".accordion-body").exists()).toBeTruthy();
    });

});