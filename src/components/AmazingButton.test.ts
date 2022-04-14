import { shallowMount } from "@vue/test-utils";
import AmazingButton from "@/components/AmazingButton.vue";

describe("AmazingButton.vue", () => {




    // PUTTING SLOTS IN and EXPECT RENDERED UI

    it("Renders button default slot text", () => {
        const msg = "CLICK ME";

        // shallowMount is not rendering child components! --> use mount if wanted
        const wrapper = shallowMount(AmazingButton, {

            // Put something into a slot...
            slots: {
                default: msg
            }
        });

        // wrapper.text() --> will return the whole text content of the component, even of childs

        expect(wrapper.text()).toMatch(msg);
    });






    // EXPECT EVENT

    it("Trigger click event on click", async () => {
        const wrapper = shallowMount(AmazingButton);

        // trigger custom UI events like click, enter etc.
        await wrapper.trigger("click");

        // check if event is emitted
        expect(wrapper.emitted().customEvent).toBeTruthy();
    });









    // PUTTING PROPS IN and EXPECT EVENT to NOT be triggered

    it("Button can be disabled via prop 'disabled'.", async () => {
        const wrapper = shallowMount(AmazingButton, {
            props: {
                disabled: true
            }
        });

        // trigger custom UI events like click, enter etc.
        await wrapper.trigger("click");

        // check if event is emitted
        expect(wrapper.emitted().customEvent).toBeFalsy();
    });

});

