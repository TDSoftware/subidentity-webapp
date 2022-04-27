import { shallowMount } from "@vue/test-utils";
import CustomSelect from "@/components/partials/CustomSelect.vue";

describe("CustomSelect.vue", () => {

    // TODO: check that the CustomSelect works even if 0 options  --> [] are passed as prop

    // TODO: check that on selecting an option, the correct event and value is emitted

    // TODO: check that the correct default value emitted on create (w/o click)

    it("should emit the change event with the first passed option key on creating the component", async () => {
        const wrapper = shallowMount(CustomSelect, {
            props: {
                options: [{ key: "yeah", displayValue: "Yeah" }]
            }
        });

        // Check that the change event is triggered
        expect(wrapper.emitted().change).toBeTruthy();

        // Check that the first argument is the option key "yeah" as passed as prop
        const eventArgs = (wrapper.emitted().change[0] as string[]);
        expect(eventArgs[0]).toBe("yeah");
    });

});